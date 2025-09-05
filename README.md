# Aqua Billing System

A comprehensive water distribution management system built with Spring Boot and Kotlin.

## Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (RBAC)
  - Refresh token mechanism

- **User Management**
  - User registration and profile management
  - Role assignment and permission management
  - Admin dashboard for user management

- **API Documentation**
  - Swagger UI for API documentation
  - Interactive API testing

## Tech Stack

- **Backend**
  - Java 17
  - Kotlin
  - Spring Boot 3.x
  - Spring Security
  - Spring Data JPA
  - H2 Database (for development)
  - PostgreSQL (for production, configuration needed)

- **Tools**
  - Maven
  - Docker (for containerization)
  - Swagger/OpenAPI 3.0

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6.0 or higher
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/aqua-billing-system.git
   cd aqua-billing-system
   ```

2. **Build the project**
   ```bash
   mvn clean install
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the application**
   - API Documentation: http://localhost:8080/api/swagger-ui.html
   - H2 Console: http://localhost:8080/api/h2-console
     - JDBC URL: jdbc:h2:mem:aquabilldb
     - Username: sa
     - Password: password

## Default Users

The application comes with the following default users:

| Username | Password    | Roles               |
|----------|-------------|---------------------|
| admin    | admin123    | ROLE_ADMIN, ROLE_SUPER_ADMIN |
| manager  | manager123  | ROLE_MANAGER        |
| operator | operator123 | ROLE_OPERATOR       |

## API Endpoints

### Authentication

- `POST /api/v1/auth/signin` - Authenticate user and get JWT token
- `POST /api/v1/auth/signup` - Register a new user
- `POST /api/v1/auth/refreshtoken` - Get new access token using refresh token
- `POST /api/v1/auth/signout` - Invalidate refresh token

### Users

- `GET /api/v1/users/me` - Get current user profile
- `PUT /api/v1/users/me` - Update current user profile
- `GET /api/v1/users` - Get all users (Admin only)
- `GET /api/v1/users/{id}` - Get user by ID (Admin only)
- `PUT /api/v1/users/{id}/roles` - Update user roles (Admin only)
- `DELETE /api/v1/users/{id}` - Delete user (Admin only)

## Configuration

Application configuration can be found in `src/main/resources/application.yml`.

### Database Configuration

By default, the application uses an in-memory H2 database. To use PostgreSQL in production:

1. Update `application.yml` with your PostgreSQL configuration:
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/aquabill
       username: your_username
       password: your_password
       driver-class-name: org.postgresql.Driver
     jpa:
       database-platform: org.hibernate.dialect.PostgreSQLDialect
   ```

## Security

- JWT tokens are used for authentication
- Passwords are encrypted using BCrypt
- Role-based access control (RBAC) is implemented
- CSRF protection is disabled for API endpoints
- CORS is configured to allow requests from frontend applications

## Deployment

### Docker

1. Build the Docker image:
   ```bash
   docker build -t aqua-billing-system .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:8080 aqua-billing-system
   ```

### Kubernetes

Kubernetes deployment files are provided in the `k8s` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Spring Boot Team
- Kotlin Team
- All open-source contributors
