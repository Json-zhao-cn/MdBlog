---
title: How to execute the stored procedure in the SQL Server
date: 2025/11/20
tags:
 - SQLServer
categories:
 - Skills
---


## How to execute the stored procedure in the SQL Server
### 1.With no parameters
#### 1. No output parameters:
```sql
--Create Procedure
CREATE PROCEDURE dbo.ProTest
AS 
    DECLARE @test int
    SET @test = 1
Go
```

```sql
--Execute SQL
EXEC dbo.ProTest

```

### 2.Has return result(Using select)
```sql
--Create Procedure
CREATE PROCEDURE dbo.ProTest
AS
    DECLARE @test INT;
    SET @test = 123;
    SELECT  @test;
GO
```
```sql
EXEC dbo.ProTest
```
### 3.Has return result（Using return）
```sql
--Create Procedure

CREATE PROCEDURE dbo.ProTest

AS
    DECLARE @test INT;
    SET @test = 123;
    RETURN @test;
GO
```

```sql
DECLARE @test INT;
EXEC @test = dbo.ProTest;
SELECT  @test
```
### 4. Querying multiple collections（Like select）
```sql
--Create Procedure
CREATE PROCEDURE dbo.ProTest
AS
    SELECT  *
    FROM    dbo.Material_SO_PipeOrder;
GO
```
```sql
EXEC dbo.ProTest
```

### Stored procedure with parameters
#### 1.No return result
```sql
--Create Procedure
CREATE PROCEDURE dbo.ProTest

    @OrderNO NVARCHAR(50) ,
    @OrderName NVARCHAR(50) ,
    @RMDSC NVARCHAR(500) = NULL 
AS
    IF ( @OrderNO IS NOT NULL )
        BEGIN
            INSERT  INTO dbo.Material_SO_PipeOrder
                    ( ID, OrderNO, OrderName, RMDSC )
            VALUES  ( NEWID(), -- ID - uniqueidentifier
                      @OrderNO, -- OrderNO - nvarchar(50)
                      @OrderName, -- OrderName - nvarchar(50)
                      @RMDSC  -- RMDSC - nvarchar(500)
                      );
        END;
GO
```

```sql
--Exec Procedure
EXEC dbo.ProTest @OrderNO = N'Order001', @OrderName = N'Name001', @RMDSC = N'tests'
Or "EXEC  dbo.ProTest  N'Order001', N'Name001', N'tests';"

```

#### 2.Has return result（Using select）
```sql
--Create Procedure
CREATE PROCEDURE dbo.ProTest

    @OrderNO NVARCHAR(50) ,
    @OrderName NVARCHAR(50) ,
    @RMDSC NVARCHAR(500)
AS
    IF ( @OrderNO IS NOT NULL )
        BEGIN
            INSERT  INTO dbo.Material_SO_PipeOrder
                    ( ID, OrderNO, OrderName, RMDSC )
            VALUES  ( NEWID(), @OrderNO, -- OrderNO - nvarchar(50)
                      @OrderName, -- OrderName - nvarchar(50)
                      @RMDSC  -- RMDSC - nvarchar(500)
                      );
            SELECT 1;
        END;
    ELSE
        SELECT -1;
GO
```
```sql
--Exec Procedure
EXEC  dbo.ProTest @OrderNO = N'Order001', @OrderName = N'Name001', @RMDSC = N'tests';

```
#### 3.Has return result（Using return）
```sql
--Create Procedure
CREATE PROCEDURE dbo.ProTest

    @OrderNO NVARCHAR(50) ,
    @OrderName NVARCHAR(50) ,
    @RMDSC NVARCHAR(500)
AS
    IF ( @OrderNO IS NOT NULL )
        BEGIN
            INSERT  INTO dbo.Material_SO_PipeOrder
                    ( ID, OrderNO, OrderName, RMDSC )
            VALUES  ( NEWID(), @OrderNO, -- OrderNO - nvarchar(50)
                      @OrderName, -- OrderName - nvarchar(50)
                      @RMDSC  -- RMDSC - nvarchar(500)
                      );
            RETURN 1;
        END;
    ELSE
        RETURN -1;
GO
```
```sql
--Exec Procedure
DECLARE @test INT;
EXEC @test = dbo.ProTest @OrderNO = N'Order001', @OrderName = N'Name001', @RMDSC = N'tests';

SELECT @test

```
#### 4.Output result with parameters（No return result）
```sql
--Create Procedure
CREATE PROCEDURE dbo.ProTest

    @OrderNO NVARCHAR(50) ,
    @OrderName NVARCHAR(50) ,
    @RMDSC NVARCHAR(500) ,
    @ID UNIQUEIDENTIFIER OUTPUT --Output parameter
AS
    IF ( @OrderNO IS NOT NULL )
        BEGIN
            DECLARE @newID UNIQUEIDENTIFIER;
            SET @newID = NEWID();
            INSERT  INTO dbo.Material_SO_PipeOrder
                    ( ID ,
                      OrderNO ,
                      OrderName ,
                      RMDSC
                    )
            VALUES  ( @newID ,
                      @OrderNO , -- OrderNO - nvarchar(50)
                      @OrderName , -- OrderName - nvarchar(50)
                      @RMDSC  -- RMDSC - nvarchar(500)
                    );
            SET @ID = @newID;
        END;
    ELSE
        SET @ID = NULL;
GO
```

```sql
--Exec Procedure
DECLARE @IDTest UNIQUEIDENTIFIER;
EXEC dbo.ProTest @OrderNO = N'Order001', -- nvarchar(50)
    @OrderName = N'Name001', -- nvarchar(50)
    @RMDSC = N'tests', -- nvarchar(500)
    @ID = @IDTest OUTPUT; --No OUTPUT，IDTest=null
SELECT  @IDTest;

```
### 3.summarize
The return result of exec stored procedure：
1. If has result, then, return result；
2. If no result, then, the result is 0(int type)(Even if there are select collections or Insert affected rows in the stored procedure, etc)；
3. If there are output parameters, the return value of the stored procedure is the same as (1) and (2). The parameters of the OUTPUT need to be selected;