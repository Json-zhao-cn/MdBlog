---
title: Input the source db table data to target db
date: 2025/10/05
tags:
 - Python
categories:
 - Skills
---

## **Input the source db table data to target db**

Target DB table data is null

```python
import pyodbc

# Connection strings (adjust your server, user, password, db)
src_conn_str = (
    "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER=ip;DATABASE=db;UID=user;PWD=ps"
)
tgt_conn_str = (
    "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER=ip;DATABASE=db;UID=user;PWD=ps"
)

# Connect
src_conn = pyodbc.connect(src_conn_str)
tgt_conn = pyodbc.connect(tgt_conn_str)
tgt_conn.autocommit = False  # manage commits manually

# Cursor
src_cursor = src_conn.cursor()
tgt_cursor = tgt_conn.cursor()

# List of tables to copy
tables = ["TestA"]

batch_size = 10000
for table in tables:
    # Read data in chunks
    print(f"🚀 Copying {table} ...")
    src_cursor.execute(f"SELECT * FROM {table}")

    columns = [f"[{column[0]}]" for column in src_cursor.description]  # add []
    placeholders = ",".join(["?"] * len(columns))
    insert_sql = f"INSERT INTO {table} ({','.join(columns)}) VALUES ({placeholders})"
    print(f"✅{insert_sql}")

    # Enable fast executemany
    tgt_cursor.fast_executemany = True

    while True:
        rows = src_cursor.fetchmany(batch_size)
        if not rows:
            break
        tgt_cursor.executemany(insert_sql, rows)
        tgt_conn.commit()
        print(f"Inserted {len(rows)} rows...")
    print(f"✅ Finished {table}")
print("✅ Done inserting all rows!")

# Cleanup
src_cursor.close()
tgt_cursor.close()
src_conn.close()
tgt_conn.close()
```