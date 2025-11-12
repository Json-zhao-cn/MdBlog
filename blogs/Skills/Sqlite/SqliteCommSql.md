---
title: The common sqlite Command
date: 2025/11/11
tags:
 - Sqlite
categories:
 - Skills
---

### Show database;
-  Show database;
```cmd
.databases;
```
-  Show mode out as box;
```cmd
.mode box;
```
-  Show mode out as json;
```cmd
.mode json;
```

-  Show alltables
```cmd
    .tables 
```
-  select all alltables
```sql
Select AllTable SELECT name FROM sqlite_master WHERE type='table'; 
```
-  delete  alltables
```sql
Drop TableName';
```

-  add Cloumn into table
```sql
ALTER TABLE Department ADD RowVersionStamp int NOT NULL DEFAULT 0;
```

-  add trigger into table
```sql
CREATE TRIGGER Department_RowVersionStamp AFTER UPDATE ON Department
FOR EACH ROW
BEGIN
    UPDATE Department
    SET RowVersionStamp = RowVersionStamp + 1
    WHERE Id = OLD.Id;
END;

insert into Department (id,Department)values(11,11);
update Department set active=0 where id=11;
```

