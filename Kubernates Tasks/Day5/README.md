# Kubernetes Day 5 Tasks - HAProxy Ingress Controller Setup

## 1. Create a namespace `haproxy-controller-devops`

![Namespace Creation]({7A78EEBE-8E01-4C7E-8B2A-CA62651C494F}.png)

---

## 2. Create a ServiceAccount `haproxy-service-account-devops` under the same namespace

![ServiceAccount Creation]({76F817E4-C7C0-4C4C-B304-A6FD4B913EAA}.png)

---

## 3. Create a ClusterRole named `haproxy-cluster-role-devops`

**Permissions:**
- Resources: `configmaps`, `secrets`, `endpoints`, `nodes`, `pods`, `services`, `namespaces`, `events`, `serviceaccounts`
- Verbs: `get`, `list`, `watch`, `create`, `patch`, `update`

![ClusterRole Creation]({F4C9D515-524B-481F-9459-DF3428B1A211}.png)

---

## 4. Create a ClusterRoleBinding named `haproxy-cluster-role-binding-devops`

**Configuration:**
- **Namespace:** `haproxy-controller-devops`
- **RoleRef:**
  - `apiGroup`: `rbac.authorization.k8s.io`
  - `kind`: `ClusterRole`
  - `name`: `haproxy-cluster-role-devops`
- **Subjects:**
  - `kind`: `ServiceAccount`
  - `name`: `haproxy-service-account-devops`
  - `namespace`: `haproxy-controller-devops`

![ClusterRoleBinding Creation]({78A3CDC5-7636-4AB6-950B-AC9B1720AF8F}.png)

---

## 5. Create a backend deployment named `backend-deployment-devops`

**Configuration:**
- **Namespace:** `haproxy-controller-devops`
- **Labels:** `run=ingress-default-backend`
- **Replicas:** 1
- **Selector:** `matchLabels.run=ingress-default-backend`
- **Template Labels:** `run=ingress-default-backend`
- **Container:**
  - Name: `backend-container-devops`
  - Image: `gcr.io/google_containers/defaultbackend:1.0`
  - Port: `8080`

![Backend Deployment]({F49849E4-AC5C-4133-8283-4603F7AF7D99}.png)

---

## 6. Create a service for backend named `service-backend-devops`

**Configuration:**
- **Namespace:** `haproxy-controller-devops`
- **Labels:** `run=ingress-default-backend`
- **Selector:** `run=ingress-default-backend`
- **Port:**
  - Name: `port-backend`
  - Protocol: `TCP`
  - Port: `8080`
  - TargetPort: `8080`

![Backend Service]({A833110D-25E1-414C-9DD3-620C50B11D88}.png)

---

## 7. Create a frontend deployment named `haproxy-ingress-devops`

**Configuration:**
- **Namespace:** `haproxy-controller-devops`
- **Replicas:** 1
- **Selector:** `matchLabels.haproxy-ingress`
- **Template Labels:** `run=haproxy-ingress`
- **ServiceAccount:** `haproxy-service-account-devops`

**Container Specifications:**
- **Name:** `ingress-container-devops`
- **Image:** `haproxytech/kubernetes-ingress:1.7.10`
- **Args:** `--default-backend-service=haproxy-controller-devops/service-backend-devops`
- **Resources:**
  - CPU: `500m`
  - Memory: `50Mi`
- **LivenessProbe:**
  - Path: `/healthz`
  - Port: `1024`

**Ports:**
- `http`: `80`
- `https`: `443`
- `stat`: `1024`

**Environment Variables:**
- `TZ`: `Etc/UTC`
- `POD_NAME`: `metadata.name`
- `POD_NAMESPACE`: `metadata.namespace`

![Frontend Deployment 1]({E6D73568-FECD-4FA8-8841-BA16FCC336B8}.png)
![Frontend Deployment 2]({128F2BFA-320D-4C73-A965-BB06937324A5}.png)

---

## 8. Create a service for frontend named `ingress-service-devops`

**Configuration:**
- **Namespace:** `haproxy-controller-devops`
- **Labels:** `run=haproxy-ingress`
- **Selector:** `run=haproxy-ingress`
- **Type:** `NodePort`

**Ports:**
- **HTTP:**
  - Port: `80`
  - TargetPort: `80`
  - NodePort: `32456`
- **HTTPS:**
  - Port: `443`
  - TargetPort: `443`
  - NodePort: `32567`
- **Stat:**
  - Port: `1024`
  - TargetPort: `1024`
  - NodePort: `32678`

![Frontend Service]({329073DC-E33C-463B-8710-EF8E09E16313}.png)

---

## Final Output

![Final Output 1]({2D8F212F-BFCD-4369-9A5C-A50CEC0C6424}.png)
![Final Output 2]({0A0D6ED9-5B67-4950-9222-23D3B2D9A1FF}.png)
![Final Output 3]({09850E57-1D8D-4DA6-9884-CA7672906679}.png)