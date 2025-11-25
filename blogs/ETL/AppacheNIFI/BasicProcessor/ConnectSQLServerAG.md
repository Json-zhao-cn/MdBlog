---
title: Using ApacheNIFI to connect SQL Server alwayson secondary db
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