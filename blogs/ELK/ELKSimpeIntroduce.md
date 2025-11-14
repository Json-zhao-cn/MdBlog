---
title: ELK Introduce
date: 2025/10/05
tags:
 - ELK
categories:
 - ELK
---

## **ELK Introduce**
### 1. What is the ELK?
1. ELK, which is elastic's complete log collection and presentation solution, an acronym for ElasticSearch, Logstash, and Kibana

### 2. ELK Component
1. ElasticSearch: alias ES，which is a real-time distributed search and analytics engine that can be used for full-text search, structured search, and analytics. It is a search engine based on Apache Lucene, a full-text search engine, written in the Java language.
2. Logstash,which is a data collection engine with real-time transmission capabilities, used to collect data (such as reading text files), parse, and send data to ES.
3. Kibana: Elasticsearch provides a Web platform for analysis and visualization. It can find and interact with data in Elasticsearch indexes, and generate various dimensional tables and graph.

### 3. Why we need to use the ELK?
1. Quickly problem locating problem
2. Monitoring and alarming
3. Data analysis
   

### 3. How many ways for ELK collect logs data?
There are several ways for the **ELK (Elasticsearch, Logstash, Kibana)** stack to collect log data, depending on the source, format, and desired pipeline design. Here's a breakdown of the most common methods:
Tools and Methods:
| Method                         | Tool(s)                           | Suitable For                          |
|--------------------------------|-----------------------------------|---------------------------------------|
| File-Based                     | Filebeat, Logstash                | Application/system logs               |
| Network-Based                  | Logstash, Packetbeat              | Syslog, network traffic               |
| API-Based                      | Logstash                          | External APIs                         |
| Direct Application Integration | Serilog, Log4j, Elasticsearch SDK | Application logs                      |
| Database Logs                  | Logstash JDBC Plugin              | Database-stored logs                  |
| Cloud and Container Logs       | Filebeat, Kubernetes Autodiscover | Cloud platforms, containers           |
| Streaming Data                 | Logstash (Kafka, Redis plugins)   | High-throughput real-time streaming   |



### Reference
1. [ELK Simple Introduce CN](https://blog.csdn.net/Netceor/article/details/114653892)