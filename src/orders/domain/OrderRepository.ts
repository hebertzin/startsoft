interface OrderRepository {
    save(payload: Order): Order
    findAll(user_id: string): Order[]
    findById(id: string): Order
}