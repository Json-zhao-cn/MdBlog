---
title: Deep Introduction to Logstash in the ELK
date: 2025/10/08
tags:
 - ELK
categories:
 - ELK
---

### **Deep Introduction to Logstash in the ELK**

**Logstash** is a powerful data processing pipeline tool in the **ELK Stack (Elasticsearch, Logstash, Kibana)**. It ingests data from a variety of sources, processes it with customizable filters, and forwards it to multiple destinations, including Elasticsearch, for analysis and visualization.

---

### **Key Features of Logstash**
1. **Flexible Data Ingestion**:
   - Supports over 200 input plugins for collecting data from diverse sources like log files, databases, cloud platforms, APIs, and message queues.

2. **Data Transformation**:
   - Process and enrich data with filters such as grok, mutate, or translate to make it analysis-ready.

3. **Extensive Plugin Ecosystem**:
   - Inputs, filters, codecs, and outputs offer modularity for building custom pipelines.

4. **Real-Time Processing**:
   - Handles data in real time with scalability and resilience.

5. **Centralized Configuration**:
   - Manage configurations for multiple data sources and destinations from one place.

6. **Multiformat Support**:
   - Handles logs, metrics, events, and unstructured data in formats like JSON, XML, and CSV.

---

### **How Logstash Fits in the ELK Pipeline**
- **Input**: Collects data from sources like file systems, message queues, or network streams.
- **Filter**: Enriches, parses, and processes the data.
- **Output**: Sends data to Elasticsearch, a file, or another endpoint like Kafka.

---

### **Key Components of Logstash**

1. **Inputs**:
   - Define where Logstash gets the data from.
   - Examples: File, TCP, HTTP, Kafka, JDBC.

2. **Filters**:
   - Transform data into a structured and meaningful format.
   - Examples: `grok` for parsing, `mutate` for modifications, `date` for timestamp processing.

3. **Outputs**:
   - Define where Logstash sends the processed data.
   - Examples: Elasticsearch, file, stdout, Redis, Kafka.

4. **Codecs**:
   - Handle encoding/decoding data during input and output stages.
   - Examples: JSON, plain text, multiline.

---

### **Logstash Configuration Overview**

Logstash configurations are written in `.conf` files and structured into three main blocks:
1. **Input**: Defines the data source.
2. **Filter**: Processes and enriches the data.
3. **Output**: Specifies the data destination.

#### Example:
```conf
input {
  file {
    path => "/var/log/myapp/*.log"
    start_position => "beginning"
  }
}

filter {
  grok {
    match => { "message" => "%{TIMESTAMP_ISO8601:timestamp} %{LOGLEVEL:level} %{GREEDYDATA:message}" }
  }
  date {
    match => [ "timestamp", "ISO8601" ]
  }
}

output {
  elasticsearch {
    hosts => ["localhost:9200"]
    index => "myapp-logs-%{+YYYY.MM.dd}"
  }
}
```

---

### **Common Input Plugins**
1. **File**:
   - Reads data from log files.
   ```conf
   input {
     file {
       path => "/var/log/*.log"
     }
   }
   ```

2. **TCP/UDP**:
   - Collects logs over network protocols.
   ```conf
   input {
     tcp {
       port => 5000
     }
   }
   ```

3. **HTTP**:
   - Exposes an HTTP endpoint to receive logs.
   ```conf
   input {
     http {
       port => 8080
     }
   }
   ```

4. **JDBC**:
   - Reads data from relational databases.
   ```conf
   input {
     jdbc {
       jdbc_connection_string => "jdbc:mysql://localhost:3306/logs"
       jdbc_user => "user"
       jdbc_password => "password"
       statement => "SELECT * FROM logs_table"
     }
   }
   ```

5. **Kafka**:
   - Collects logs from Kafka topics.
   ```conf
   input {
     kafka {
       bootstrap_servers => "localhost:9092"
       topics => ["logs"]
     }
   }
   ```

---

