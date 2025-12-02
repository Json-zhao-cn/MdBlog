---
title: Controller-services
date: 2025/12/3
tags:
 - ApacheNIFI
categories:
 - ETL
---

## **Controller-services**
### 1. **What is Controller-services?**
Controller-services is nifi services cluster. You can easy add DB connect, json reader and writer, kafka and cache services in your ETL.

---
### 2. **Common services**
- **DB Connection service**:`DBCPConnectionPool`
- **Json operation**:`JsonRecordSetWriter` and `JsonTreeReader`
- **Cache**: `DistributedMapCacheLookupService`
- **XML**: `XMLReader` and `XMLRecordSetWriter`