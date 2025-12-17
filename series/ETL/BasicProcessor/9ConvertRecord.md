---
title: 9.ConvertRecord
date: 2025/12/10
tags:
 - ApacheNIFI
categories:
 - ETL
---

## **9.ConvertRecord**
---

### 1. **What is the `ConvertRecord`?**
1. **ConvertRecord** is convert data from one record-oriented format to another.
   
2. **ConvertRecord** uses configured Record Reader and Record Write Controller Services to from one data format to another. 
   
3. **Reader and Writer** must have the same filed.

---
### 2 **Properties**
#### 2.1 **Record Reader**
#### 2.1.1 **Purpose**
Specifies the **`Controller Service`** to use for reading incoming data

#### 2.1.2 **Commond Services**
   - org.apache.nifi.avro.AvroReader
   - org.apache.nifi.csv.CSVReader
   - org.apache.nifi.excel.ExcelReader
   - org.apache.nifi.json.JsonPathReader
   - org.apache.nifi.json.JsonTreeReader
   - org.apache.nifi.windowsevent.WindowsEventLogReader
   - org.apache.nifi.xml.XMLReader
   - org.apache.nifi.yaml.YamlTreeReader
  
#### 2.2 **Record Writer**
#### 2.2.1 **Purpose**
Specifies the **`Controller Service`** to use for writing out the records；
#### 2.2.2 **Commond Services**
   - org.apache.nifi.avro.AvroRecordSetWriter
   - org.apache.nifi.csv.CSVRecordSetWriter
   - org.apache.nifi.json.JsonRecordSetWriter
   - org.apache.nifi.xml.XMLRecordSetWriter

---
### 3 **How to use in the `ExecuteSQL` and `ExecuteSQLRecord` processors?**
#### 3.1 **After ExecuteSQL**
In the `ConvertRecord Properties`, the set is as flows:
**Record Reader**:AvroReader
**Record Writer**:JsonRecordSetWriter

#### 3.2 **After ExecuteSQLRecord**
In the `ConvertRecord Properties`, the set is as flows:
**Record Reader**:JsonTreeReader
**Record Writer**:JsonRecordSetWriter

However, you don't need to use `ConvertRecord` processor to convert `ExecuteSQLRecord` result as Json formate. Because we can set the `ExecuteSQLRecord` result as Json formate.