---
title: Using groovy to check Json is null or not
date: 2025/11/15
tags:
 - ApacheNIFI
categories:
 - ETL
---

## Using groovy to check Json is null or not
### 1. **Scenario** 
In the Apache NIFI context, when we get respond Json from `InvokeHTTP` or convertJson from `ExecutedSQL`. We need to check json data is null or not.Most of time, we will use some attributes like `execute.sql.count` to check json. However,sometimes, we can not judge json is null or not directly.According this situation, we can use groovy script to do it.

### 2. **Solution**
If we want to next process after `checkJsonIsNull`, that is mean we need to deal with Json is null situation, we can use a customer attribute field like`IsQueueNull` to do it.
If we do not want to deal with next process, we can throw the `Exception` directly.
You can choose different logic code based on your business.
```groovy
//checkJsonIsNull
import groovy.json.JsonSlurper
import java.nio.charset.StandardCharsets

def flowFile = session.get()
if (!flowFile) return

def jsonText = ""
session.read(flowFile, { inputStream ->
    jsonText = inputStream.getText(StandardCharsets.UTF_8.name())
} as InputStreamCallback)

def isQueueNull = false

try {
    if (!jsonText?.trim()) {
        isQueueNull = true
    } else {
        def jsonData = new JsonSlurper().parseText(jsonText)
        
        // null map list
        isQueueNull = (jsonData == null || 
                      (jsonData instanceof List && jsonData.isEmpty()) || 
                      (jsonData instanceof Map && jsonData.isEmpty()))
    }
} catch (Exception e) {
    isQueueNull = true
}

flowFile = session.putAttribute(flowFile, "IsQueueNull", isQueueNull ? "true" : "false")
session.transfer(flowFile, REL_SUCCESS)
```