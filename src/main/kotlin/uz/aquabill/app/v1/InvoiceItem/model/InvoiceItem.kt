package uz.aquabill.app.v1.InvoiceItem.model

import jakarta.persistence.*
import uz.aquabill.app.v1.invoice.model.Invoice
import java.math.BigDecimal

@Entity
@Table(name = "invoice_items")
data class InvoiceItem(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id")
    val invoice: Invoice,

    val description: String,
    val quantity: BigDecimal = BigDecimal.ONE,
    val unitPrice: BigDecimal,
    val amount: BigDecimal
)
