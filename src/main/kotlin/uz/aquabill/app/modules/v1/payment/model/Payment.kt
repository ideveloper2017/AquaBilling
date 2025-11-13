package uz.aquabill.app.modules.v1.payment.model

import jakarta.persistence.*
import uz.aquabill.app.common.BaseEntity
import uz.aquabill.app.modules.v1.invoice.model.Invoice
import uz.aquabill.app.modules.v1.users.domain.User
import java.io.Serializable
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.*

@Entity
@Table(name = "payments")
data class Payment(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id", nullable = false)
    val invoice: Invoice,

    @Column(nullable = false, precision = 10, scale = 2)
    var amount: BigDecimal,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    var paymentMethod: PaymentMethod,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    var status: PaymentStatus = PaymentStatus.PENDING,

    @Column(length = 500)
    var notes: String? = null,

    @Column(length = 100)
    var transactionId: String? = null,

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "created_by")
//    val createdBy: User? = null,


): BaseEntity(), Serializable {}

enum class PaymentStatus {
    PENDING,
    COMPLETED,
    FAILED,
    REFUNDED,
    PARTIALLY_REFUNDED,
    CANCELLED
}

enum class PaymentMethod {
    CASH,
    CREDIT_CARD,
    DEBIT_CARD,
    BANK_TRANSFER,
    MOBILE_PAYMENT,
    DIGITAL_WALLET,
    OTHER
}
