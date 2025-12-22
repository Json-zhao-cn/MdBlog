---
title: 14.MergeContent
date: 2025/12/15
tags:
 - ApacheNIFI
categories:
 - ETL
---

## **14.MergeContent**
---

### 1.**What is the `MergeContent`?**
1. Tt merges a Group of FlowFiles together based on a user-defined strategy and packages them into a single FlowFile. 
2. I used it as so branches to a single flowfile.
3. If you really want to merge different flowfiles, I would definitely recommand you use `Groovy` to realize it.

---
### 2. **Properties**
1. **Minimum Number of Entries**：How many branches you have;
2. **Maximum Number of Entries**: Larger than **Minimum Number of Entries's** value
3. **Maximum number of Bins**： Default 1000

---
### 3. **Usage**
1. After each branch, you will replace those flowcontent as `$1`, and then, merge those flowfile as signle flowfile.

- ![UseCase](/docs/ApacheNIFI/MergeContent/MergeContent.png)