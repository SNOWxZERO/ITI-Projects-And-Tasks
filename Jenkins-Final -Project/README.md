# Lab2

![alt text](<images/WhatsApp Image 2025-09-20 at 12.27.24_f0311dad.jpg>)

## Jenkins Agent

Docker file

```Docker
FROM jenkins/agent:latest-jdk17

USER root

RUN apt-get update && \
    apt-get install -y docker.io openssh-server openjdk-17-jdk && \
    mkdir /var/run/sshd && \
    rm -rf /var/lib/apt/lists/*

# Set passwords
RUN echo "jenkins:jenkins" | chpasswd && \
    echo "root:root" | chpasswd

# Ensure jenkins user is in the docker group (create it if missing)
RUN groupadd -f docker && usermod -aG docker jenkins

EXPOSE 22

# Fix socket ownership at startup, then run sshd (a Problem i had :D)
ENTRYPOINT ["/bin/sh", "-c", "chown root:docker /var/run/docker.sock || true && exec /usr/sbin/sshd -D"]

```

```bash

docker build -t jenkins-agent-docker-with-ssh .

docker run -d \
  --name jenkins-agent-docker-ssh \
  -p 2222:22 \
  -v //var/run/docker.sock:/var/run/docker.sock \
  --user root \
  jenkins-agent-docker-with-ssh

# test if working
ssh jenkins@localhost -p 2222
```

and the agent works with docker :D
![alt text](images/{8DF563C2-2CD4-494A-B97F-A0A7A11ED6BC}.png)

now we need to connect it to the master jenkins we created yesterday

I had alot of errors and made alot of adjustments
but at last its working and connected
![alt text](images/{68D76675-ADAB-4646-A202-34CA94DAA0AC}.png)

## Instance Agent

### Terraform part

![alt text](images/{EF0D9616-E5EB-4D3D-B4F1-F0C4FA24E5E4}.png)
![alt text](images/{3BC6AAE7-7079-4503-A131-7F7C0991279A}.png)
![alt text](images/{B8E88E8D-25FF-4F16-B567-22E2949D125F}.png)

### Ansible Part

I am on windows so i use ansible via a docker container

```bash
docker run --rm -it \
  -v /$(pwd):/ansible \
  -v //c/Users/SNOW/.ssh:/root/.ssh \
  -w //ansible \
  williamyeh/ansible:alpine3 \
  sh -c "chmod 600 /root/.ssh/* && ansible-playbook -i inventory.ini configure-jenkins-agent.yaml"

```

![tst](images/{F18F9950-6C58-475C-AC5C-CD5BD003FD21}.png)
![alt text](images/{69B0A1A5-7D40-48D1-91DF-12A1D7D5558D}.png)

### Adding as a node

![alt text](images/{DEA5C4F2-78A0-412D-8563-C3D29CBC8D00}.png)

## Jenkins File

### Testing with simple jenkins file

IT WORKS
![alt text](images/{801CB906-9AD6-4D23-920B-08CEFDFAA10C}.png)

### Acctual app

Im using a calc webapp project
This is the repo im using with the docker file of the app image and the jenkins file

<https://github.com/SNOWxZERO/Calculator>

Finally it works :D

![alt text](images/{1B64D041-3E2B-49F6-A8A9-129AAE8FA7DB}.png)

#### the docker agent

![alt text](images/{D8D5F94D-8BBB-410B-A4B7-6ADACE910A61}.png)

#### the aws instance

I had to add an ingress rule to access port 30000
![alt text](images/{2A86674E-A005-4DFC-A0FE-9E42AFB62365}.png)
and now I can Access it :D
![alt text](images/{A0281894-91E0-4040-A249-BA101550F670}.png)

## MultiBranch Pipeline

edited the jenkins file to echo the branch name, added jenkinstest branch, and then created the pipeline

### First branch (jenkinstest)

![alt text](images/{4271FC6E-9E61-4E87-A444-E6C1654FD3B5}.png)
![alt text](images/{4FA9E29A-F2AE-42B9-987C-E516FFFD3AA5}.png)

### First branch (master)

![alt text](images/{669427DD-BB1D-406C-A275-D5EA38CE2FE4}.png)
![alt text](images/{78BB4A2C-CA4C-4658-9937-B341F4CA15F4}.png)

## Slack Notification

I followed a tutorial this is the outcome
![alt text](images/{13C4B187-0ACB-41AE-BB7A-BDC80CC9EC3D}.png)

## Webhook

I followed a tutorial also :D
I installed ngrok and run it then added the link in github to create a webhook
![alt text](images/image.png)

after alot of testing we got this
![alt text](images/{923994CF-6AE4-45C6-88CD-9C8155888AD4}.png)
![alt text](images/{8EE77CCA-7BDC-4714-ACDC-63D07D43DE85}.png)

gg
