FROM openjdk:11-jdk-slim
RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential python3 && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /code
COPY Submissions .