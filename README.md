# DevOps Failover Architecture with AWS Route 53 and Multi-Cloud Hosting

This project demonstrates a fully functional **Failover Architecture** using **AWS Route 53**, **EC2**, and **Azure Virtual Machines**, ensuring high availability and fault tolerance for a web application. The failover system automatically redirects traffic to a backup website when the primary one goes down, all while keeping the domain name unchanged, providing a seamless experience to users.

---

## Project Overview

The goal of this project was to build a resilient infrastructure that can handle failures gracefully. It achieves this by:

- Hosting two identical websites on **different cloud platforms** (AWS EC2 and Azure VM).
- Using **static IPs** for both instances.
- Mapping a **single domain** in **Route 53** to both IPs with a configured **failover policy**.
- Automatically rerouting traffic to the backup site if the main website is unresponsive.
- Automatically reverting to the main site once it's back online.

---

## Key Components

### 1. AWS Route 53
- Set up a **Failover Routing Policy** using health checks.
- Routes traffic to the **primary site** unless it's unhealthy.
- Fails over to the **secondary site** (hosted on Azure) when necessary.

### 2. AWS EC2 & Azure VM
- **Primary Site:** Hosted on an AWS EC2 instance.
- **Secondary Site:** Hosted on an Azure Virtual Machine.
- Both instances serve identical versions of the website for seamless failover.

### 3. Static IP Mapping
- Each instance uses a static IP.
- These IPs are associated with Route 53's DNS entries under a single domain name.

## Steps to Recreate

1. **Host identical websites** on AWS EC2 and Azure VM.
2. Assign **Elastic IP (AWS)** and **Static IP (Azure)** to the instances.
3. Register a domain and configure **Route 53**:
   - Set **A records** and **NS records** with failover routing (Primary & Secondary).
   - Create **Health Checks** for the primary site.

## Technologies Used

- AWS Route 53
- AWS EC2
- Microsoft Azure Virtual Machines
- Static IP Allocation
- Domain DNS Configuration
- Health Checks
- Linux Server Management

## Real World Use Case

- This setup is ideal for mission-critical applications where uptime is crucial. By leveraging multi-cloud failover, businesses can ensure their services remain available even in case of cloud outages or heavy load failures.

## License

- This project is open-source under the MIT License.
