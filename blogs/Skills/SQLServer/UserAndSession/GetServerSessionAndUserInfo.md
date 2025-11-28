---
title: Using SQL to get DB server user and session info 
date: 2025/11/26
tags:
 - SQLServer
categories:
 - Skills
---

## **Using SQL to get DB server user and session info**

---
### 1. **Get current session acount**
```sql
SELECT COUNT(1) AS CurrentSessionCount 
FROM sys.dm_exec_sessions 
WHERE is_user_process = 1;
```

---

### 2. **Get Current DB connection user and session**

```SQL
-- Get Current DB connection user and session
SELECT 
    session_id AS [Session ID],
    login_name AS [Login Name],
    host_name AS [Host Name],
    program_name AS [Program Name],
    status AS [Status],
    cpu_time AS [CPU Time],
    memory_usage AS [Memory Usage],
    reads AS [Reads],
    writes AS [Writes],
    logical_reads AS [Logical Reads],
    last_request_start_time AS [Last Request Start],
    last_request_end_time AS [Last Request End]
FROM sys.dm_exec_sessions
WHERE is_user_process = 1  --Only display user processes and exclude system processes
--and login_name='YourUser' 
ORDER BY session_id;
```
---
### 3. **Get Current DB connection user and session**

```sql
SELECT 
    name ,
    value ,
    value_in_use ,
    description
FROM sys.configurations
WHERE name = 'user connections';
```
---
### 4. **Check Session configurate limitation and current usage**

```sql
DECLARE @max_connections INT =0;
DECLARE @current_connections int= 0;

SELECT  @max_connections=CONVERT(INT,value_in_use )
FROM sys.configurations 
WHERE name = 'user connections';

SELECT  @current_connections=COUNT(*) 
FROM sys.dm_exec_sessions 
WHERE is_user_process = 1;

SELECT 
    @max_connections ,
    @current_connections,
    CAST((@current_connections * 100.0 / NULLIF(@max_connections, 0)) AS DECIMAL(5,2)) AS rate;
```

---
### 5. **Query possible problem sessions**
```sql
-- Query possible problem sessions (blocked/long-running)
SELECT 
    s.session_id,
    r.status,
    r.blocking_session_id,
    r.wait_type,
    r.wait_time,
    r.wait_resource,
    r.cpu_time,
    r.logical_reads,
    r.reads,
    r.writes,
    s.login_name,
    s.host_name,
    s.program_name,
    t.text AS sqlTest,
    qp.query_plan AS exeplan
FROM sys.dm_exec_sessions s
LEFT JOIN sys.dm_exec_requests r ON s.session_id = r.session_id
OUTER APPLY sys.dm_exec_sql_text(r.sql_handle) t
OUTER APPLY sys.dm_exec_query_plan(r.plan_handle) qp
WHERE s.is_user_process = 1
ORDER BY r.cpu_time DESC;
```
---
### 6. **change session configuration ***`restart sql server service`*****

```sql
-- Modify the maximum number of user connections (SA permission required)
-- set as 0 mean no limitation(not recommend)
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'user connections', 500; --  set as 500
RECONFIGURE;
```