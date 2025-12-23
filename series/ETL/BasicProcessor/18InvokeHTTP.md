---
title: 18.InvokeHTTP
date: 2025/12/19
tags:
 - ApacheNIFI
categories:
 - ETL
---

## **18.InvokeHTTP**
---
### 1.***What is the `InvokeHTTP`?***
1. `InvokeHTTP` is an HTTP client processor which can interact with a configurable HTTP Endpoint.

---
### 2. ***Properties***
1. **HTTP Method**:GET, POST, PUT, PATCH, DELETE
2. **HTTP URL**:HTTP remote URL including a scheme of http or https, as well as a hostname or IP address with optional port and path elements. 
3. **Connection Timeout**:Maximum time to wait for initial socket connection to the HTTP URL.

---
### 3. ***Writes Attributes***
1. **invokehttp.status.code**:The status code that is returned
2. **invokehttp.status.message**：The status message that is returned
3. **invokehttp.response.body**	：In the instance where the status code received is not a success (2xx) then the response body will be put to the 'invokehttp.response.body' attribute of the request FlowFile.
4. **invokehttp.request.url**:The original request URL
5. **invokehttp.response.url**：The URL that was ultimately requested after any redirects were followed

- ![UseCase](/docs/ApacheNIFI/InvokeHttp/Response.png)
