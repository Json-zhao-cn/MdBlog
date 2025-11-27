---
title: C# Common datetime extension method

date: 2025/11/27
tags:
 - NET
categories:
 - Skills
---

## **C# Common datetime extension method**
When we are building a .NET backend platform. We can add some common extension method in our platform code.
Here is a datatime extension code. 
---
```c#
namespace Extenison
{
    public static class DateTimeExtension
    {        
        /// <summary>
        /// Convert datetime to specific TimeZone UTC Time
        /// </summary>
        /// <param name="datetime"></param>
        /// <param name="timeZoneId"></param>
        /// <returns></returns>
        public static DateTime ConvertDateTimeToTimeZoneUtc(DateTime datetime,string timeZoneId)
        {
            return TimeZoneInfo.ConvertTimeFromUtc(datetime.ToUniversalTime(), TimeZoneInfo.FindSystemTimeZoneById(timeZoneId));
        }

        /// <summary>
        /// Convert datetime to Local time
        /// </summary>
        /// <param name="datetime"></param>
        /// <returns></returns>
        public static DateTime ConvertDateTimeToLocal(DateTime datetime)
        {
            return TimeZoneInfo.ConvertTime(datetime, TimeZoneInfo.Local);
        }

        /// <summary>
        /// Convert datetime to UTC time
        /// </summary>
        /// <param name="datetime"></param>
        /// <returns></returns>
        public static DateTime ConvertDateTimeToUTC(DateTime datetime)
        {
            return TimeZoneInfo.ConvertTime(datetime, TimeZoneInfo.Utc);
        }

         /// <summary>
        /// Convert DateTimeOffset to specific TimeZone UTC Time
        /// </summary>
        /// <param name="datetime"></param>
        /// <param name="timeZoneId"></param>
        /// <returns></returns>
        public static DateTime ConvertDateTimeOffsetToTimeZoneUtc(DateTimeOffset datetime,string timeZoneId)
        {
            return TimeZoneInfo.ConvertTimeFromUtc(datetime.UtcDateTime, TimeZoneInfo.FindSystemTimeZoneById(timeZoneId));
        }

        /// <summary>
        /// Convert DateTimeOffset to UTC time
        /// </summary>
        /// <param name="datetime"></param>
        /// <returns></returns>
        public static DateTime ConvertDateTimeOffsetToUTC(DateTimeOffset datetime)
        {
            return datetime.UtcDateTime;
        }

        /// <summary>
        /// Convert DateTimeOffset to LocalDateTime
        /// </summary>
        /// <param name="datetime"></param>
        /// <returns></returns>
        public static DateTime ConvertDateTimeOffsetToLocal(DateTimeOffset datetime)
        {
            return datetime.LocalDateTime;
        }
    }
}

```