---
title: Using ApacheNIFI to connect SQL Server alwayson db
date: 2025/11/12
tags:
 - ApacheNIFI
categories:
 - ETL
---

## **Using ApacheNIFI to connect SQL Server alwayson secondary db**
In the NIFI controllerService,input the AG name

`jdbc:sqlserver://AG:1433;databaseName=YourDB;encrypt=false;encrypt=false;applicationIntent=ReadOnly;multiSubnetFailover=true;`

![ControllerService](./ControllerServices.png)

---
## **Using ApacheNIFI to connect SQL Server alwayson primary db**
In the NIFI controllerService,input the AG name

`jdbc:sqlserver://AG:1433;databaseName=YourDB;encrypt=false;trustServerCertificate=true;multiSubnetFailover=true;applicationIntent=ReadWrite`;

![ControllerService](./ControllerServices.png)
---