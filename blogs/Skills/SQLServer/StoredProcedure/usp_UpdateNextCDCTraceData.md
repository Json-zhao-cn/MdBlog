---
title: Use stored procedure to update CDC_Sync_Control table data
date: 2025/10/20
tags:
 - SQLServerCDC
categories:
 - Skills
---

### Use stored procedure to update CDC_Sync_Control table data **Only two dbs**

####  Update CDC_Sync_Control table  current `__$start_lsn` and `__$seqval`
1. After finished sync current `__$start_lsn` data from source db table to target DB. We need to record the sync `__$start_lsn` and `__$seqval`
So, we will use a stored procedure to do it.The stored procedure is :

```sql
USE [YourDatabase]
GO
/****** Object:  StoredProcedure [dbo].[usp_UpdateNextCDCTraceData]    Script Date: 2025/11/11 14:01:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[usp_UpdateNextCDCTraceData]
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
    DECLARE @LastSyncLSN BINARY(10);
    DECLARE @LastSeqVal VARBINARY(10);
    DECLARE @HasRemaining BIT = 0;
    DECLARE @NextLSN BINARY(10);
    DECLARE @Where NVARCHAR(MAX);
    DECLARE @sql NVARCHAR(MAX);

    -- declare outer variables for max LSN/Seq
    DECLARE @OutMaxLSN BINARY(10);
    DECLARE @OutMaxSeq VARBINARY(10);

    ------------------------------------------------------------
    -- GET LAST SYNC POINT
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
    EXEC dbo.usp_GetCdcQueryStartMode 
        @TableName = @TableName,
        @LastSyncLSN = @LastSyncLSN,
        @LastSeqVal = @LastSeqVal,
        @HasRemaining = @HasRemaining OUTPUT;

    ------------------------------------------------------------
    -- COMPUTE WHERE CONDITION
    ------------------------------------------------------------
    IF @HasRemaining = 1
    BEGIN
        SET @Where = N'c.__$start_lsn = @LastSyncLSN AND c.__$seqval > @LastSeqVal';
    END
    ELSE
    BEGIN
        -- get next LSN
        DECLARE @Nextsql NVARCHAR(MAX);

		SET @Nextsql = N'SELECT @NextLSN_OUT = MIN(__$start_lsn) 
					 FROM ' +'cdc.' + @CaptureInstance + '_CT' + N' 
					 WHERE __$start_lsn > @LastSyncLSN;';

		EXEC sp_executesql 
			@Nextsql,
			N'@LastSyncLSN binary(10), @NextLSN_OUT binary(10) OUTPUT',
			@LastSyncLSN = @LastSyncLSN,
			@NextLSN_OUT = @NextLSN OUTPUT;

        IF @NextLSN IS NULL
        BEGIN
            -- nothing to sync
            RETURN;
        END
        ELSE
            SET @Where = N'c.__$start_lsn = @NextLSN';
    END;

    ------------------------------------------------------------
    -- DYNAMIC SQL TO GET MAX LSN/SEQ
    ------------------------------------------------------------
     ------------------------------------------------------------
    -- DYNAMIC SQL TO GET MAX LSN/SEQ
    ------------------------------------------------------------
   SET @sql = N'
		SELECT TOP(1) 
			@OutMaxLSN_OUT = t.__$start_lsn,
			@OutMaxSeq_OUT = t.__$seqval 
		FROM (
			SELECT TOP(@PageSize) *
			FROM ' + @CdcTableName + N' c
			WHERE ' + @Where + N'
		) t 
		ORDER BY t.__$start_lsn DESC, t.__$seqval DESC;';

    ------------------------------------------------------------
    -- EXECUTE DYNAMIC SQL
    ------------------------------------------------------------
    IF @HasRemaining = 1
    BEGIN
        EXEC sp_executesql
            @sql,
            N'@LastSyncLSN binary(10), @LastSeqVal varbinary(10),@PageSize int,
              @OutMaxLSN_OUT binary(10) OUTPUT, @OutMaxSeq_OUT varbinary(10) OUTPUT',
            @LastSyncLSN = @LastSyncLSN,
            @LastSeqVal = @LastSeqVal,
			@PageSize =@PageSize,
            @OutMaxLSN_OUT = @OutMaxLSN OUTPUT,
            @OutMaxSeq_OUT = @OutMaxSeq OUTPUT;
    END
    ELSE
    BEGIN
        EXEC sp_executesql
            @sql,
            N'@NextLSN binary(10),@PageSize int,
              @OutMaxLSN_OUT binary(10) OUTPUT, @OutMaxSeq_OUT varbinary(10) OUTPUT',
            @NextLSN = @NextLSN,
			@PageSize =@PageSize,
            @OutMaxLSN_OUT = @OutMaxLSN OUTPUT,
            @OutMaxSeq_OUT = @OutMaxSeq OUTPUT;
    END

    ------------------------------------------------------------
    -- UPDATE CDC_Sync_Control
    ------------------------------------------------------------
    UPDATE dbo.CDC_Sync_Control
    SET 
        LastSyncLSN = @OutMaxLSN,
        SeqVal      = @OutMaxSeq,
        LastSyncDate = GETDATE()
    WHERE TableName = @TableName;
END;
```
