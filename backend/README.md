# ChefsAura Backend

## Introduction

This project is the backend for the ChefsAura application. It handles user management, inventory management, and order processing.

## Prerequisites

-   Java Development Kit (JDK) 8 or higher
-   Maven 3.6 or higher

## Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/WenHao1223/cat201-proj.git
    cd cat201-proj/backend
    ```

2. Install dependencies:
    ```sh
    mvn install
    ```

3. Build the project:
    ```sh
    mvn clean install
    ```

## Running the Application

To run the application using the embedded Tomcat server, use the following command:

```sh
mvn tomcat7:run
```

## Running Tests

To run the tests, use the following command:

```sh
mvn test
```

## Directory Structure

-   `src/main/java/com/chefsAura` - Main application code
-   `src/test/java/com/chefsAura` - Test code
-   `src/main/resources` - Configuration files and resources
