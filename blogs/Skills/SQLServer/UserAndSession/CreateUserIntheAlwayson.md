---
title: Create same user and password in the SQL server alwayson availability group(AG) 
date: 2025/11/27
tags:
 - SQLServer
categories:
 - Skills
---

## **Create same user and password in the `SQL server alwayson` `availability group(AG)`**
In the SQL Server awlayson availability group(AG), most of time, we also connect the `AG listener`.So, we will create the `read-ony` and `write` user in the AG.That's mean we will create the same user and password in the availability group.

#### 1. **Create User in the primary server**
Your password should meet the password complexity requirements of the database or company strategy.

```SQL
CREATE LOGIN YourUser WITH PASSWORD = 'YourPS'
```

#### 2. **get user sid**
```sql
SELECT name, sid 
FROM sys.sql_logins 
WHERE name = 'YourUser';
```

#### 3. Create same User in the secondary DB
```sql
CREATE LOGIN YourUser WITH PASSWORD = 'YourPS', SID = primarySid;
```

#### 4. Create User in the Secondary DB without password complexity verification

```sql
CREATE LOGIN YourUser WITH PASSWORD = 'YourPS', SID = primarySid ,CHECK_POLICY = OFF, CHECK_EXPIRATION = OFF;
```

### 5.End
Now, you can use `YourUser` to access the AG listener group.