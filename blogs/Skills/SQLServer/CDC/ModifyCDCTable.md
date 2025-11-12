---
title: Modify CDC Table
date: 2025/10/09
tags:
 - SQLServerCDC
categories:
 - Skills
---


### Modify CDC Table
#### 1. Add column in the source table
When we add the column in the table, and the cdc table `cdc.captured_columns` can't add the column automaticlly, and the cdc transaction log table `cdc.dbo_YourTable_CT` also can't add the column automaticlly. Because the cdc table must insure any structure changes of source table didn't cause any unpredictable influence on the target cdc table.Then, it will not your target database table.

#### 2. How to clear the cdc_ct table data?
Before you clear the cdc_ct table data, you should insure this action can't case any affect for your business. Well, you can use truncate table command 
```sql
    USE ReportCenter;
    truncate table cdc_ct;
```

#### 3. How to re-enable the cdc_ct table ?
```sql
USE ReportCenter;
GO
-- 1. disable the cdc table
EXEC sys.sp_cdc_disable_table 
    @source_schema = N'dbo',
    @source_name = N'Yourtable', 
    @capture_instance = 'all';


-- 2.  Enable the CDC table
EXEC sys.sp_cdc_enable_table 
    @source_schema = N'dbo',
    @source_name = N'Yourtable',
    @role_name = NULL, 
    @capture_instance = N'dbo_Yourtable';  
```