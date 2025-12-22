---
title: 15.ReplaceText
date: 2025/12/16
tags:
 - ApacheNIFI
categories:
 - ETL
---

## ***15.ReplaceText***
---
### 1.***What is the `ReplaceText`?***
1. It modify the flowfilw content.
2. It can be used replace the alternative content of your flow file.
3. It can also be used to append or prepend text to the contents of a FlowFile.

---
### 2. ***Properties***
1. ***Replacement Strategy***：The strategy for how and what to replace within the FlowFile's text content.
   - ***Support Strategies***
   - Prepend 
   - Append 
   - Surround 
   - Regex Replace 
   - Literal Replace 
   - Always Replace 
   - Substitute Variables
2. ***Search Value***：The Search Value to search for in the FlowFile content. Only used for 'Literal Replace' and 'Regex Replace' matching strategies
   - Default value:(?s)(^.*$)
3. ***Replacement Value***:The value to insert using the 'Replacement Strategy'.
   - Default value:$1
4. ***Character Set***：The Character Set in which the file is encoded
   - Default value:UTF-8
5. ***Evaluation Mode***：Run the 'Replacement Strategy' against each line separately (Line-by-Line) or buffer the entire file into memory (Entire Text) and run against that.
   - Line-by-Line(Default value)
   - Entire text
  
---
### 3. ***Use case***
1. You can use `ReplaceText` to write your customize `SQL`;
2. You can use it to replace text what your business want.