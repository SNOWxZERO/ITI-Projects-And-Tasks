
# Kubernetes Lab Tasks

## 1. Install k8s cluster (minikube)

**Status:** Done

![Minikube Installed]({E82C8789-8A53-48E6-9F62-5440FD470F70}.png)

## 2. Create a pod with the name `redis` and with the image `redis`

![Redis Pod]({7838649C-D80E-453E-9444-C5B6A9D3847E}.png)

## 3. Create a pod with the name `nginx` and with the image `nginx123`

*Use a pod-definition YAML file.*

## 4. What is the nginx pod status?

![Nginx Pod Status]({84C67DAB-83F2-4A37-B9DF-2D3D94B75AF0}.png)

## 5. Change the nginx pod image to `nginx` and check the status again

![Nginx Pod Updated]({44E316C2-7576-4F3F-8729-AC954B9C9524}.png)

## 6. How many ReplicaSets exist on the system?

![ReplicaSets Count]({64A3CC05-0472-4A48-8A01-AB75417E917A}.png)

## 7. Create a ReplicaSet

- **Name:** replica-set-1
- **Image:** busybox
- **Replicas:** 3

![ReplicaSet Created]({247ED0E6-8CBB-4BFE-B159-5033EA2DE224}.png)

## 8. Scale the ReplicaSet `replica-set-1` to 5 PODs

![ReplicaSet Scaled]({39305EFC-C003-4D64-9311-E0D43CB9BFCC}.png)

## 9. How many PODs are READY in the `replica-set-1`?

![Ready Pods]({70FFFAB9-E5FF-4016-BEDD-E84D50927100}.png)

## 10. Delete any one of the 5 PODs then check how many PODs exist now

**Q:** Why are there still 5 PODs, even after you deleted one?

**A:** Because ReplicaSet ensures that there are always 5 pods. If one is deleted, it creates another one.

![ReplicaSet Maintains Pods]({17D240D1-F28C-4AA9-BBEC-FA32C76AA160}.png)

## 11. How many Deployments and ReplicaSets exist on the system?

![Deployments and ReplicaSets]({4D5BB6CB-5B14-4CBE-9795-86493745AB69}.png)

## 12. Create a Deployment

- **Name:** deployment-1
- **Image:** busybox
- **Replicas:** 3

![Deployment Created]({18F564B8-32A6-4CB4-AC2C-B3565313C88D}.png)

## 13. How many Deployments and ReplicaSets exist on the system now?

![Deployments and ReplicaSets Now]({21FA16A0-4854-42A8-8F8E-6B6F755E0143}.png)

## 14. How many pods are ready with the `deployment-1`?

![Ready Pods in Deployment]({6B89FE79-8A89-4FAA-87E4-561A6DF87489}.png)

## 15. Update `deployment-1` image to `nginx` then check the ready pods again

![Deployment Updated 1]({D61F300A-E468-4DC2-9530-792F1446C7C9}.png)
![Deployment Updated 2]({87027847-185F-47C0-9D3F-C48846B44767}.png)

## 16. Run `kubectl describe deployment deployment-1` and check events

**Q:** What is the deployment strategy used to upgrade the deployment-1?

**A:** RollingUpdate

![Deployment Events]({3BC6CF5E-D03B-4C6C-9DE0-C0A497C0E668}.png)

## 17. Rollback the `deployment-1`

![Deployment Rolled Back]({5B8765D6-DEE6-4BA8-B962-CBBF26D936AA}.png)

**Q:** What is the used image with the deployment-1?

**A:** busybox

![Deployment Image]({1C4452AB-0E7D-470D-B235-6DA0FFEB0917}.png)

## 18. Create a deployment using nginx image with latest tag only

- **Image:** nginx:latest
- **Name:** nginx-deployment
- **App labels:**
	- app: nginx-app
	- type: front-end
- **Container name:** nginx-container
- **Replicas:** 3

![Nginx Deployment 1]({98371E3E-E6EC-4B9F-A084-EB95B882713A}.png)
![Nginx Deployment 2]({04998EA5-9108-482E-A0EB-E0385BB8B027}.png)
