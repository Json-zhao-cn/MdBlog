---
title: Using AG Trigger to Sync Job status in the SQL Server Alwayson cluster

date: 2025/11/21
tags:
 - SQLServer
categories:
 - Skills
---

# Using `AG Trigger` to `Sync Job status` in the `SQL Server Alwayson` cluster

**This solution was dispose due to the AG trigger is hard to realize in the SQL Server alwayson. Recommand use add step to check current listener is primary or not.[The realize solution](./SyncJobAG.md)**

# Process
```Text
    +------------------------------------+
    |       Failover_Job_Status Table    |
    +------------------------------------+
                    |
                    ▼
    +------------------------------------+
    | Usp_syncJobStatus Stored procedure |
    +------------------------------------+
                    |
                    ▼
    +------------------------------------+
    |       sync_JobStatus Job           |
    +------------------------------------+
                    |
                    ▼
    +------------------------------------+
    |      Duplicate all jobs AG Node    |
    +------------------------------------+
                    |
                    ▼
    +------------------------------------+
    |      AG failover trigger           |
    +------------------------------------+
                    |
                    ▼
    +------------------------------------+
    |               Test                 |
    +------------------------------------+

```
---
## 1. **Create Customer Failover_Job_Status**
Create a customer table in your AG Group DB. We call it as AT_AG_JobStatus.

```SQL
CREATE TABLE [dbo].[AT_AG_JobStatus](
	[JobName] [nvarchar](128) NOT NULL,
	[Status] [bit] NOT NULL,
	[IsPrimary] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[JobName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[AT_AG_JobStatus] ADD  DEFAULT ((1)) FOR [IsPrimary]
GO
```
Field explanation:
-  **Status**: The job enable or disable
-  **IsPrimary**: Some jobs like `transaction log backup` job, it should execute in the secondary replica.If this job didn't execute in the primary job, and the status is enable, we should maintenance this job manually.Which means we can insert this job into table automatically. 

This table will save all job status,execute server in the primary (Available Group)AG DB.
---

## 2. **Create Stored procedure to sync Job Status** 



## 3. **Create Job to sync Job Status automatically**

## 4. **Duplicate all jobs from master to all slavers**

## 5. **Create an Availability Group (AG) failover trigger**

---

### 7.**Summarize**
1. Hard to realize it;
2. The AG trigger in the AG group, sometimes it is hard to trigger. Only primary can trigger.
---

