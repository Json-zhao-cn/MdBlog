---
title: How to implement cdc in the SQL Server
date: 2025/10/05
tags:
 - SQLServerCDC
categories:
 - Skills
---

**enable SQL Server Change Data Capture (CDC)** 
---

### 1. Enable CDC at the database level

Run this once for the database:

```sql
USE YourDatabase;
GO
EXEC sys.sp_cdc_enable_db;
```

---

### 2. Enable CDC on each table

For each table (A, B, C…), run:

```sql
EXEC sys.sp_cdc_enable_table  
    @source_schema = N'dbo',  
    @source_name   = N'TableA',  
    @role_name     = NULL;  -- or a role like 'cdc_reader'
GO

EXEC sys.sp_cdc_enable_table  
    @source_schema = N'dbo',  
    @source_name   = N'TableB',  
    @role_name     = NULL;
GO

EXEC sys.sp_cdc_enable_table  
    @source_schema = N'dbo',  
    @source_name   = N'TableC',  
    @role_name     = NULL;
GO
```

---

### 3. Configure retention period (3 days)

By default, CDC keeps change data for **3 days (72 hours)**, but you can explicitly set it:

```sql
-- Modify the retention period for the CDC cleaning job to 3 days (4,320 minutes)
USE ReportCenter
GO
EXEC sys.sp_cdc_change_job 
    @job_type = 'cleanup',
    @retention = 4320  -- 3 days × 24 hours × 60 minutes = 4320 minutes
```

✅ This ensures the CDC cleanup job removes changes older than 3 days.

---

### 4. Verify settings

Check retention and job info:

```sql
EXEC sys.sp_cdc_help_jobs;
```

Check enabled tables:

```sql
SELECT * FROM sys.tables WHERE is_tracked_by_cdc = 1;
```

---

### 5. (Optional) Disable CDC on a table or DB

If later you want to remove CDC:

```sql
-- Disable table-level CDC
EXEC sys.sp_cdc_disable_table  
    @source_schema = N'dbo',  
    @source_name   = N'TableA',  
    @capture_instance = 'all';

-- Disable database-level CDC
USE YourDatabase;
EXEC sys.sp_cdc_disable_db;
```

---

⚡ Summary:

* Enable CDC at **DB level** (`sp_cdc_enable_db`)
* Enable CDC for each table (`sp_cdc_enable_table`)
* Set **3-day cleanup** with `sp_cdc_change_job @retention = 259200`

---
