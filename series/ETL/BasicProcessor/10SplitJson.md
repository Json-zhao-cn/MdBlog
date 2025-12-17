---
title: 10.SplitJson
date: 2025/12/11
tags:
 - ApacheNIFI
categories:
 - ETL
---
## **10.SplitJson**
---

### **What is `SplitJson`?**
1. The `SplitJson` is a key processor in the Apache NIFI application.
2. When we use `SplitJson` processor, we would better to set the queue is `FirstInFirstOut`

---
### 1. **`SplitJson` Properties**

| Property                                | Value / Explanation                         |
| --------------------------------------- | ------------------------------------------- |
| fragment.identifier	                  |A unique ID for the original JSON array      |
| fragment.index	                      |Index of the current split (0-based)         |
| fragment.count	                      |Total number of splits from the original     |
| fragment.*                              |Use UpdateAttribute to Delete fragment data  |
---