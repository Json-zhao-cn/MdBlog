---
title: Using groovy to add delay after splitJson
date: 2025/11/25
tags:
 - ApacheNIFI
categories:
 - ETL
---
 
## **Using groovy to add delay after splitJson**
### 1. **Scenario** 
When we use Apache NIFI to sync source db table to target db. If we meet some complicated scenarios. Such as: we will get the parent data, then, using each parent data to get child data.We will use  `splitJso` processor to do it. However, if we use `PutSQL` or `PutDatabaseRecord`, we want to control the queue speed. However, it is so hard to add delay when we use the native component.According to this situation, we can use `groovy` to add customer dealy time in your queue.
### 2. **Solution**
After splitJson, add delay for each queue
```Groovy
import groovy.json.JsonSlurper
import org.apache.nifi.processor.io.InputStreamCallback
import java.util.concurrent.TimeUnit

def flowFile = session.get()
if (!flowFile) return

try {
    // --- Read JSON content ---
    String jsonText = ''
    session.read(flowFile, { inputStream ->
        jsonText = inputStream.getText('UTF-8')
    } as InputStreamCallback)

    // --- Parse JSON ---
    def json = new JsonSlurper().parseText(jsonText)
    int index = (json?.index ?: 0) as int

    // --- Calculate dynamic delay ---
    long delayMs = calculateDelay(index)

    if (delayMs > 0) {
        log.warn("Each queue | Processing index ${index}, delaying ${delayMs} ms")
        sleepSafely(delayMs)
    }

    session.transfer(flowFile, REL_SUCCESS)

} catch (Exception e) {
    log.error("Error processing flowFile", e)
    session.transfer(flowFile, REL_FAILURE)
}


/**
 * Calculates increasing delay:
 * index < 8  ? 0ms
 * every +8 index ? +0.5 sec
 * max delay       ? 5 sec
 */
long calculateDelay(int index) {
    if (index < 8) return 0

    int delaySegment = ((index - 8) / 10) + 1
    double delaySeconds = delaySegment * 0.5

    // Cap max delay to 5 sec
    delaySeconds = Math.min(delaySeconds, 5.0)

    return (long)(delaySeconds * 1000)
}


/**
 * Safer sleep wrapper (avoids interrupted exceptions breaking NiFi)
 */
void sleepSafely(long ms) {
    try {
        Thread.sleep(ms)
    } catch (InterruptedException ie) {
        log.warn("Sleep interrupted: ${ie.message}")
        Thread.currentThread().interrupt()
    }
}

```
### 3. **Summarize**
1. You can use `PutAttribute` to customize your `index group` and `delay time`. It is easy to duplicate to another group.