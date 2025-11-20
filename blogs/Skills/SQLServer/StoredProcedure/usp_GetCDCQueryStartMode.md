---
title: Use stored procedure to judge the cdc table data has new row 
date: 2025/10/20
tags:
 - SQLServerCDC
categories:
 - Skills
---

### Use stored procedure to judge the cdc table data has new row 
We will use cdc to sync source db table to target db. We will sync it based on the transactionId, not all data.If one transaction log is very large. We need to sync it serval times. Then, we need to judg does this transaction log exist new row or not. Finally, we will use usp_GetCdcQueryStartMode stored proceduce to do it.

```sql
USE [YourDatabase]
GO
/****** Object:  StoredProcedure [dbo].[usp_GetCdcQueryStartMode]    Script Date: 2025/11/10 13:42:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[usp_GetCdcQueryStartMode]
    @TableName NVARCHAR(50),
    @LastSyncLSN BINARY(10),
    @LastSeqVal VARBINARY(10),
    @HasRemaining BIT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @sql NVARCHAR(MAX);
    DECLARE @CaptureInstance SYSNAME = @TableName;
    DECLARE @CdcTableName SYSNAME = 'cdc.' + @CaptureInstance + '_CT';

    SET @sql = N'
        SELECT @HasRemaining = CASE WHEN EXISTS (
            SELECT 1
            FROM ' + @CdcTableName + '
            WHERE __$start_lsn = @LastSyncLSN
              AND __$seqval > @LastSeqVal
        ) THEN 1 ELSE 0 END;
    ';

    EXEC sp_executesql
        @sql,
        N'@LastSyncLSN binary(10), @LastSeqVal varbinary(10), @HasRemaining bit OUTPUT',
        @LastSyncLSN = @LastSyncLSN,
        @LastSeqVal  = @LastSeqVal,
        @HasRemaining = @HasRemaining OUTPUT;
END;
```