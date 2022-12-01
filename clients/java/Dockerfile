FROM maven:3.8.6-openjdk-18

WORKDIR /app

ADD pom.xml .
RUN mvn verify --fail-never

COPY . .
RUN mvn clean package

CMD ["java", "-jar", "target/AdventofCode-1.0-SNAPSHOT-jar-with-dependencies.jar"]

