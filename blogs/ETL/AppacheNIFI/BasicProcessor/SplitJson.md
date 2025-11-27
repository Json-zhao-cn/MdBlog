---
title: Apache NIFI SplitJson processor
date: 2025/11/27
tags:
 - ApacheNIFI
categories:
 - ETL
---

## **Apache NIFI `SplitJson` processor**
The `SplitJson` is a key processor in the Apache NIFI application.
When we use `SplitJson` processor, we would better to set the queue is `FirstInFirstOut`

---
### 1. **`SplitJson` Attribute**

| Property                                | Value / Explanation                         |
| --------------------------------------- | ------------------------------------------- |
| fragment.identifier	                  |A unique ID for the original JSON array      |
| fragment.index	                      |Index of the current split (0-based)         |
| fragment.count	                      |Total number of splits from the original     |
| fragment.*                              |Use UpdateAttribute to Delete fragment data  |
---