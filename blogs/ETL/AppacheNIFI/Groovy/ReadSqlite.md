---
title: Using groovy to read Sqlite data
date: 2025/11/27
tags:
 - ApacheNIFI
categories:
 - ETL
---
 
## **Using groovy to read `Sqlite` data**
We can use groovy to read `Sqlite` data. In the groovy, you can write your customer SQL.

```groovy
import java.nio.file.*
import java.sql.*
import groovy.json.JsonOutput
import org.apache.nifi.processor.io.StreamCallback
import java.nio.charset.StandardCharsets

def flowFile = session.get()
if (flowFile == null) return


def _sqliteDbPath = Paths.get("path/yourdb.db")

def conn = null
def results = []
def signalId = "sqlitesignal-" + System.currentTimeMillis()
def signalCount = 0

try {
    // Step 1: Connect to the backup database
    Class.forName("org.sqlite.JDBC")
    def jdbcUrl = "jdbc:sqlite:${_sqliteDbPath.toString().replace('\\', '/')}"
    conn = DriverManager.getConnection(jdbcUrl)

    // Step 2: Execute SQL query
    def sql = '''
        Your customer sql in here
    '''
    def stmt = conn.createStatement()
    def rs = stmt.executeQuery(sql)

    // Step 3: Read result set into map list
    def rsMeta = rs.metaData
    def columnCount = rsMeta.columnCount

    while (rs.next()) {
        def row = [:]
        for (int i = 1; i <= columnCount; i++) {
            def columnName = rsMeta.getColumnLabel(i)
            row[columnName] = rs.getObject(i)
        }
        results << row
        signalCount ++
    }

    rs.close()
    stmt.close()
    log.warn("Read Data success")
} catch (Exception e) {
    log.error("Error executing SQLite query: ", e)
    throw e
} finally {
    if (conn != null) conn.close()
}

// Step 4: Write the JSON to flowfile content
flowFile = session.write(flowFile, { inputStream, outputStream ->
    def json = JsonOutput.toJson(results)
    outputStream.write(json.getBytes(StandardCharsets.UTF_8))
} as StreamCallback)

// Step 5: Add attributes
flowFile = session.putAllAttributes(flowFile, [
    "sqlitesignal.count": signalCount.toString(),
    "sqlitesignalId"    : signalId
])
log.warn("putAllAttributes success: ${signalCount} records, sqlitesignalId: ${signalId}")
session.transfer(flowFile, REL_SUCCESS)
```
---
You also can add the ODBC service in the NIFI `Controller services`. In this way, you don't need to read `sqlite` db file directly.