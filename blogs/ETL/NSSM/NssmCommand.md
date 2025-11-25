---
title: NSSM Command
date: 2025/11/14
tags:
 - ApacheNIFI
categories:
 - ETL
---


## **NSSM Command**
### 1. Install Service
`C:\nssm\nssm.exe install NiFi-2.3.0`
### 2. Remove Service
`NSSM remove NiFi-2.3.0 confirm`
### 3. Start Service
`net start NiFi-2.3.0`
### 4. Stop Service
`net stop NiFi-2.3.0`
### 5.Set output log
`stdout: C:\nifi-2.3.0\logs\nifi-service-out.log`
### 6.Set error log
`stderr: C:\nifi-2.3.0\logs\nifi-service-err.log`
### 7.Set environment
`NIFI_ROOT=C:\nifi-2.3.0`
`NIFI_PID_DIR=C:\nifi-2.3.0\run`
`NIFI_LOG_DIR=C:\nifi-2.3.0\logs`
