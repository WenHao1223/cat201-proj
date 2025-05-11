# Use OpenJDK base image
FROM tomcat:11.0-jdk21-temurin

# Remove default webapps to clean up
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy your WAR file to Tomcat's webapps directory
COPY target/cat201-proj-1.0-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war

# Expose port
EXPOSE 8080

# Start Tomcat
CMD ["catalina.sh", "run"]
