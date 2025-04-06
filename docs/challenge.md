## 🧾 Main Features

### 🛒 Order Management

- [x] Create orders  
- [x] List orders  
- [x] Update orders  
- [x] Cancel orders  
- [ ] Publish `order_created` event when creating an order  
- [ ] Publish `order_status_updated` event when updating order status  
- [ ] Index orders in Elasticsearch  
- [ ] Update index when editing orders  
- [ ] API endpoint for searching by:
  - [x] Order ID  
  - [ ] Order status  
  - [ ] Date range  
  - [ ] Order items  

## ✅ Testing

- [ ] Unit tests for services  
- [ ] Integration tests for controllers  


## 📊 Logging and Monitoring

- [ ] Request and error logging  
- [ ] Kafka event logging  



Each order should contain:

- `id`: unique identifier  
- `items`: list of products (name, quantity, price)  
- `status`: pending, processing, shipped, delivered, cancelled  
- `createdAt`: creation date  
- `updatedAt`: last update date  

## 🐳 Docker Setup

- [x] `docker-compose` with all required services:
  - [x] NestJS App  
  - [x] PostgreSQL  
  - [ ] Kafka  
  - [ ] Elasticsearch  

## 📘 API Documentation

- [x] Swagger available at `/api/v1/documentation`