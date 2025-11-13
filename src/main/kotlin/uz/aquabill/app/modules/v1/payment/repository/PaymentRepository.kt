package uz.aquabill.app.modules.v1.payment.repository

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import uz.aquabill.app.modules.v1.payment.model.Payment
import uz.aquabill.app.modules.v1.payment.model.PaymentStatus
import uz.aquabill.app.modules.v1.users.domain.User
import java.time.LocalDateTime

@Repository
interface PaymentRepository : JpaRepository<Payment, Long> {
//    fun findByInvoideIdAndDeletedFalse(invoiceId: Long?): List<Payment>
    fun findByInvoiceIdAndStatusAndDeletedFalse(invoiceId: Long?, status: PaymentStatus?): List<Payment>
    fun findByIdAndDeletedFalse(id: Long): Payment?
    
    @Query("""
        SELECT p FROM Payment p 
        WHERE (:invoiceId IS NULL OR p.invoice.id = :orderId)
        AND (:status IS NULL OR p.status = :status)
        AND (:startDate IS NULL OR p.createdAt >= :startDate)
        AND (:endDate IS NULL OR p.createdAt <= :endDate)
        AND p.deleted = false
    """)
    fun searchPayments(
        @Param("orderId") orderId: Long?,
        @Param("status") status: PaymentStatus?,
        @Param("startDate") startDate: LocalDateTime?,
        @Param("endDate") endDate: LocalDateTime?,
        pageable: Pageable
    ): Page<Payment>
    
//    fun findByStatusAndIsDeletedFalse(status: PaymentStatus): List<Payment>
//
//    fun findByCreatedByAndIsDeletedFalse(createdBy: User): List<Payment>
//
//    fun findByCreatedAtBetweenAndIsDeletedFalse(startDate: LocalDateTime, endDate: LocalDateTime): List<Payment>
//
//    fun existsByTransactionIdAndIsDeletedFalse(transactionId: String): Boolean
}
