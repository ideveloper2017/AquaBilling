package uz.aquabill.app.v1.cart

import uz.aquabill.app.v1.order.model.Order
import uz.aquabill.app.v1.order.model.OrderItem
import uz.aquabill.app.v1.order.model.OrderStatus
import uz.aquabill.app.v1.order.model.PaymentStatus
import uz.aquabill.app.v1.product.repository.ProductRepository
import uz.aquabill.app.v1.user.model.User
import jakarta.transaction.Transactional
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.util.*

@Service
class CartService(
    private val cartRepository: CartRepository,
    private val productRepository: ProductRepository
) {
    
    @Transactional
    fun getOrCreateCart(user: User): Cart {
        return cartRepository.findByUserIdAndIsActiveTrue(user.id!!) ?: createNewCart(user)
    }
    
    @Transactional
    fun getCartWithItems(user: User): Cart? {
        return cartRepository.findByUserIdWithItems(user.id!!)
    }
    
    @Transactional
    fun addItemToCart(user: User, productId: Long, quantity: Int = 1): Cart {
        val cart = getOrCreateCart(user)
        val product = productRepository.findByIdOrNull(productId)
            ?: throw NoSuchElementException("Product not found with id: $productId")
        
        if (product.quantityInStock < quantity) {
            throw IllegalStateException("Insufficient stock for product: ${product.name}")
        }
        
        cart.addItem(productId, quantity, product.price)
        return cartRepository.save(cart)
    }
    
    @Transactional
    fun updateCartItem(user: User, productId: Long, quantity: Int): Cart {
        val cart = getCartWithItems(user) ?: throw NoSuchElementException("No active cart found")
        
        if (quantity <= 0) {
            cart.removeItem(productId)
        } else {
            val product = productRepository.findByIdOrNull(productId)
                ?: throw NoSuchElementException("Product not found with id: $productId")
                
            if (product.quantityInStock < quantity) {
                throw IllegalStateException("Insufficient stock for product: ${product.name}")
            }
            
            val item = cart.items.find { it.productId == productId }
                ?: throw NoSuchElementException("Product not found in cart")
                
            item.quantity = quantity
            item.unitPrice = product.price
        }
        
        return cartRepository.save(cart)
    }
    
    @Transactional
    fun removeItemFromCart(user: User, productId: Long): Cart {
        val cart = getCartWithItems(user) ?: throw NoSuchElementException("No active cart found")
        
        if (!cart.removeItem(productId)) {
            throw NoSuchElementException("Product not found in cart")
        }
        
        return cartRepository.save(cart)
    }
    
    @Transactional
    fun clearCart(user: User): Cart {
        val cart = getCartWithItems(user) ?: throw NoSuchElementException("No active cart found")
        cart.clear()
        return cartRepository.save(cart)
    }
    
    @Transactional
    fun checkoutCart(user: User, notes: String? = null): Order {
        val cart = getCartWithItems(user) ?: throw NoSuchElementException("No active cart found")
        
        if (cart.items.isEmpty()) {
            throw IllegalStateException("Cannot checkout an empty cart")
        }
        
        // Convert cart to order
        val order = Order().apply {
            this.user = user
            this.orderNumber = generateOrderNumber()
            this.customerNotes = notes
            this.status = OrderStatus.PENDING
            this.paymentStatus = PaymentStatus.PENDING
            
            // Add items to order
            cart.items.forEach { cartItem ->
                val product = productRepository.findByIdOrNull(cartItem.productId)
                    ?: throw NoSuchElementException("Product not found: ${cartItem.productId}")
                
                if (product.quantityInStock < cartItem.quantity) {
                    throw IllegalStateException("Insufficient stock for product: ${product.name}")
                }
                
                val orderItem = OrderItem().apply {
                    this.order = this@apply as Order
                    this.productId = product.id!!
                    this.quantity = cartItem.quantity
                    this.unitPrice = cartItem.unitPrice
                    this.discountAmount = BigDecimal.ZERO // Apply discounts if any
                    this.taxAmount = BigDecimal.ZERO // Calculate tax if needed
                    calculateTotal()
                }
                
                items.add(orderItem)
                
                // Update product stock
                product.quantityInStock -= cartItem.quantity
                productRepository.save(product)
            }
            
            // Calculate order totals
            calculateTotals()
        }
        
        // In a real application, you would save the order here
        // orderRepository.save(order)
        
        // Clear the cart after successful checkout
        cart.clear()
        cart.isActive = false
        cartRepository.save(cart)
        
        return order
    }
    
    private fun createNewCart(user: User): Cart {
        return Cart().apply {
            this.user = user
            this.isActive = true
        }.let { cartRepository.save(it) }
    }
    
    private fun generateOrderNumber(): String {
        // In a real application, you might want to use a more sophisticated order number generation
        return "ORD-${System.currentTimeMillis()}"
    }
}
