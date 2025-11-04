package uz.aquabill.app.v1.payment.model

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import uz.aquabill.app.common.BaseEntity
import uz.aquabill.app.v1.invoice.model.Invoice
import uz.aquabill.app.v1.user.model.User
import java.math.BigDecimal
import java.time.Instant
import java.time.LocalDateTime

@Entity
@Table(name = "payments")
 class Payment(): BaseEntity(){


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id")
    lateinit var invoillce: Invoice

    var paymentDate: Instant = Instant.now()
    @Column(nullable = false, precision = 10, scale = 2)
    var amount: BigDecimal=BigDecimal.ZERO


    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    var paymentMethod: PaymentMethod=PaymentMethod.CASH

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    var status: PaymentStatus = PaymentStatus.PENDING

    @Column(length = 500)
    var notes: String? = null

    @Column(length = 100)
    var transactionId: String? = null



}

enum class PaymentStatus {
    PENDING,
    CONFIRMED,
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
