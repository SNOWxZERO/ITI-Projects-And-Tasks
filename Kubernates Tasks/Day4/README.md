# Kubernetes Day 4 Tasks

## 1. How many ConfigMaps exist in the environment?

![ConfigMaps List]({04E9D042-9996-4C44-8CE2-61213A8E8855}-1.png)

---

## 2. Create a new ConfigMap

**ConfigMap Name:** `webapp-config-map`  
**Data:**  

- `APP_COLOR=darkblue`

![ConfigMap Creation]({32752E7C-67A8-4AD6-9400-270E5FF6DD52}.png)
![ConfigMap Details]({4AF9C1E1-2EBC-484A-A5B5-1A49A2A4018F}.png)

---

## 3. Create a `webapp-color` POD with nginx image and use the created ConfigMap

![webapp-color Pod]({AE258300-3315-402C-8F75-E9345F00FB1B}.png)

---

## 4. How many Secrets exist on the system?

![Secrets List]({DB96DDED-21EE-477E-BB92-EAEE556897BD}.png)

---

## 5. How many secrets are defined in the `default-token` secret?

There are no secrets in `default-token` here in killercoda.

![default-token Secret]({E21468AA-751E-4BAB-B3F9-FBCF7B31D610}.png)

---

## 6. Create a POD called `db-pod` with the image `mysql:5.7` and check the POD status

![db-pod Creation]({0FD1CBF2-637B-4089-BD0D-BA05F9F03154}.png)
![db-pod Status]({C4085D53-4656-4B42-AFC6-FC4FFA3E0B51}.png)

---

## 7. Why is the `db-pod` status not ready?

![db-pod Not Ready]({D431434E-F966-45AA-AA8C-7443732C0B30}.png)

---

## 8. Create a new secret named `db-secret` with the following data

- `MYSQL_DATABASE=sql01`
- `MYSQL_USER=user1`
- `MYSQL_PASSWORD=password`
- `MYSQL_ROOT_PASSWORD=password123`

![db-secret Creation]({DF9BDD9E-1B75-47A7-BFC7-D8B093AB6287}.png)

---

## 9. Configure `db-pod` to load environment variables from the newly created secret

_Delete and recreate the pod if required._

![db-pod with Secret]({44543A17-6921-4E08-AF17-C621263DF533}.png)

---

## 10. Create a multi-container pod with 2 containers

- **Pod Name:** `yellow`
- **Container 1:**  
  - Name: `lemon`  
  - Image: `busybox`
- **Container 2:**  
  - Name: `gold`  
  - Image: `redis`

![yellow Pod]({A42A58F5-BA28-4F07-A54A-A105D39DF778}.png)

---

## 11. Create a pod `red` with redis image and use an initContainer

- **InitContainer:**  
  - Image: `busybox`
  - Command: `sleep 20`

![red Pod InitContainer]({D67A4A31-0F8D-4DEE-B8ED-B498B471371E}.png)
![red Pod Status]({C69C2A86-4986-44B7-B222-787C62D876B2}.png)

---

## 12. Create a pod named `print-envars-greeting`

- **Container Name:** `print-env-container`
- **Image:** `bash`
- **Environment Variables:**
  - `GREETING=Welcome to`
  - `COMPANY=DevOps`
  - `GROUP=Industries`
- **Command:**  
  `echo ["$(GREETING) $(COMPANY) $(GROUP)"]`

_Check the output using:_  
`kubectl logs -f [pod-name]`

![print-envars-greeting Pod]({96AB9CDB-CD73-44B7-AE48-96AD2275AAF5}.png)

---

## 13. Where is the default kubeconfig file located in the current environment?

`C:\Users\SNOW\.kube\config`

---

## 14. How many clusters are defined in the default kubeconfig file?

![Kubeconfig Clusters]({8F9DABEE-4425-4A63-8F8E-145F054A094E}.png)

---

## 15. What is the user configured in the current context?

![Current Context User]({DA430F9B-1435-448A-ABF4-E028E80DE63B}.png)

---

## 16. Create a Persistent Volume with the given specification

- **Volume Name:** `pv-log`
- **Storage:** 100Mi
- **Access Modes:** ReadWriteMany
- **Host Path:** `/pv/log`

![Persistent Volume]({CC592186-1A34-4346-9A37-89CD5659BB38}.png)

---

## 17. Create a Persistent Volume Claim with the given specification

- **Volume Name:** `claim-log-1`
- **Storage Request:** 50Mi
- **Access Modes:** ReadWriteMany

![Persistent Volume Claim]({14B62F6A-E96F-4753-B371-DC1FF560E859}.png)

---

## 18. Create a webapp pod to use the persistent volume claim as its storage

- **Name:** `webapp`
- **Image Name:** `nginx`
- **Volume:** PersistentVolumeClaim=`claim-log-1`
- **Volume Mount:** `/var/log/nginx`

![webapp Pod with PVC]({0EC360F7-07B4-4A01-A443-AAD5F56A5826}.png)
![webapp Pod Status]({7AFAEBD4-F008-4A72-ACD0-F64387E8A4A1}.png)
