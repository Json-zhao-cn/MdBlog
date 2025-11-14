---
title: Parse specific Json
date: 2025/11/12
tags:
 - ApacheNIFI
categories:
 - ETL
---

## **Parse specific Json**

After get htttp data, we will get the specific json.Normally, when we use the native NIFI processor to parse json. It will be diffcult. So
We will use groovy to parse it.

### 1. This json like this:
```json
  {
    "inscope":[{
        "Order":"WIP1",
        "Quantity":1,
        },
        {
        "Order":"WIP2",
        "Quantity":2.5,
    }]
  }
```

### 2. Groovy script
```Groovy
import groovy.json.JsonSlurper
import groovy.json.JsonOutput
import org.apache.nifi.processor.io.StreamCallback
import org.apache.nifi.processor.io.OutputStreamCallback

import java.nio.charset.StandardCharsets

def flowFile = session.get()
if (!flowFile) return

try {
    def jsonText = session.read(flowFile).getText(StandardCharsets.UTF_8.name())

    // Check if content is effectively null or empty
    if (!jsonText || jsonText.trim().isEmpty() || jsonText ==~ /^\s*\{?null\}?\s*$/) {
        log.error("No data")
        session.transfer(flowFile, REL_FAILURE)
        return
    }

    def jsonSlurper = new JsonSlurper()
    def parsedJson = jsonSlurper.parseText(jsonText)
    
    def inscopeArray = parsedJson.inscope
    
    if (inscopeArray == null) {
        log.error("No inscope data - inscope is null")
        session.transfer(flowFile, REL_FAILURE)
        return
    }
    
    if (inscopeArray.isEmpty()) {
        log.error("No  inscope data - inscope array is empty")
        session.transfer(flowFile, REL_FAILURE)
        return
    }
    
    def outputJson = JsonOutput.toJson(inscopeArray)
    flowFile = session.write(flowFile, { outputStream ->
        outputStream.write(outputJson.getBytes("UTF-8"))
    } as OutputStreamCallback)
    
    session.transfer(flowFile, REL_SUCCESS)
    
} catch (Exception e) {
    log.error("Failed to process JSON  Script: ${e.message}", e)
    session.transfer(flowFile, REL_FAILURE)
}
```