---
title: Understand factory Product
date: 2026/03/18
tags:
 - Digitalization
categories:
 - Project
---

## **Why MES Consultants Must Deeply Understand the Company’s Product**
## Preface

In the previous article, we used first-principles and cost-essence perspectives to explain why MES consultants must deeply understand the factory. This article continues the “outside-in” logic (macro to micro) by focusing on **product**—the most microscopic yet most decisive element—and systematically explains why MES consultants must thoroughly understand the company’s product.

Product is not merely one module inside the MES system; it is the **DNA** of the entire system. All mainstream MES platforms (Dassault Apriso, Siemens Camstar, or China-developed MES platforms) are fundamentally built around the product for modeling, production management, quality control, and full-lifecycle traceability. If an MES consultant discusses MES without grounding it in the product, the system will inevitably become disconnected from the factory’s physical reality, causing the MES project to fail.

### 1. Product Defines the Core Foundational Structure of MES
Every MES module—master data, object models, transaction processes, and data flows—must strictly correspond to the product’s actual structure and lifecycle. It cannot be built by simply applying an MES consultant’s experiential **standard templates**.

SAP materials, BOM, and Routing; WMS location strategies; SCADA/PLC collection points—all ultimately converge in MES to form a single, unified data loop. The starting point and ending point of that loop is always the **product** itself.

A truly competent MES consultant never force-fits templates. Instead, they rebuild the data model directly from the product’s BOM, process routes, quality characteristics, and lifecycle stages. Only then can master-data mapping and unit conversions (Unit → Lot → Batch → SerialNo → Container) genuinely connect the full chain: SAP ↔ MES ↔ WMS ↔ SCADA ↔ PLC ↔ Upper Computer.

### 2. Product Defines BOM
The core of any product is its BOM. Without a BOM, there is no product structure and therefore none of the factory’s core processes: material consumption, replenishment, procurement, inventory management, work-order release, or line-side warehouse management.

MES uses the BOM to define work-order flows, material pull, kitting validation, consumption recording, and all related logic. If the BOM is incorrect, every subsequent data flow becomes distorted.

Consultants who do not understand the product usually just copy the SAP BOM. They fail to recognize the critical differences between the engineering BOM, process BOM, and manufacturing BOM used on the shop floor, ultimately causing severe disconnection between MES and actual production.

### 3. Product Defines the Process
Processes exist for the product. In SAP, Routing is a planning-level “what should happen”; in MES, Workflow, process steps, and parameter collection represent the physical-level “what actually happens.”

MES takt-time control, operation sequencing, parameter closed-loop, equipment signaling, and step execution all derive directly from the product’s process requirements. Only consultants who deeply understand the product’s process can make the MES workflow truly match the factory’s real manufacturing flow.

### 4. Product Defines Quality and Inspection
Quality standards, inspection items, critical-to-quality (CTQ) characteristics, rework/scrap flows—all quality-related processes are defined by the product. Requirements vary enormously by product type, country, and customer.

Whether the MES quality module actually delivers value depends entirely on whether the consultant truly understands the product’s quality pain points: Which parameters must be collected in real time? Which records are critical? How should rework paths be tightly bound to the process?

Consultants who lack product knowledge can only deploy generic quality templates. The result is a system filled with indicators that are irrelevant to the actual factory—wasting time and effort while delivering outcomes far below expectations.

### 5. Product Defines Traceability
MES is essentially a black box that captures production data and turns it into traceable chains for factory management. The traceability level (batch/serial/container), data granularity (process parameters, equipment parameters, test results, lifecycle events), and boundary scope are all dictated by the characteristics of the product.

Traceability requirements differ dramatically across industries—3C electronics, medical devices, furniture, automotive, shipbuilding—but at their root they are always determined by the product.

### 6. Product Defines Packaging
Packaging is the final stage of the product lifecycle and is the module most often overlooked. Label content, weight verification, customer/region-specific rules, traceability code assignment—everything is defined by the product.

MES label printing, poka-yoke checks, and outbound scanning functions exist to serve the product’s packaging requirements. An MES consultant who does not understand the product cannot possibly deliver a competent packaging module.

### 7. Product Defines MES Flexibility
Products are not static. They evolve with market demand, technological iteration, and customer feedback.

MES must therefore possess sufficient flexibility, extensibility, and high availability to keep pace with product changes. High-caliber MES consultants build parametric interfaces, low-code configuration capabilities, and data-archive extensions from day one, ensuring the system will not become obsolete the moment the product is upgraded.

### Summary
The product is both the output of the factory and the soul of the MES system.

If an MES consultant cannot deeply understand the company’s product—its structure, BOM, process flow, quality requirements, traceability rules, packaging logic, and future market direction—the MES system they deliver will inevitably fail to meet the factory’s needs.

True professionals do not spend their days staring at system function points or fixing minor bugs. They spend their days studying product knowledge and tracking industry trends. They have internalized one fundamental truth: **Only by deeply understanding the product can you build a genuine digital factory.**