---
title: Sync Job status in the SQL Server Alwayson cluster solution

date: 2025/11/21
tags:
 - SQLServer
categories:
 - Skills
---

## **Sync Job status in the SQL Server Alwayson cluster solution**
---
### 1. **Scenario(`Requirement`)**
In the SQL Server Availability Group(`AG`),when the AG changes failover,the primary server has become secondary server,in the meantime, the second server has become the primary server. In the master and slaver change roles.However, the CDC and other business jobs didn't register or run when the role changed. That's mean some businesses like PowerBI(`PB`) will stop, the sync data(`CDC`) will lose data. What should we do to stop this thing happened?

![Jobs](./Jobs.png)

---
### 2. **Solution**
We have two ways to prevent this thing happens.We have two options:
#### 1. Use customer stored procedure `dbo.usp_CheckPrimaryServer` to check the server role is primary or not.
- Dupilcate all jobs in the all availability group.
- Create the customer stored procedure `dbo.usp_CheckPrimaryServer`
```sql
CREATE PROCEDURE dbo.usp_CheckPrimaryServer
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @CurrentRole NVARCHAR(50);

    SELECT @CurrentRole = role_desc 
    FROM sys.dm_hadr_availability_replica_states 
    WHERE is_local = 1;
    
    IF @CurrentRole IS NULL OR @CurrentRole <> 'PRIMARY'
    BEGIN
        DECLARE @Message NVARCHAR(500);
        SET @Message = N'x  Current server is not PRIMARY server,stop job';
        
        THROW 50001,@Message,1;
    END
    PRINT N'✓ Current server is PRIMARY server，continue job';
    RETURN 0; 
END
GO
```
#### 2. grant user access
```sql
USE master;
GO
-- grant the user view STATE permission
GRANT VIEW SERVER STATE TO [YourUser];
-- grant the user view permission
GRANT VIEW ANY DEFINITION TO [YourUser];
GRANT VIEW SERVER PERFORMANCE STATE TO [YourUser];
```
- Each job step will add `Exec dbo.usp_CheckPrimaryServer` as first step
- If the server is primary server, go to next step;otherwise,exit.

---

#### 3. **Deal with CDC job**
1. You must enable CDC job in the secondary database. Because the CDC configuration data saved in the `msdb` database. We add your db in the failover, we never add `msdb`.
2. In the CDC Jobs `cdc.ReportCenter_capture` and `cdc.ReportCenter_cleanup`， you also need add the first step to check current db is primary db or not;


### 3.**Summarize**
1. Limitation
   - Each job need add this step,it doesn't has central control;
   - Each job in the AG will generate some unuse messsage;
   - **`CDC job`** need special configuration.
  
2. Benefit
   - Simple configurate. Less job is best way;

