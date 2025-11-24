---
title: Sync Job status in the SQL Server Alwayson cluster solution

date: 2025/11/21
tags:
 - SQLServer
categories:
 - Skills
---

## **Sync Job status in the SQL Server Alwayson cluster solution**

### 1. **Scenario(`Requirement`)**
In the SQL Server Availability Group(`AG`),when the AG changes failover,the primary server has become secondary server,in the meantime, the second server has become the primary server. In the master and slaver change roles.However, the CDC and other business jobs didn't register or run when the role changed. That's mean some businesses like PowerBI(`PB`) will stop, the sync data(`CDC`) will lose data. What should we do to stop this thing happened?

![Jobs](./Jobs.png)

### 2. **Solution**
We have two ways to prevent this thing happens.We have two options:
#### 1. Use customer stored procedure `Usp_CheckServerRole` to check the server role is primary or not.
- Dupilcate all jobs in the all availability group.
- Create the customer stored procedure `Usp_CheckServerRole`
```sql
IF NOT EXISTS (
    SELECT 1 
    FROM sys.dm_hadr_availability_replica_states rs
    JOIN sys.availability_replicas ar ON rs.replica_id = ar.replica_id
    WHERE rs.is_local = 1 AND rs.role_desc = 'PRIMARY'
    AND ar.replica_server_name = @@SERVERNAME
)
BEGIN
    PRINT 'The current server is not primary server';
    RETURN;
END
```
- Each job step will add `Exec Usp_CheckServerRole` as first step
- If the server is primary server, next, execute your business job.Otherwise,print error message.

#### 2. Use AG Trigger `ag_job_trigger` to check the server role is primary or not.
- [Using AG Trigger to Sync Job status in the SQL Server Alwayson cluster](./AGTriggerSyncJobStatus.md)

### 3.**Solution Compare**
| characteristic | Usp_CheckServerRole | ag_job_trigger |
|------|----------------------|----------------|
| **Solution complexity** | ❌ **complicated** - add step when create each job step | ✅ **easy** - create and maintain ag_job_trigger  |
| **Job Role Management** | ❌ **manual** - need to check each job status | ✅ **Automatic** - Zero downtime for job handling |
| **SQL Agent Job History** | ❌ **noise** - each job in the secondary server will generate useless history | ✅ **No Noise** - no useless alter message |
| **Consistent Job State** | ⚠️ **Low** - <br> • No job list<br> • No same enable/disable status<br>• Manual maintain job logic| ✅ **High** <br> • The same job list<br> • The same enable/disable status<br>• The same logic |
| **CDC Job** | ❌ **low** <br> Each server will execute job<br> Loss data <br>No failover recovery|   ✅ **High** <br> Ensures CDC capture jobs only run on the primary<br>Prevents CDC data loss caused by missing jobs on the new primary<br>Simplifies CDC failover recovery|
| **Safty** | • Each node will trigger job | • New primary automatically takes job workload<br>• Old primary automatically stops job workload |
| **Control** | Manual control | Centralized control |
| **Scales** | Less than Hundred jobs |  Hundreds or Thousands of Jobs |
| **scenarios** |   Development ,Test & Small application |  Enterprise|


### 4.**Summarize**
Compare to use customer procedure`Usp_CheckServerRole`,`ag_job_trigger` is suit for the enterprise production environment.It has high scalability to control the job status, logic.The most importantly, when we use `CDC` service to sync data from source db to target db. We cannot tolerate the risk of data loss.So, we must use `ag_job_trigger` to control `CDC` jobs.This is mandtary, not optional.


