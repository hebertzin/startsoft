## 🏗️ Architecture

This project follows a **modular structure** combined with the principles of **Clean Architecture** to ensure high maintainability, scalability, and separation of concerns.

Each domain is structured into isolated modules (e.g., `orders`) and divided into layers:

### 📦 Module Structure Example (`orders`)

/orders
├── /application Use cases and business logic
├── /domain - Entities, enums, interfaces (pure business rules) │ 
├── /infra - External integrations (database, Kafka, Elasticsearch, etc.) │
├── /dto - # Data Transfer Objects 
├── /controllers  REST API controllers 

### 💡 Key Concepts

- **Domain Layer**: Contains pure business logic (entities, interfaces, enums). This layer is framework-agnostic.
- **Application Layer**: Handles use cases and orchestrates how domain models interact. It defines the app’s business rules.
- **Infrastructure Layer**: Deals with external services (PostgreSQL, Kafka, Elasticsearch) and framework-specific implementations.
- **Controllers & DTOs**: Expose the domain/application layers through NestJS HTTP routes and shape the input/output.

### ✅ Benefits of this Approach

- Easier to test and maintain.
- Clear separation of concerns.
- Reusable and decoupled business logic.
- Infrastructure can be swapped without affecting core logic.
