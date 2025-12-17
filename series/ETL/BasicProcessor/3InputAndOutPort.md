---
title: 3.Input and out port
date: 2025/12/3
tags:
 - ApacheNIFI
categories:
 - ETL
---

## **3.Input and out port**

---
### 1.**What is input and out port?**
1. Input port is you recieve the parameters and results from last group;
<br>
2. Out port is you output the parameters and results your current group for next group use;
<br>
3. Input and out port is a bridge to connect different group.
<br>
4. `Out port is not neccessary for a group`. If you don't want to output your parameters and result,you don't need add out port processor in your group.
<br>
5. `Input port is mandatory for a group.`