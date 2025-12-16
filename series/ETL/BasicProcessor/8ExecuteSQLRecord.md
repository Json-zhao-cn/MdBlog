---
title: ExecuteSQLRecord
date: 2025/12/8
tags:
 - ApacheNIFI
categories:
 - ETL
---

### 1. **What is ExecuteSQLRecord?**
1. **ExecuteSQLRecord** like `ExecuteSQL` processor.
2. We use this processor convert SQL query result as Json formate data.
3. This processor is replcase `ConvertAvroToJSON` processor

---
### 2. **Attribute**
1. **record.count**: we can use this attribute to judge we get data or not.

2. **executesql.row.count**: we also can use this attribute to judge we get data or not.