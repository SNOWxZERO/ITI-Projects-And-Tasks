# Kubernetes Day 2 Tasks

---

## 1. How many Namespaces exist on the system?

**Answer:** 4

![Namespaces Screenshot](./{32643DAE-5F56-4FD6-B916-3B2D78EF7F8B}.png)

---

## 2. How many pods exist in the kube-system namespace?

**Answer:** 7

![kube-system Pods Screenshot](./{0F27C35B-80C5-4FE9-AE3C-A9BC73E52E18}.png)

---

## 3. Create a deployment with

- **Name:** `beta`
- **Image:** `redis`
- **Replicas:** 2
- **Namespace:** `finance`
- **Resources Requests:**
  - CPU: 0.5 vCPU
  - Memory: 1G
- **Resources Limits:**
  - CPU: 1 vCPU
  - Memory: 2G

![Beta Deployment Screenshot 1](./{A191EB31-6DFC-46C0-ACCD-0536A20E1CAC}.png)
![Beta Deployment Screenshot 2](./{21679784-45FC-470D-9932-8F6D1567BDDD}.png)

---

## 4. How many Nodes exist on the system?

![Nodes Screenshot](./{A71A1867-32F9-49E7-90E0-B74625BA3707}.png)

---

> **Note:** For questions 5 to 7, use the following cluster:
> [KillerCoda Kubernetes Playground](https://killercoda.com/playgrounds/scenario/kubernetes)

---

## 5. Do you see any taints on master?

![Taints on Master Screenshot](./{15013520-63F3-4C69-A214-671EE40445AD}.png)

---

## 6. Apply a label `color=blue` to the master node

![Label Master Node Screenshot](./{73CC4DB0-579E-40F0-B266-A9862FF43D4D}.png)

---

## 7. Create a new deployment named `blue` with the nginx image and 3 replicas

- Set Node Affinity to the deployment to place the pods on master only
- **NodeAffinity:** `requiredDuringSchedulingIgnoredDuringExecution`
- **Key:** `color`
- **Values:** `blue`

![Blue Deployment Screenshot 1](./{699A7985-F4EB-4D4A-8B2B-E20EB4BA63C7}.png)
![Blue Deployment Screenshot 2](./{3CB120C8-B5C5-411D-9E20-18583FE64B96}.png)
