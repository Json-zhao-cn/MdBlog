---
title: Using merge into SQL Script to update,insert and delete data in the two tables
date: 2025/11/20
tags:
 - SQLServer
categories:
 - Skills
---

### Using merge into SQL Script to update,insert and delete data in the two tables
In the SQL Server, if we want to UID(Update,insert and delete) rows between TableA and TableB.

#### 1. No condition
```sql
MERGE INTO TestA AS Target
USING TestB AS Source
ON Target.Id = Source.Id
-- Update existing records when data differs
WHEN MATCHED THEN
    UPDATE SET
        Target.Name = Source.Name,
        Target.CreateOn = Source.CreateOn,
        Target.UpdateOn = Source.UpdateOn,
        Target.CloseOn = Source.CloseOn,
-- Insert new records that don't exist in target
WHEN NOT MATCHED BY TARGET THEN
    INSERT (Id, Name, CreateOn, UpdateOn,CloseOn)
    VALUES (Source.Id, Source.Name, Source.CreateOn, Source.UpdateOn,Source.CloseOn)
-- Delete records that no longer exist in source (with age restriction)
WHEN NOT MATCHED BY SOURCE then
    DELETE;
```

#### 2. Has Query Condition
```sql
MERGE INTO TestA AS Target
USING TestB AS Source
ON Target.Id = Source.Id

-- Update existing records when data differs
WHEN MATCHED AND (
    isnull(Target.UpdateOn, Target.CreateOn) <>isnull(Source.UpdateOn, Source.CreateOn)
) THEN
    UPDATE SET
        Target.Name = Source.Name,
        Target.CreateOn = Source.CreateOn,
        Target.UpdateOn = Source.UpdateOn,
        Target.CloseOn = Source.CloseOn
-- Insert new records that don't exist in target
WHEN NOT MATCHED BY TARGET THEN
    INSERT (Id, Name, CreateOn, UpdateOn,CloseOn)
    VALUES (Source.Id, Source.Name, Source.CreateOn, Source.UpdateOn,Source.CloseOn)
-- Delete records that no longer exist in source (with age restriction)
WHEN NOT MATCHED BY SOURCE AND THEN
    DELETE;
```

#### 3. Has Query Condition(Multiple columns)
```sql
MERGE INTO TestA AS Target
USING TestB AS Source
ON Target.Id = Source.Id
-- Update existing records when data differs
WHEN MATCHED AND (
    COALESCE(Target.CloseOn,Target.UpdateOn, Target.CreateOn) <>COALESCE(Source.CloseOn,Source.UpdateOn, Source.CreateOn)
) THEN
    UPDATE SET
        Target.Name = Source.Name,
        Target.CreateOn = Source.CreateOn,
        Target.UpdateOn = Source.UpdateOn,
        Target.CloseOn = Source.CloseOn
-- Insert new records that don't exist in target
WHEN NOT MATCHED BY TARGET THEN
    INSERT (Id, Name, CreateOn, UpdateOn,CloseOn)
    VALUES (Source.Id, Source.Name, Source.CreateOn, Source.UpdateOn, Source.CloseOn)
-- Delete records that no longer exist in source (with age restriction)
WHEN NOT MATCHED BY SOURCE AND THEN
    DELETE;
```

### 4. Has delete condition
```sql
MERGE INTO TestA AS Target
USING TestB AS Source
ON Target.Id = Source.Id
-- Update existing records when data differs
WHEN MATCHED AND (
    COALESCE(Target.CloseOn,Target.UpdateOn, Target.CreateOn) <>COALESCE(Source.CloseOn,Source.UpdateOn, Source.CreateOn)
) THEN
    UPDATE SET
        Target.Name = Source.Name,
        Target.CreateOn = Source.CreateOn,
        Target.UpdateOn = Source.UpdateOn,
        Target.CloseOn = Source.CloseOn
-- Insert new records that don't exist in target
WHEN NOT MATCHED BY TARGET THEN
    INSERT (Id, Name, CreateOn, UpdateOn,CloseOn)
    VALUES (Source.Id, Source.Name, Source.CreateOn, Source.UpdateOn, Source.CloseOn)
-- Delete records that no longer exist in source (with age restriction)
WHEN NOT MATCHED BY SOURCE AND 
    Target.UpdateOn > DATEADD(DAY, -9, GETDATE()) THEN
    DELETE;
```