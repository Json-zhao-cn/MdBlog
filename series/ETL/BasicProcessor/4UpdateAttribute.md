---
title: 4.UpdateAttribute
date: 2025/12/4
tags:
 - ApacheNIFI
categories:
 - ETL
---

## **4.UpdateAttribute**

---
### 1. **What is UpdateAttribute?**
1. This processor is `add`, `modify` and `delete`  attribute;
   
2. We can use `NIFI Attribute Expression Language` to add, delete some attributes;

---
### 2. **delete last SQL parameters**
1. Why we need to delete last SQL parameters?
   Because wehen we use `PutSQL` processor to execute SQL script, we will decorate some parameters. When you do next `PutSQL`, it will case parameter error.So, we need to delete last SQL parameters.

2. **Delete Attributes Expression**: `^sql\.args\..*$`

