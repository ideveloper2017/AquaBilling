package uz.aquabill.app.modules.v1.invoice.model

import jakarta.persistence.*
import uz.aquabill.app.modules.v1.InvoiceItem.model.InvoiceItem
import uz.aquabill.app.modules.v1.customer.model.Customer
import java.math.BigDecimal
import java.time.Instant
import java.time.LocalDate

@Entity
@Table(name = "invoices")
data class Invoice(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(unique = true, nullable = false)
    val invoiceNumber: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    val customer: Customer,

    val periodStart: LocalDate,
    val periodEnd: LocalDate,
    val issueDate: LocalDate,
    val dueDate: LocalDate,

    val totalAmount: BigDecimal = BigDecimal.ZERO,

    @Enumerated(EnumType.STRING)
    var status: InvoiceStatus = InvoiceStatus.ISSUED,

    val generatedBy: Long? = null,
    val createdAt: Instant = Instant.now(),

    @OneToMany(mappedBy = "invoice", cascade = [CascadeType.ALL], orphanRemoval = true)
    val items: MutableList<InvoiceItem> = mutableListOf()
)

enum class InvoiceStatus { ISSUED, PAID, PARTIAL, OVERDUE, CANCELLED }
