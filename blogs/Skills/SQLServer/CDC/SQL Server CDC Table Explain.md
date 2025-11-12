---
title: SQL Server CDC Table Explain
date: 2025/10/09
tags:
 - SQLServerCDC
categories:
 - Skills
---

**clear explanation of each SQL Server CDC table and its columns**
---

# 📘 CDC Objects in SQL Server

When you enable CDC on a database + table, SQL Server automatically creates:

1. **Change tables** (`cdc.<capture_instance>_CT`) – store the row changes.
2. **System tables** (inside the `cdc` schema) – store metadata, job info, and LSN mappings.
3. **CDC functions** – to query changes (`fn_cdc_get_all_changes_*` etc.).

---

# 📗 1. Change Tables (`cdc.<capture_instance>_CT`)

Created for **each table you enable CDC on**.

* `<capture_instance>` = `<schema>_<table>` by default (e.g., `cdc.dbo_Customers_CT`).

### Columns inside change tables:

| Column                 | Type         | Description                                                           |
| ---------------------- | ------------ | --------------------------------------------------------------------- |
| **\_\_\$start\_lsn**   | `binary(10)` | LSN of the commit transaction.                                        |
| **\_\_\$end\_lsn**     | `binary(10)` | Always NULL (reserved).                                               |
| **\_\_\$seqval**       | `binary(10)` | Used to order changes within same LSN.                                |
| **\_\_\$operation**    | `int`        | Change type: 1=Delete, 2=Insert, 3=Update (before), 4=Update (after). |
| **\_\_\$update\_mask** | `varbinary`  | Bit mask → which columns were updated.                                |
| **(source columns)**   | various      | Copy of your original table’s columns.                                |

👉 Each DML change (INSERT/UPDATE/DELETE) is logged here.

---

# 📙 2. CDC Metadata Tables (in `cdc` schema)

### a) `cdc.change_tables`

* Lists all tables tracked by CDC.
* Columns:

| Column                    | Type      | Description                                          |
| ------------------------- | --------- | ---------------------------------------------------- |
| `capture_instance`        | sysname   | Name of the capture instance (e.g., dbo\_Customers). |
| `source_object_id`        | int       | Object ID of source table.                           |
| `source_schema`           | sysname   | Schema name of source table.                         |
| `source_table`            | sysname   | Table name being tracked.                            |
| `capture_columns`         | varbinary | List of captured column IDs.                         |
| `is_captured_column_list` | bit       | 1 = custom column list, 0 = all columns.             |
| `filegroup_name`          | sysname   | Filegroup used for change table.                     |
| `create_date`             | datetime  | When CDC was enabled.                                |

---

### b) `cdc.captured_columns`

* Lists all columns captured for each CDC-enabled table.
* Columns:

| Column           | Type    | Description                   |
| ---------------- | ------- | ----------------------------- |
| `object_id`      | int     | Object ID of change table.    |
| `column_ordinal` | int     | Position of column.           |
| `column_name`    | sysname | Name of the captured column.  |
| `column_type`    | int     | Type ID (from sys.types).     |
| `is_computed`    | bit     | Whether column is computed.   |
| `is_primary_key` | bit     | Whether column is part of PK. |

---

### c) `cdc.index_columns`

* Info about indexes of captured columns.
* Columns:

| Column           | Type | Description                    |
| ---------------- | ---- | ------------------------------ |
| `object_id`      | int  | Object ID of change table.     |
| `column_ordinal` | int  | Ordinal position.              |
| `column_id`      | int  | Column ID in the source table. |
| `is_primary_key` | bit  | Whether column is PK.          |

---

### d) `cdc.lsn_time_mapping`

* Maps **LSN (Log Sequence Number)** to actual time.
* Columns:

| Column            | Type       | Description              |
| ----------------- | ---------- | ------------------------ |
| `start_lsn`       | binary(10) | Beginning of log block.  |
| `tran_begin_time` | datetime   | Transaction begin time.  |
| `tran_end_time`   | datetime   | Transaction commit time. |
| `tran_id`         | varbinary  | Transaction ID.          |
| `tran_type`       | int        | Type of transaction.     |

👉 Useful to get **changes between dates**.

---

### e) `cdc.ddl_history`

* Stores **DDL changes** to tracked tables (schema changes).
* Columns:

| Column             | Type          | Description                            |
| ------------------ | ------------- | -------------------------------------- |
| `source_object_id` | int           | Object ID of source table.             |
| `capture_instance` | sysname       | Instance name.                         |
| `ddl_command`      | nvarchar(max) | DDL statement run (e.g., ALTER TABLE). |
| `ddl_lsn`          | binary(10)    | LSN when change happened.              |
| `ddl_time`         | datetime      | When the DDL occurred.                 |

---

# 📕 3. CDC Functions (auto-created per table)

* `cdc.fn_cdc_get_all_changes_<capture_instance>`
* `cdc.fn_cdc_get_net_changes_<capture_instance>`

These return changes between LSN ranges.

---

# ✅ Summary

When you enable CDC, SQL Server creates:

### **For each tracked table**

* A change table (`cdc.<schema_table>_CT`) → original columns + CDC metadata columns.

### **System-wide (once per DB)**

* `cdc.change_tables` → lists CDC-enabled tables.
* `cdc.captured_columns` → lists tracked columns.
* `cdc.index_columns` → info on PK/indexes.
* `cdc.lsn_time_mapping` → maps LSN to time.
* `cdc.ddl_history` → logs schema changes.

---
