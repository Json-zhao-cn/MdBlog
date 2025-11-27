---
title: Batch delete data in the SQL Server
date: 2025/11/27
tags:
 - SQLServer
categories:
 - Skills
---


## **`Batch delete` data in the SQL Server**

#### 1. **Common method**
```sql
DELETE FROM TableA
WHERE NOT EXISTS (
    SELECT 1 FROM TableB 
    WHERE B.Id = A.Id
)
AND A.LastUpdateTime < DATEADD(day, -7, GETDATE());
```
---

#### 2. **Big table**
```sql
DELETE TableA
FROM A
LEFT JOIN TableB ON A.Id = B.Id
WHERE B.Id IS NULL
AND A.LastUpdateTime < DATEADD(day, -7, GETDATE());
```
---

#### 3. **Large table**
```sql
-- Create temp table with index (much faster join lookups)
CREATE TABLE #TempToDelete
(
    Id BIGINT PRIMARY KEY
);

-- Populate IDs to delete
INSERT INTO #TempToDelete (Id)
SELECT A.Id
FROM TableA A
WHERE NOT EXISTS (
    SELECT 1
    FROM WAREHOUSE_LOCATION_View B
    WHERE B.Id = A.Id
)
AND A.LastUpdateOn > 'DateTime';

-- Batch delete in chunks
WHILE (1 = 1)
BEGIN
    DELETE TOP (10000) A
    FROM TableA A
    JOIN #TempToDelete T ON A.Id = T.Id;

    DELETE TOP (10000) FROM #TempToDelete;

    IF @@ROWCOUNT = 0 BREAK;
END;

DROP TABLE #TempToDelete;

```
---

#### 4. **truncate table**
If you want to delete the table data, and didn't want to keep transaction log. You can use `truncate table` SQL script.
```sql
truncate table YourTable;
```