package uz.aquabill.app.v1.cart

import uz.aquabill.app.common.BaseEntity
import jakarta.persistence.*
import java.math.BigDecimal

@Entity
@Table(name = "cart_items")
class CartItem(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    var cart: Cart,

    @Column(name = "product_id", nullable = false)
    var productId: Long,

    @Column(nullable = false)
    var quantity: Int = 0,

    @Column(name = "unit_price", nullable = false, precision = 10, scale = 2)
    var unitPrice: BigDecimal = BigDecimal.ZERO
) : BaseEntity() {
    val totalPrice: BigDecimal
        get() = unitPrice.multiply(BigDecimal(quantity))
}
