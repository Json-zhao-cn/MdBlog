---
title: Use stored procedure to get the new traction cdc rows 
date: 2025/10/20
tags:
 - SQLServerCDC
categories:
 - Skills
---

```sql
USE [YourDataBase]
GO
/****** Object:  StoredProcedure [dbo].[usp_GetCdcTableData]    Script Date: 2025/11/10 13:58:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[usp_GetCdcTableData]
    @PKColumns NVARCHAR(50),
    @PageSize  INT,
    @TableName NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    ------------------------------------------------------------
    -- INITIAL SETUP
    ------------------------------------------------------------
    DECLARE @CaptureInstance SYSNAME = @TableName;
    DECLARE @CdcTableName SYSNAME = 'cdc.' + @CaptureInstance + '_CT';
    DECLARE @Columns NVARCHAR(MAX);
    DECLARE @LastSyncLSN BINARY(10);
    DECLARE @LastSeqVal VARBINARY(10);
    DECLARE @HasRemaining BIT = 0;
    DECLARE @NextLSN BINARY(10);
    DECLARE @Where NVARCHAR(MAX);
    DECLARE @sql NVARCHAR(MAX);

    ------------------------------------------------------------
    -- GET CAPTURED COLUMNS
    ------------------------------------------------------------
    SELECT @Columns = STRING_AGG('c.' + QUOTENAME(a.column_name), ', ')
    FROM cdc.captured_columns a
    JOIN cdc.change_tables b ON a.object_id = b.object_id
    WHERE b.capture_instance = @CaptureInstance;

    ------------------------------------------------------------
    -- GET LAST SYNC POINT (TEMP DEFAULT FOR DEMO)
    ------------------------------------------------------------
     SELECT @LastSyncLSN = LastSyncLSN, @LastSeqVal = SeqVal
     FROM dbo.CDC_Sync_Control
     WHERE TableName = @TableName;

    IF @LastSyncLSN IS NULL
    BEGIN
        SET @LastSyncLSN = 0x00000000000000000000;
        SET @LastSeqVal  = 0x00000000000000000000;
    END;

    ------------------------------------------------------------
    -- DETERMINE QUERY START MODE
    ------------------------------------------------------------
    EXEC dbo.[usp_GetCdcQueryStartMode] 
        @TableName = @TableName,
        @LastSyncLSN = @LastSyncLSN,
        @LastSeqVal = @LastSeqVal,
        @HasRemaining = @HasRemaining OUTPUT;

    ------------------------------------------------------------
    -- COMPUTE CORRECT WHERE CONDITION
    ------------------------------------------------------------
    IF @HasRemaining = 1
    BEGIN
        -- Still have remaining rows in the same LSN
        SET @Where = N'c.__$start_lsn = @LastSyncLSN AND c.__$seqval > @LastSeqVal';
    END
    ELSE
    BEGIN
        -- Need to start from the NEXT LSN
        DECLARE @getNextLSNsql NVARCHAR(MAX) = 
            N'SELECT @NextLSN_OUT = MIN(__$start_lsn) 
              FROM ' + @CdcTableName + ' 
              WHERE __$start_lsn > @LastSyncLSN;';

        EXEC sp_executesql
            @getNextLSNsql,
            N'@LastSyncLSN binary(10), @NextLSN_OUT binary(10) OUTPUT',
            @LastSyncLSN = @LastSyncLSN,
            @NextLSN_OUT = @NextLSN OUTPUT;

        IF @NextLSN IS NULL
            SET @Where = N'1 = 0'; -- nothing new
        ELSE
            SET @Where = N'c.__$start_lsn = @NextLSN';
    END;

    ------------------------------------------------------------
    -- MAIN DYNAMIC SQL (MERGE-SAFE)
    ------------------------------------------------------------
    SET @sql = N'
    -- Start with dummy select to make ;WITH valid
    SELECT 1 AS dummy INTO #_dummy; DROP TABLE #_dummy;

    ;WITH BasePage AS (
        SELECT TOP (CAST(@PageSize * 1.1 AS INT)) *
        FROM ' + @CdcTableName + N' c
        WHERE ' + @Where + N'
        ORDER BY c.__$start_lsn ASC, c.__$seqval ASC
    ),
    Boundary AS (
        SELECT 
            MAX(__$start_lsn) AS MaxLSN,
            MAX(__$seqval) AS MaxSeqVal
        FROM (
            SELECT TOP (@PageSize) __$start_lsn, __$seqval
            FROM BasePage
            ORDER BY __$start_lsn ASC, __$seqval ASC
        ) x
    ),
    NextPage AS (
        SELECT *
        FROM BasePage bp
        CROSS JOIN Boundary b
        WHERE
            (bp.__$start_lsn < b.MaxLSN)
            OR (bp.__$start_lsn = b.MaxLSN AND bp.__$seqval <= b.MaxSeqVal)
    ),
    GrpOps AS (
        SELECT
            np.' + QUOTENAME(@PKColumns) + ' AS PK,
            np.__$start_lsn,
            np.__$seqval,
            MAX(CASE WHEN np.__$operation = 1 THEN 1 ELSE 0 END) AS HasOp1,
            MAX(CASE WHEN np.__$operation = 2 THEN 1 ELSE 0 END) AS HasOp2,
            MAX(CASE WHEN np.__$operation = 3 THEN 1 ELSE 0 END) AS HasOp3,
            MAX(CASE WHEN np.__$operation = 4 THEN 1 ELSE 0 END) AS HasOp4
        FROM NextPage np
        GROUP BY np.' + QUOTENAME(@PKColumns) + ', np.__$start_lsn, np.__$seqval
    ),
    Classified AS (
        SELECT
            g.PK,
            g.__$start_lsn,
            g.__$seqval,
            CASE
                WHEN g.HasOp1 = 1 AND g.HasOp2 = 1 THEN 4
                WHEN g.HasOp3 = 1 AND g.HasOp4 = 1 THEN 4
                WHEN g.HasOp2 = 1 OR g.HasOp4 = 1 THEN 2
                WHEN g.HasOp1 = 1 OR g.HasOp3 = 1 THEN 1
            END AS FinalOpGroup
        FROM GrpOps g
    ),
    FilteredPageRows AS (
        SELECT
            np.' + QUOTENAME(@PKColumns) + ' AS PK,
            np.__$start_lsn,
            np.__$seqval,
            np.__$operation AS SourceOp,
            CASE
                WHEN cls.FinalOpGroup = 4 AND np.__$operation IN (2,4) THEN 4
                WHEN cls.FinalOpGroup = 2 AND np.__$operation = 2 THEN 2
                WHEN cls.FinalOpGroup = 1 AND np.__$operation IN (1,3) THEN 1
            END AS FinalOp
        FROM NextPage np
        INNER JOIN Classified cls
            ON np.' + QUOTENAME(@PKColumns) + ' = cls.PK
            AND np.__$start_lsn = cls.__$start_lsn
            AND np.__$seqval = cls.__$seqval
        WHERE
            (cls.FinalOpGroup = 4 AND np.__$operation IN (2,4))
            OR (cls.FinalOpGroup = 2 AND np.__$operation = 2)
            OR (cls.FinalOpGroup = 1 AND np.__$operation IN (1,3))
    ),
    LatestPerPK AS (
        SELECT
            f.PK,
            f.__$start_lsn,
            f.__$seqval,
            f.SourceOp,
            f.FinalOp,
            ROW_NUMBER() OVER (
                PARTITION BY f.PK
                ORDER BY f.__$start_lsn DESC, f.__$seqval DESC
            ) AS rn
        FROM FilteredPageRows f
    )
    SELECT
        l.__$start_lsn,
        l.__$seqval,
        l.FinalOp,
        ' + @Columns + N'
    FROM LatestPerPK l
    INNER JOIN ' + @CdcTableName + N' c
        ON c.' + QUOTENAME(@PKColumns) + ' = l.PK
        AND c.__$start_lsn = l.__$start_lsn
        AND c.__$seqval = l.__$seqval
        AND c.__$operation = l.SourceOp
    WHERE l.rn = 1
    ORDER BY l.__$start_lsn, l.__$seqval;';

    ------------------------------------------------------------
    -- EXECUTE MAIN SQL
    ------------------------------------------------------------
    IF @HasRemaining = 1
    BEGIN
        EXEC sp_executesql 
            @sql,
            N'@LastSyncLSN binary(10), @LastSeqVal varbinary(10), @PageSize int',
            @LastSyncLSN = @LastSyncLSN,
            @LastSeqVal  = @LastSeqVal,
            @PageSize    = @PageSize;
    END
    ELSE
    BEGIN
        EXEC sp_executesql 
            @sql,
            N'@NextLSN binary(10), @PageSize int',
            @NextLSN  = @NextLSN,
            @PageSize = @PageSize;
    END
END;
```