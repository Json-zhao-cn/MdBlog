---
title: 12.RouteOnAttribute
date: 2025/12/13
tags:
 - ApacheNIFI
categories:
 - ETL
---

## **12.RouteOnAttribute**
---

### 1.**What is the `RouteOnAttribute`?**
1. Route data to one or more relationships based on its attributes using the NiFi Expression Language.
2. It just like SQL `CASE WHEN`:

```txt
    Route1  : Nifi Expression1
    Route2  : Nifi Expression2
    Route3  : Nifi Expression3
    Route4  : Nifi Expression4
    unmatched
```
---
### 2.**Attribute**
1. **Routing Strategy**:Route to Property name

---
### 3.**Use case**

1. Judge the `ExecuteSQL` result is null or not
   - NullData:`${executesql.row.count:lt(0)}`
   - ZeroData:`${executesql.row.count:equals(0)}`
   - HasData:`${executesql.row.count:gt(0)}`
If executesql.row.count<0, go to NullData Route;
Else if executesql.row.count=0, go to ZeroData Route;
Else if executesql.row.count>0, go to ZeroData Route;

2. Deal with complex Json
 - Write Route
 - ![WriteRoute](/docs/ApacheNIFI/RouteOnAttribute/WriteRoute.png) 


   - go to Route
   - ![GoToRoute](/docs/ApacheNIFI/RouteOnAttribute/GotoRoute.png) 
