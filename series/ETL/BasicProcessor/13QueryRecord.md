---
title: 13.QueryRecord
date: 2025/12/14
tags:
 - ApacheNIFI
categories:
 - ETL
---

## **13.QueryRecord**
---

### 1.**What is the `QueryRecord`?**
1. It evaluate one or more SQL queries against the contents of a FlowFile.We can use it to filter specific record based on the content field.  
2. It just like the re-filter in your ExecutedSQLRecord result.

```txt
    FirstRord  : SELECT * FROM FLOWFILE WHERE YourFirstField  ='YourFilterData'
    SecondRord  :  SELECT * FROM FLOWFILE WHERE YourSecondField  like '%YourFilterData%'
```

---
### 2.**Attribute**
1. **Record Reader**:Reader Controller-Service
2. **Record Writer**:Writer Controller-Service
3. **Default Decimal Precision**: Default value is 10
4. **Default Decimal Scale**: Default value is 0

---
### 3.**Use case**
1. Configuration:
 - ![Config](/docs/ApacheNIFI/QueryRecord/Config.png)

2. Route:
 - ![Config](/docs/ApacheNIFI/QueryRecord/Route.png)