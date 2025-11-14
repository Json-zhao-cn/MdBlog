---
title: Compare different database same table data count
date: 2025/10/05
tags:
 - Python
categories:
 - Skills
---

## **Compare different database same table data count**
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

def get_table_count(cursor, table_name):
    """Get Table row count."""
    cursor.execute(f"SELECT count(1) FROM {table_name}")
    return cursor.fetchone()[0]

def compare_tables():
    # Connect
    src_conn = pyodbc.connect(src_conn_str)
    tgt_conn = pyodbc.connect(tgt_conn_str)

    # Cursor
    src_cursor = src_conn.cursor()
    tgt_cursor = tgt_conn.cursor()

    # List of tables to compare
    tables = ["TableA", "TableB"]

    print("📊 Table data compare report")
    print("=" * 70)
    
    results = []
    total_differences = 0
    
    for table in tables:
        try:
            src_count = get_table_count(src_cursor, table)
            tgt_count = get_table_count(tgt_cursor, table)
            
            difference = src_count - tgt_count
            difference_percent = (difference / src_count * 100) if src_count > 0 else 0
            is_match = difference == 0
            
            results.append({
                'table': table,
                'src_count': src_count,
                'tgt_count': tgt_count,
                'difference': difference,
                'difference_percent': difference_percent,
                'is_match': is_match
            })
            
            if not is_match:
                total_differences += 1
                
        except Exception as e:
            print(f"❌ query table:=> {table} error: {str(e)}")
            results.append({
                'table': table,
                'error': str(e)
            })

    # print results
    for result in results:
        if 'error' in result:
            print(f"Table: {result['table']} - ❌ error: {result['error']}")
        else:
            status_icon = "✅" if result['is_match'] else "❌"
            print(f"{status_icon} {result['table']}")
            print(f"    Source DB: {result['src_count']:,} count")
            print(f"    Target DB: {result['tgt_count']:,} count")
            if not result['is_match']:
                print(f"    🔸 difference: {result['difference']:+,} count ({result['difference_percent']:+.2f}%)")
            print("    " + "-" * 30)

    print("=" * 70)
    print(f"📈 summarizing:")
    print(f"   Total Table: {len(tables)}")
    print(f"   Same Tabe Count: {len(tables) - total_differences}")
    print(f"   Difference Table Count: {total_differences}")
    
    # disconnect
    src_cursor.close()
    tgt_cursor.close()
    src_conn.close()
    tgt_conn.close()
    
    return results

# execute
if __name__ == "__main__":
    compare_tables()
```