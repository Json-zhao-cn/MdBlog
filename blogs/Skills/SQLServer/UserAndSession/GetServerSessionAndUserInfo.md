---
title: Using SQL to get DB server user and session info 
date: 2025/11/26
tags:
 - SQLServer
categories:
 - Skills
---

## **Using SQL to get DB server user and session info**
Get Current DB connection user and session
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