### **Common Filter Plugins**
1. **Grok**:
   - Parses unstructured text into structured data using patterns.
   ```conf
   filter {
     grok {
       match => { "message" => "%{IP:client_ip} - - \[%{HTTPDATE:timestamp}\] \"%{WORD:method} %{URIPATHPARAM:request} HTTP/%{NUMBER:http_version}\" %{NUMBER:response_code}" }
     }
   }
   ```

2. **Mutate**:
   - Modify fields (e.g., rename, remove, or add fields).
   ```conf
   filter {
     mutate {
       rename => { "host" => "hostname" }
       remove_field => ["path"]
     }
   }
   ```

3. **Date**:
   - Converts timestamps into standard formats.
   ```conf
   filter {
     date {
       match => [ "timestamp", "ISO8601" ]
     }
   }
   ```

4. **GeoIP**:
   - Enriches data with geographical information based on IP addresses.
   ```conf
   filter {
     geoip {
       source => "client_ip"
     }
   }
   ```

5. **Translate**:
   - Maps field values using a dictionary.
   ```conf
   filter {
     translate {
       field => "response_code"
       dictionary => { "200" => "OK" "404" => "Not Found" }
     }
   }
   ```

---

### **Common Output Plugins**
1. **Elasticsearch**:
   - Sends processed data to Elasticsearch.
   ```conf
   output {
     elasticsearch {
       hosts => ["localhost:9200"]
       index => "logs-%{+YYYY.MM.dd}"
     }
   }
   ```

2. **File**:
   - Writes processed data to a file.
   ```conf
   output {
     file {
       path => "/var/log/processed-logs.log"
     }
   }
   ```

3. **Kafka**:
   - Sends logs to Kafka topics.
   ```conf
   output {
     kafka {
       bootstrap_servers => "localhost:9092"
       topic_id => "processed-logs"
     }
   }
   ```

4. **Stdout**:
   - Outputs logs to the console for debugging.
   ```conf
   output {
     stdout {
       codec => rubydebug
     }
   }
   ```

---

### **Advanced Features of Logstash**

#### 1. **Pipeline-to-Pipeline Communication**:
   - Route data between multiple pipelines for modular processing.
   ```conf
   input {
      pipeline { address => "input_pipeline" }
   }

   output {
      pipeline { send_to => "output_pipeline" }
   }
   ```

#### 2. **Persistent Queues**:
   - Ensures data is buffered locally in case of output destination failure.
   ```conf
   queue.type: persisted
   ```

#### 3. **Monitoring and Metrics**:
   - Monitor pipeline performance and errors via the Elastic Stack’s monitoring UI.

#### 4. **Dynamic Data Routing**:
   - Route data to different outputs based on conditions.
   ```conf
   output {
     if [response_code] == "200" {
       elasticsearch { index => "success-logs" }
     } else {
       elasticsearch { index => "error-logs" }
     }
   }
   ```

---

### **Logstash Strengths in ELK**
1. **Complex Processing**:
   - Logstash excels at handling complex data transformation needs, which Beats or Elasticsearch Ingest Pipelines might struggle with.
   
2. **Versatile Integration**:
   - With its vast plugin ecosystem, Logstash can connect to almost any data source or destination.

3. **Scalability**:
   - Logstash can scale horizontally by running multiple instances.

---

### **Monitoring and Debugging Logstash**
1. **Enable Logging**:
   - Logs are stored by default in `/var/log/logstash/`.

2. **Run in Debug Mode**:
   ```bash
   logstash -f /path/to/config.conf --log.level debug
   ```

3. **Enable Monitoring**:
   - Enable the Monitoring feature in Kibana to track pipeline performance.

---

### **Common Use Cases**
1. **Centralized Log Processing**:
   - Aggregate and enrich logs from multiple servers.
2. **Real-Time Data Transformation**:
   - Parse unstructured logs into structured fields.
3. **Data Routing**:
   - Send logs to different destinations based on their content.