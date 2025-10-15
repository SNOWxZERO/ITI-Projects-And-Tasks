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

# Fix socket ownership at startup, then run sshd
ENTRYPOINT ["/bin/sh", "-c", "chown root:docker /var/run/docker.sock || true && exec /usr/sbin/sshd -D"]
