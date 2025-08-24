# Kubernetes Day 3 Tasks

---

## 1. How many DaemonSets are created in the cluster in all namespaces?

**Answer:** 1

![DaemonSets in cluster]({DDD2D1CF-BCE5-4D1D-95C8-4EACCA58C1FB}.png)

---

## 2. What DaemonSets exist on the kube-system namespace?

**Answer:** 1

![DaemonSets in kube-system]({66615668-8C03-443A-9456-C9A90DDDF947}.png)

---

## 3. What is the image used by the POD deployed by the kube-proxy DaemonSet?

![kube-proxy DaemonSet image]({A13C6725-4543-4626-8308-3953B8B158D4}.png)

---

## 4. Deploy a DaemonSet for FluentD Logging

**Specifications:**

- **Name:** `elasticsearch`
- **Namespace:** `kube-system`
- **Image:** `k8s.gcr.io/fluentd-elasticsearch:1.20`

![FluentD DaemonSet initial]({EA828A71-C38E-49E9-96BD-6579E1FA9361}.png)

**After changing image to `fluentd:v1.16.9-debian-1.0`:**

![FluentD DaemonSet updated]({36DD83F8-5B17-4015-A395-6C3B6C9B0999}.png)

---

## 5. Deploy a pod named nginx-pod using the nginx:alpine image

**Specifications:**

- **Name:** `nginx-pod`
- **Image:** `nginx:alpine`
- **Labels:** `tier=backend`

![nginx-pod deployment command]({9AF79764-616E-4C88-8EE9-5BFFB1B6EF47}.png)
![nginx-pod verification]({09C04B53-80D4-42A9-A87B-4A818D53249F}.png)

---

## 6. Deploy a test pod using the nginx:alpine image

![test pod deployment]({2734CADB-0E04-496D-9E14-950BED957940}.png)

---

## 7. Create a service backend-service to expose the backend application within the cluster on port 80

![backend-service creation]({6B1CC7DA-03CB-4A44-9296-F3F4B1241F51}.png)
![backend-service verification]({878CD565-B24F-4419-BFC7-643CAE1934EC}.png)

---

## 8. Try to curl the backend-service from the test pod. What is the response?

![curl backend-service response]({E4DCA8CF-3504-4AE5-BC5E-68E00FE1ECE6}.png)

---

## 9. Create a deployment named web-app using the image nginx with 2 replicas

![web-app deployment]({C3226626-4D79-4B92-8783-CC02CE729CE7}.png)

---

## 10. Expose the web-app as service web-app-service application on port 80 and nodeport 30082

![web-app-service creation]({CAD192CA-D001-4990-AE03-49F24AEAD458}.png)

---

## 11. Access the web app from the node

![web app access step 1]({0268E2B2-2374-49F9-8E59-9B1ED99F341D}.png)
![web app access step 2]({4669F9E3-7861-4DC4-A648-0566FE3DE42C}.png)
![web app access step 3]({D8737538-60FE-4725-9831-D8F68E3FA69E}.png)
![web app access step 4]({BFB49A22-7E69-470F-BC45-33A03AD6B2D2}.png)
![web app access step 5]({01806CE2-8466-4AC4-A6B7-84E78027DA0D}.png)
![web app access step 6]({2D834867-8F14-443F-8F64-EAE749B64743}.png)

---

## 12. How many static pods exist in this cluster in all namespaces?

**Answer:** 4
![alt text]({4E16D626-0C1D-4B9D-ADB7-B74F0CDB5711}.png)

---

## 13. On which nodes are the static pods created currently?

**Answer:** On the minikube node (I only have it)

![alt text]({57FD9DF4-D67D-4694-A992-B5C7025869F0}.png)

---
