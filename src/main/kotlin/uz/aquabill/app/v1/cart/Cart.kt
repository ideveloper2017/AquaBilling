package uz.aquabill.app.v1.cart

import uz.aquabill.app.common.BaseEntity
import uz.aquabill.app.v1.user.model.User
import jakarta.persistence.*
import java.math.BigDecimal


@Entity
@Table(name = "carts")
class Cart : BaseEntity() {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    lateinit var user: User
    
    @OneToMany(mappedBy = "cart", cascade = [CascadeType.ALL], orphanRemoval = true)
    val items: MutableList<CartItem> = mutableListOf()
    
    @Column(nullable = false)
    var isActive: Boolean = true
    
    val totalPrice: BigDecimal
        get() = items.sumOf { it.totalPrice }
    
    fun addItem(productId: Long, quantity: Int, unitPrice: BigDecimal): CartItem {
        val existingItem = items.find { it.productId == productId }
        return if (existingItem != null) {
            existingItem.quantity += quantity
            existingItem
        } else {
            val newItem = CartItem(
                cart = this,
                productId = productId,
                quantity = quantity,
                unitPrice = unitPrice
            )
            items.add(newItem)
            newItem
        }
    }
    
    fun removeItem(productId: Long): Boolean {
        return items.removeIf { it.productId == productId }
    }
    
    fun clear() {
        items.clear()
    }
}
