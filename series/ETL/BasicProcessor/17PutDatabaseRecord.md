---
title: PutDatabaseRecord
date: 2025/11/27
tags:
 - ApacheNIFI
categories:
 - ETL
---

## **Apache NIFI `PutDatabaseRecord` processor**
The `PutDatabaseRecord` is a most important  key processor in the Apache NIFI application.

We can use `PutDatabaseRecord` to **batch** `insert`,`update`,`delete` data.

---

#### 1. **`PutDatabaseRecord` Attribute**
| Property                                | Value / Explanation                                                    |
| --------------------------------------- | ---------------------------------------------------------------------- |
| **Record Reader**                       | `JsonTreeReader` (or use `AvroReader` if you converted format earlier) |
| **Database Connection Pooling Service** | Your configured `DBCPConnectionPool` for SQL Server                    |
| **Table Name**                          | `Staging_MyTable` (use your actual staging table name)                 |
| **Schema Name**                         | *(leave blank unless your schema is not `dbo`)*                        |
| **Translate Field Names**               | `true` — maps JSON/record fields to SQL columns                        |
| **Statement Type**                      | `INSERT` — inserts records into the table                              |
| **Field-to-SQL Type Mapping**           | *(optional)* — only if NiFi has trouble detecting data types           |
| **Update Key Column**                   | *(leave blank — not needed for INSERT)*                                |