---
title: Common expression in the Apache NIFI
date: 2025/11/27
tags:
 - ApacheNIFI
categories:
 - ETL
---

### **`Common expression` in the Apache NIFI**
#### 1. **`DateTime` Expression**
| Expression                                   | Value / Explanation            |
| ---------------------------------------      | ------------------------------ |
| ${now()}                                     |  2025-06-05T14:30:00.123Z      |
| ${now():format("yyyyMMdd")}                  |  20250605                      |
| ${now():format("yyyy-MM-dd'T'HH:mm:ss.SSS")} |  2025-06-05T14:30:00.123       |
| ${now():format("yyyy-MM-dd HH:mm:ss")}       |  2025-06-05 14:30:00.123Z      |
---
