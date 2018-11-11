FROM openjdk:8-jdk-alpine

RUN apk add --update \
    curl \
    && rm -rf /var/cache/apk/*

# Create directory for jar
RUN mkdir -p /apps/
COPY build/libs/EscapeRoomBackend-*.jar  /apps/EscapeRoomBackend.jar

# Set the working directory to root
WORKDIR /

# Set timezone to eastern standard
ENV TZ="America/New_York"
RUN sh -c 'ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone'

ENV JAVA_OPTS=""
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/apps/EscapeRoomBackend.jar"]