package uz.aquabill.app.modules.v1.invoice.repository


import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import uz.aquabill.app.modules.v1.customer.model.Customer
import uz.aquabill.app.modules.v1.invoice.model.Invoice
import uz.aquabill.app.modules.v1.invoice.model.InvoiceStatus
import java.time.LocalDate

@Repository
interface InvoiceRepository : JpaRepository<Invoice, Long> {
    fun findByInvoiceNumber(invoiceNumber: String): Invoice?
    fun findAllByCustomer(customer: Customer): List<Invoice>
    fun findAllByStatus(status: InvoiceStatus): List<Invoice>
    fun findAllByPeriodEndBefore(date: LocalDate): List<Invoice>
}
