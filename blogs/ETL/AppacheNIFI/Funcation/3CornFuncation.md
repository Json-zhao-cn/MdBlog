---
title: How to use Corn driven strategy in the Apache NIFI
date: 2025/11/27
tags:
 - ApacheNIFI
categories:
 - ETL
---

## **How to use Corn driven strategy in the Apache NIFI**
There are two `shceduling strategy` in the Apache NIFI. One is `Timer driven`, another is `Corn driven`.

![ControllerService](./schedulingstrategy.png)

When we use `Timer driven`, we can easy do the time shedule about the jobs.However, when there are so many jobs in your `NIFI`.It is so hard to utilize the server `CPU` and `I/O` resource. 

When we use `Corn driven`. It is so easy to utilize the server resource and do the job scheduling.

---
### 1.**Cron Expression Format**
The corn format is:

```
    *     *      *                *                * ?
Seconds Minutes Hours DayOfMonth Month DayOfWeek Year(optional)
```

So a complete cron expression looks like:

```
0 0 12 * * ?      →  Every day at 12:00 PM (noon)
```
Each field meaning:

| Field           | Allowed Values   | Special Characters |
| --------------- | ---------------- | ------------------ |
| Seconds         | 0–59             | , - \* /           |
| Minutes         | 0–59             | , - \* /           |
| Hours           | 0–23             | , - \* /           |
| Day of month    | 1–31             | , - \* ? / L W C   |
| Month           | 1–12 or JAN–DEC  | , - \* /           |
| Day of week     | 1–7 or SUN–SAT   | , - \* ? / L C #   |
| Year (optional) | empty, 1970–2099 | , - \* /           |

---
### 2.**Common Examples**

| Schedule Description                      | Cron Expression  |
| ------------------------------------      | ---------------- |
| Every day at midnight                     | `0 0 0 * * ?`    |
| Every 5 minutes                           | `0 0/5 * * * ?`  |
| Every 2 hours                             | `0 0 0/6 * * ?`  |
| Every hour at 15 min past                 | `0 15 * * * ?`   |
| Every day at 8:30 AM                      | `0 30 8 * * ?`   |
| Every Monday at 9:00 AM                   | `0 0 9 ? * MON`  |
| Every 10 seconds                          | `0/10 * * * * ?` |
| At 5:30 PM on the 1st of every month      | `0 30 17 1 * ?`  |
| every 5 minutes from 10:pm to 2 am        | `0 0/5 22-23,0-2 * * ?`|
| every hour from 29 and 59 minute          | `0 25,59 * * * ?` |
| every hour from 29 and 59 minute          | `0 20/30 * * * ?` |
| every hour 3 minute and each 5 minuts     | `0 3/5 * * * ?` |
| every hour 5 minute and each 5 minuts     | `0 5/5 * * * ?` |
| every day in 02:00, 02:20, 12:00, 12:20   | `0 0,20 2,12 * * ?` |

---
** `?` is used for either `DayOfMonth` or `DayOfWeek` when you don't want to specify both.
