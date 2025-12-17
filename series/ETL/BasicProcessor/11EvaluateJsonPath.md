---
title: 11.EvaluateJsonPath
date: 2025/12/12
tags:
 - ApacheNIFI
categories:
 - ETL
---

## **11.EvaluateJsonPath**
---

### 1.**What is the `EvaluateJsonPath`?**
1. `EvaluateJsonPath` processor evaluates one or more `JsonPath expressions` against the content of a FlowFile
   
2. It extracts the Json attributes or contents from your Json data.


### 2.**`Properties`**

#### 2.1 **`Destination`**

##### 2.1.1 `flowfile-content`: the `FlowFile content` will be updated to any JSON objects that match the JsonPath. **Only update FlowFile content, never add customer attributes**

##### 2.1.2 `flowfile-attribute`: the `FlowFile attribute` will be set to any JSON objects that match the JsonPath.**Only add customer attributes, never update FlowFile content**


### 3.**Use case**
1. After `SplitJson`, we want to extract the specific Json attributes value from last Json formate data;
   
2. After `InvokeHttp`, we want to extract the specific Json attributes value from HTTP responde result;