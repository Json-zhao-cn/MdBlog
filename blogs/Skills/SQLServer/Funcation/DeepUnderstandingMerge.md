---
title: Deep understanding of the operation mechanism of merge in SQL Server
date: 2025/11/20
tags:
 - SQLServer
categories:
 - Skills
---

## Deep understanding of the operation mechanism of merge in SQL Server
### 1. What is merge into?
In the official document explanation,`MERGE INTO` (also known as UPSERT) is a feature introduced in SQL Server 2008, which allows `INSERT`, `UPDATE` and `DELETE` operations to be performed in a single statement. In a word, it is sql script can execute  `INSERT`, `UPDATE` and `DELETE`.
### 2. Why we need to use merge into?
1. Traditionally, if we want compare two tables differences. Most of time, we will use complicate sql script or stored procedure to do it.Now, we can use merge into to simple realize it.
2. Merge into just generate only one transcation log. And the transcation log is equal to total mount of  the insert, update and delete transaction logs.
### 3. Merge into execute process
1. Only perform a full table scan once
2. Join table based on the condition(`It is better has some indexes in your condition`)
3. **Data partition** Dividing it into three operations(Unpdate,Insert, delete);
4. Each rows will check the PK and FK constraints;
5. Commit transcation(Only one)
### 4. Merge into disadvantage
1. **High quality with developer**:The developer must familar with SQL, if the condition has no index, very slowly;
2. **Index constraint**:It is best that the table does not have foreign keys or triggers.(Index constraint)
3. **Lock**:Big data has large lock;


### 5. Merge into benefit
1. **Readability**:Simple code, easy read and understand;
2. **Transaction atomicity**: One transcation and data consistency;
3. **High-performance**: Reduce scan table and I/O read;
4. **Compalicated Logic handling**:Can deal with complicated logic;
5. **Batch deal**: Big data small batch deal;

