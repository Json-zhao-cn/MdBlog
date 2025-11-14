---
title: Deep Introduction to Filebeat in the ELK
date: 2025/10/06
tags:
 - ELK
categories:
 - ELK
---

### **Deep Introduction to Filebeat in the ELK**

**Filebeat** is a lightweight, open-source log shipper from the **Elastic Stack (ELK)** designed to forward and centralize log data. It is optimized for efficiently reading log files and sending data to Elasticsearch, Logstash, or any supported output. Filebeat minimizes resource usage and integrates seamlessly with other Elastic components.

### **Key Features of Filebeat**
1. **Lightweight and Efficient**:
   - Consumes minimal system resources, making it ideal for deploying on application servers, containers, or lightweight environments.
   
2. **Modular Design**:
   - Prebuilt modules for popular log sources (e.g., Nginx, Apache, Kubernetes, AWS CloudWatch) simplify configuration.

3. **Multiline Log Handling**:
   - Handles multiline log entries (e.g., Java stack traces) by combining related lines into a single event.

4. **Resilient and Fault-Tolerant**:
   - Tracks log processing using a registry file, ensuring no data is lost even after a restart.

5. **Flexible Output Options**:
   - Can send logs directly to **Elasticsearch**, **Logstash**, or other destinations like Kafka.

6. **Autodiscover for Containers**:
   - Dynamically adapts to containerized environments such as Docker and Kubernetes.

7. **Secure Data Transmission**:
   - Supports TLS encryption and authentication for secure communication.

---

### **How Filebeat Fits into the ELK Pipeline**
- **Input**: Filebeat collects logs from log files, system logs, container logs, or cloud service logs.
- **Processing**: Preprocesses data (optional) using modules or custom processors.
- **Output**: Sends processed logs to Elasticsearch or Logstash for further analysis and storage.

---

### **Key Components of Filebeat**
1. **Inputs**:
   - Define where and how logs are collected.
   - Common input types:
     - `log`: Reads log files line by line.
     - `stdin`: Captures logs from standard input streams.

2. **Processors**:
   - Perform lightweight data transformations before forwarding logs.
   - Examples: adding fields, removing fields, or filtering events.

3. **Outputs**:
   - Define the destination for logs.
   - Supported outputs:
     - Elasticsearch (default)
     - Logstash
     - Kafka
     - Redis

4. **Modules**:
   - Predefined configurations for popular services and platforms, e.g., MySQL, Nginx, and AWS.

5. **Autodiscover**:
   - Dynamically adjusts configurations based on container or service metadata.

6. **Registry File**:
   - Tracks the read position in log files to prevent duplicate processing.

---

### **Filebeat Modules**
Filebeat modules provide preconfigured input, parsing, and visualization for common log sources. Each module contains:
- **Fileset**: Defines input configuration.
- **Ingest Pipelines**: Preprocess logs in Elasticsearch.

#### Example Modules:
1. **Nginx**: Handles Nginx access and error logs.
2. **System**: Collects system logs like syslog and authentication logs.
3. **Kubernetes**: Gathers Kubernetes pod logs and metadata.

#### Enabling a Module:
```bash
filebeat modules enable nginx
```

#### Configuring a Module:
Edit the module's configuration file, typically located in:
```yaml
/etc/filebeat/modules.d/nginx.yml
```

---

### **Example Filebeat Configuration**
Here’s a sample configuration file for Filebeat:

#### filebeat.yml:
```yaml
filebeat.inputs:
  - type: log
    paths:
      - /var/log/myapp/*.log
    multiline:
      pattern: '^['  # Example for multiline logs starting with a timestamp
      negate: true
      match: after

processors:
  - add_host_metadata: ~
  - add_cloud_metadata: ~

output.elasticsearch:
  hosts: ["http://localhost:9200"]
  username: "elastic"
  password: "changeme"

setup.kibana:
  host: "http://localhost:5601"
```

---

### **Advanced Features of Filebeat**

#### 1. **Multiline Log Handling**:
Filebeat can merge log lines based on a pattern, useful for logs like Java stack traces or exceptions.

Example Configuration:
```yaml
multiline:
  pattern: '^\['
  negate: true
  match: after
```

#### 2. **Dynamic Configuration with Autodiscover**:
Filebeat autodiscover monitors container environments (Docker, Kubernetes).

Example for Kubernetes:
```yaml
filebeat.autodiscover:
  providers:
    - type: kubernetes
      node: ${NODE_NAME}
      templates:
        - condition:
            equals:
              kubernetes.labels.app: "myapp"
          config:
            - type: container
              paths:
                - /var/log/containers/*-${data.kubernetes.container.id}.log
```

#### 3. **TLS Encryption for Secure Communication**:
```yaml
output.elasticsearch:
  hosts: ["https://elasticsearch.mycluster.local:9200"]
  username: "elastic"
  password: "changeme"
  ssl.certificate_authorities: ["/path/to/ca.crt"]
```

#### 4. **Filebeat and Logstash Integration**:
When Logstash is used as an intermediate processor:
```yaml
output.logstash:
  hosts: ["logstash.mycluster.local:5044"]
```

---

### **Monitoring and Debugging Filebeat**
1. **Enable Monitoring**:
   - Use the `Monitoring` feature in Elastic Stack to view metrics in Kibana.
   - Example:
     ```yaml
     monitoring.enabled: true
     monitoring.elasticsearch:
       hosts: ["http://localhost:9200"]
     ```

2. **Run Filebeat in Debug Mode**:
   - Start Filebeat in debug mode to troubleshoot issues:
     ```bash
     filebeat -e -d "*"
     ```

3. **Check Logs**:
   - Filebeat logs are stored in `/var/log/filebeat` or configured logging directories.

---

### **Common Use Cases**
1. **Application Log Collection**:
   - Collect logs from application servers and forward them to ELK for analysis.
2. **Cloud and Container Environments**:
   - Use Filebeat for Kubernetes and Docker log shipping with metadata enrichment.
3. **Centralized System Logging**:
   - Gather system logs from multiple servers into a single ELK cluster.