---
title: Using groovy to parse complex Json
date: 2025/11/25
tags:
 - ApacheNIFI
categories:
 - ETL
---

## **Using groovy to parse complex Json**
### 1. **Scenario** 
In the Apache NIFI context, we get complex Json after `InvokeHTTP` process. We can not use the original Json, we need to `parse`, `transform` this Json to the customer business Json.
We can use groovy script to realize it.
### 2. **Requirement** 
- The Json data
```json
{
    "WipOrder": [
        {
            "WipOrderdata": {
                "WipOrderid": "11162",
                "WorkOrder": "Order568",
                "Shipping": null
            },
            "WipOrderNos": [
                {
                    "nos": "E1",
                    "nosclass": "E1",
                    "nosdescription": "PCB",
                    "serialno": "8650979V01"
                }
            ],
            "WipOrderdates": [
                {
                    "WipOrderdatetype": "ABC",
                    "WipOrderdate": "20251219 00:00:00"
                },
                {
                    "WipOrderdatetype": "EFC",
                    "WipOrderdate": "20251212 00:00:00"
                }     
            ],
            "weights": [
                {
                    "tareweight": "9279001",
                    "loadweight": "36721.90"
                }
            ],
            "Orderinfo": [
                {
                    "Ordermarkingpart": [
                        {
                            "component": "Order_component_marking_001",
                            "name": "Order_marking_axle_gear",
                            "value": "R756"
                        },
                        {
                            "component": "Order_component_marking_and_retarder",
                            "name": "Order_marking_pos_4",
                            "value": "C"
                        }
                    ],
                    "Ordercertificatepart": null,
                    "Ordercertificateref": null
                }
            ],
            "ExternalCustomer": [
                {
                    "Customerparts": null
                }
            ],
            "orderSpec": [
                {
                    "varclass": "FPC",
                    "varfam": "1",
                    "varopt": "A"
                },
                {
                    "varclass": "FPC",
                    "varfam": "9968",
                    "varopt": "A"
                }
            ],
            "OrderDetail": [
                {
                    "OrderId": "1208922",
                    "PA": "T1P11",
                    "cuobj": "10088",
                    "pfipo": "1208837",
                    "synctime": "20251201 00:00:00",
                    "plstart": "20251117 17:07:39",
                    "ppatoo": "PA",
                    "ppaobj": "T1P11",
                    "plstatus": "E",
                    "invest": null,
                    "assstatus": "F",
                    "mtrlstatus": "S",
                    "delistatus": "D",
                    "remtxt": null,
                    "frozen": "N",
                    "ipocpaobj": "T1",
                    "cuseq": "1",
                    "ciid_id": "683268",
                    "contracts": [
                        {
                            "wpl": "001",
                            "contract": "50893",
                            "typetexts": [

                            ],
                            "barcodes": [

                            ]
                        }
                    ]
                },
                {
                    "OrderId": "1208981",
                    "PA": "T1P07A",
                    "cuobj": "10107",
                    "pfipo": "1208901",
                    "synctime": "20251201 00:00:00",
                    "plstart": "20251117 17:11:19",
                    "ppatoo": "PA",
                    "ppaobj": "T1P07A",
                    "plstatus": "E",
                    "invest": null,
                    "assstatus": "F",
                    "mtrlstatus": "S",
                    "delistatus": "D",
                    "remtxt": null,
                    "frozen": "N",
                    "ipocpaobj": "T1P07",
                    "cuseq": "1",
                    "ciid_id": "696375",
                    "contracts": [
                        {
                            "wpl": "0078",
                            "contract": "50388",
                            "typetexts": [
                                {
                                    "typedes": "17",
                                    "desname": "Espec. Order568",
                                    "typetext": "R136 A 6X2   NA____3350 CBU"
                                }
                            ],
                            "barcodes": [

                            ]
                        }
                    ]
                }
            ]
            
        }
    ]
}
```
- `Requirement`
- 1. Only keep `WipOrder` Json. 
- 2. Each `WipOrder` Child Json should have `Product_Id` and `Popid` fields, which come from the context.
- 3. Using  `Ordermarkingpart` to replace`Orderinfo` 
- 4. `ExternalCustomer` should be removed
- 5. `orderSpec` should add `Name` filed, the value = `orderSpec.`
- 6. `OrderDetail.contracts` should be null
### 3. **Solution** 
According to the requirement, the following is groovy script
```groovy
import groovy.json.JsonSlurper
import groovy.json.JsonOutput
import org.apache.nifi.processor.io.InputStreamCallback
import org.apache.nifi.processor.io.OutputStreamCallback
import java.nio.charset.StandardCharsets

def flowFile = session.get()
if (!flowFile) return

try {

    def jsonText = ""
    session.read(flowFile, { inputStream ->
        jsonText = inputStream.getText(StandardCharsets.UTF_8.name())
    } as InputStreamCallback)

    def Product_Id = flowFile.getAttribute("Product_Id")
    def Popid = flowFile.getAttribute("Popid")

    flowFile = session.putAttribute(flowFile, "NoWipOrderData", "false")

    if (!jsonText?.trim()) {
        flowFile = session.putAttribute(flowFile, "NoWipOrderData", "true")
        session.transfer(flowFile, REL_SUCCESS)
        return
    }

    def parsed = new JsonSlurper().parseText(jsonText)

    def epoList = parsed.WipOrder
    if (!(epoList instanceof List) || epoList.isEmpty()) {
        flowFile = session.putAttribute(flowFile, "NoWipOrderData", "true")
        session.transfer(flowFile, REL_SUCCESS)
        return
    }

    def epo0 = epoList[0]

    //-------------------------------------------------------
    // SAFER DEEP COPY HELPER (Groovy clone() is unreliable)
    //-------------------------------------------------------
    def copyMap = { m -> m instanceof Map ? ([:] + m) : m }

    //-------------------------------------------------------
    // BUILD NEW JSON STRUCTURE
    //-------------------------------------------------------
    def result = [:]

    // WipOrderdata
    result.WipOrderdata = copyMap(epo0.WipOrderdata ?: [:])
    result.WipOrderdata.Product_Id = Product_Id

    // WipOrderNos
    result.WipOrderNos = (epo0.WipOrderNos ?: []).collect { item ->
        def newItem = copyMap(item)
        newItem.Product_Id = Product_Id
        newItem.Popid = Popid
        return newItem
    }

    // WipOrderdates
    result.WipOrderdates = (epo0.WipOrderdates ?: []).collect { item ->
        def newItem = copyMap(item)
        newItem.Product_Id = Product_Id
        newItem.Popid = Popid
        newItem.SequenceId = ((newItem.Product_Individual ?: '') + (newItem.epodatetype ?: ''))
        return newItem
    }

    // Orderinfo ? Ordermarkingpart only
    if (epo0.Orderinfo instanceof List &&
        epo0.Orderinfo &&
        epo0.Orderinfo[0]?.Ordermarkingpart) {

        result.Orderinfo = epo0.Orderinfo[0].Ordermarkingpart.collect { item ->
            def newItem = copyMap(item)
            newItem.Product_Id = Product_Id
            newItem.Popid = Popid
            newItem.SequenceId = ((newItem.Product_Id ?: '') + (newItem.name ?: ''))
            return newItem
        }
    } else {
        result.Orderinfo = []
    }

    // weights ? first element only
    if (epo0.weights instanceof List && epo0.weights) {
        result.weights = copyMap(epo0.weights[0])
        result.weights.Product_Id = Product_Id
        result.weights.Popid = Popid
    } else {
        result.weights = [:]
    }

    // orderSpec
    result.orderSpec = (epo0.orderSpec ?: []).collect { item ->
        def newItem = copyMap(item)
        newItem.Product_Id = Product_Id
        newItem.Popid = Popid
        newItem.Name = ((newItem.Product_Id ?: '') +(newItem.varfam ?: '') + (newItem.varopt ?: ''))
        return newItem
    }

    // OrderDetail
    result.OrderDetail = (epo0.OrderDetail ?: []).collect { item ->
        def newItem = copyMap(item)
        newItem.contracts = null
        newItem.Product_Id = Product_Id
        newItem.Popid = Popid
        return newItem
    }

    //-------------------------------------------------------
    // WRITE OUTPUT JSON
    //-------------------------------------------------------
    def outputJson = JsonOutput.prettyPrint(JsonOutput.toJson(result))

    flowFile = session.write(flowFile, { outputStream ->
        outputStream.write(outputJson.getBytes(StandardCharsets.UTF_8))
    } as OutputStreamCallback)

    flowFile = session.putAttribute(flowFile, "NoWipOrderData", "false")
    session.transfer(flowFile, REL_SUCCESS)

} catch (Exception e) {
    log.error("Error processing WipOrderData JSON: ${e.message}", e)
    flowFile = session.putAttribute(flowFile, "NoWipOrderData", "true")
    session.transfer(flowFile, REL_FAILURE)
}

```


