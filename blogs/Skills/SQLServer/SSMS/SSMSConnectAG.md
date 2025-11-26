---
title: Using SSMS tool to connect the SQL Server Availability Group(AG) 
date: 2025/11/25
tags:
 - SQLServer
categories:
 - Skills
---

## **Using SSMS tool to connect the SQL Server Availability Group(AG)**
### 1.**Connection**
- 1. Connect AG
  ![ChooseAG](./ChooseAG.png)
- 2. Input user
- 3. Optional add parameters=>ApplicationIntent=ReadOnly
  ![AGOption](./AGOption.png)

### 2.**Problem**
Question ❌ Why the SSMS always connect the **`Primary server`** even I connect the `AG-litenser-name` and adds ApplicationIntent=ReadOnly; MultiSubnetFailover=True?
1. SSMS uses the legacy .NET SqlClient drive
   - This driver only supports read-only routing in limited conditions, unlike JDBC or ODBC.
   - DBAS
   - Admin tasks
   - Connect to primary for management
2. SSMS always connects to `master` first
   - Before connecting to user DB, SSMS checks:
   - server version
   - login
   - default settings
   - **design limitations**: Many DMVs, ALTER commands, database properties, etc., are not allowed on secondary.
   - 
3. SSMS is an administrative tools
   SSMS is built to:
   - manage the AG
   - manage the primary
   - run T-SQL
   - troubleshoot replication / failover
4. **Summarize**
So the routing rules for applications do NOT apply equally to SSMS.That's why `JDBC (NiFi)` and `ODBC` works perfectly, but SSMS does not.