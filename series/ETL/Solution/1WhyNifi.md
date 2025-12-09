---
title: Why NIFI?
date: 2025/12/9
tags:
 - ApacheNIFI
categories:
 - ETL
---

## **Why NIFI?**
If your company want to build an enterprise digitalization project. You need build a data lake, over 90% projects data come from the data lake.Your original data maybe from different documents, databases and applications. Therefore, you need to extract your original data, transform business root data and load diffenert data to your database.

If your company don't want to buy a commercial ETL tool. There are two **`data-oriented tools(Apache NIFI,SSIS)`** and **`.ENT code-oriented job third party(Hangfire)`** for you to choose.
 
---
### **Tools compare**

|     Area              | **Apache NiFi(2.4X)**               |                     **SSIS**                        |                   **Hangfire**                      |
| ----------------------| ----------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| **Primary Purpose**   |       Flow-based data               | Flow-based data on SQL Server                       |           .NET background job scheduling            |
| **Third component**   | Lots of third component(kafak,elastic)          | Miscrosoft skill stack                  |           Depondence on your extension              |
| **Real-time streaming** | Data flow, streaming flow         | SQL Server Job agent                                |   Not a stream engine, background shcedule job/task |
|   **complexity**      | easy to buid, hard to deal with complex business| Miscrosoft component, each build, hard deal with complex business | All job need write code   |
|   **Scalability**     | Apache nifi cluster                 |  SQL Server alwayson                                |    .NET Server cluster                              |
|   **Cost**            | Open source                         |  SQL Server / Azure licensing                       |    Open source                                      |

---
### **Summrize**
1. If your company don't want to cost more, Apache NIFi is best
2. If your company has more .NET developer, Apache NIFI + Hangfire is best. Apache NIFI deals with easy business, .NET+Hangfire deal with extremely complex business
3. If your company uses SQL Server as main database, SSIS is best.
4. Apache NIFI has hign scalability than SSIS.