### 4. **Result** 
The Json 
```Json
{
    "DataName": "PCBcnprod",
    "Product_Id": "11117470",
    "WipOrder": [
        {
            "WipOrderdata": {
                "WipOrderid": "11162",
                "WorkOrder": "Order568",
                "Product_Id": "11117470",
                "Popid":"Order001",
                "Shipping": null
            },
            "WipOrderNos": [
                {
                    "nos": "E1",
                    "nosclass": "E1",
                    "nosdescription": "PCB",
                    "serialno": "8650979V01",
                    "Product_Id": "11117470",
                    "Popid":"Order001",
                }
            ],
            "WipOrderdates": [
                {
                    "WipOrderdatetype": "ABC",
                    "WipOrderdate": "20251219 00:00:00",
                    "Product_Id": "11117470",
                    "Popid":"Order001",
                    "SequenceId":"11117470ABC",
                },
                {
                    "WipOrderdatetype": "EFC",
                    "WipOrderdate": "20251212 00:00:00",
                    "Product_Id": "11117470",
                    "Popid":"Order001",
                    "SequenceId":"11117470EFC",
                }     
            ],
            "weights": [
                {
                    "tareweight": "9279001",
                    "loadweight": "36721.90",
                    "Product_Id": "11117470",
                    "Popid":"Order001",
                }
            ],
            "Orderinfo": [          
                {
                    "component": "Order_component_marking_001",
                    "name": "Order_marking_axle_gear",
                    "value": "R756",
                    "Product_Id": "11117470",
                    "Popid":"Order001",
                },
                {
                    "component": "Order_component_marking_and_retarder",
                    "name": "Order_marking_pos_4",
                    "value": "C",
                    "Product_Id": "11117470",
                    "Popid":"Order001",
                }
            ],
            "orderSpec": [
                {
                    "varclass": "FPC",
                    "varfam": "1",
                    "varopt": "A",
                    "Product_Id": "11117470",
                    "Popid":"Order001",
                    "Name":"111174701A"
                },
                {
                    "varclass": "FPC",
                    "varfam": "9968",
                    "varopt": "A",
                    "Product_Id": "11117470",
                    "Popid":"Order001",
                    "Name":"111174709968A"
                }
            ],
            "OrderDetail": [
                {
                    "OrderId": "1208922",
                    "PA": "T1P11",
                    "cuobj": "10088",
                    "pfipo": "1208837",
                    "synctime": "20251201 00:00:00",
                    "plstart": "20251117 17:07:39",
                    "ppatoo": "PA",
                    "ppaobj": "T1P11",
                    "plstatus": "E",
                    "invest": null,
                    "assstatus": "F",
                    "mtrlstatus": "S",
                    "delistatus": "D",
                    "remtxt": null,
                    "frozen": "N",
                    "ipocpaobj": "T1",
                    "cuseq": "1",
                    "ciid_id": "683268",
                    "contracts": null,
                    "Product_Id": "11117470",
                    "Popid":"Order001",
                },
                {
                    "OrderId": "1208981",
                    "PA": "T1P07A",
                    "cuobj": "10107",
                    "pfipo": "1208901",
                    "synctime": "20251201 00:00:00",
                    "plstart": "20251117 17:11:19",
                    "ppatoo": "PA",
                    "ppaobj": "T1P07A",
                    "plstatus": "E",
                    "invest": null,
                    "assstatus": "F",
                    "mtrlstatus": "S",
                    "delistatus": "D",
                    "remtxt": null,
                    "frozen": "N",
                    "ipocpaobj": "T1P07",
                    "cuseq": "1",
                    "ciid_id": "696375",
                    "contracts": null ,
                    "Product_Id": "11117470",
                    "Popid":"Order001",                
                }
            ]
            
        }
    ]
}

```

### 5. **Summarize**
```groovy
//-------------------------------------------------------
//  Safer Deep Copy Helper (Groovy clone() is unreliable)
//-------------------------------------------------------
def copyMap = { m -> m instanceof Map ? ([:] + m) : m }

//-------------------------------------------------------
// Build New JSON Structure
//-------------------------------------------------------
def result = [:]

```