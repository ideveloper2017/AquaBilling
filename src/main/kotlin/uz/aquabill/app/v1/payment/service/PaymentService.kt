package uz.aquabill.app.v1.payment.service

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import uz.aquabill.app.v1.invoice.model.Invoice
import uz.aquabill.app.v1.invoice.model.InvoiceStatus
import uz.aquabill.app.v1.invoice.repository.InvoiceRepository
import uz.aquabill.app.v1.order.service.OrderService
import uz.aquabill.app.v1.payment.dto.*
import uz.aquabill.app.v1.payment.exception.PaymentNotFoundException
import uz.aquabill.app.v1.payment.mapper.PaymentMapper
import uz.aquabill.app.v1.payment.model.Payment
import uz.aquabill.app.v1.payment.model.PaymentMethod
import uz.aquabill.app.v1.order.model.PaymentStatus as OrderPaymentStatus
import uz.aquabill.app.v1.payment.model.PaymentStatus
import uz.aquabill.app.v1.payment.repository.PaymentRepository
import uz.aquabill.app.v1.user.model.User
import java.math.BigDecimal
import java.time.Instant
import java.time.LocalDateTime

@Service
class PaymentService(
    private val paymentRepository: PaymentRepository,
    private val invoiceRepository: InvoiceRepository,
    private val paymentMapper: PaymentMapper
) {

    @Transactional(readOnly = true)
    fun getPaymentById(id: Long): PaymentDto {
        val payment = paymentRepository.findByIdAndIsDeletedFalse(id)
            ?: throw PaymentNotFoundException("Payment with id $id not found")
        return paymentMapper.toDto(payment)
    }

    fun registerPayment(invoiceId: Long, amount: BigDecimal, method: PaymentMethod): Payment {
        var invoice = invoiceRepository.findById(invoiceId)
            .orElseThrow { NoSuchElementException("Invoice not found") }

        val payment = Payment().apply {
            invoice = invoice
            amount = amount
            paymentMethod = method
            paymentDate = Instant.now()
            status = PaymentStatus.CONFIRMED
        }

        val saved = paymentRepository.save(payment)
        updateInvoiceStatus(invoice)
        return saved
    }

    private fun updateInvoiceStatus(invoice: Invoice) {
        val totalPaid = paymentRepository.findAllByInvoice(invoice).sumOf { it.amount }
        invoice.status = when {
            totalPaid >= invoice.totalAmount -> InvoiceStatus.PAID
            totalPaid > BigDecimal.ZERO -> InvoiceStatus.PARTIAL
            else -> invoice.status
        }
        invoiceRepository.save(invoice)
    }
//
//    @Transactional(readOnly = true)
//    fun getPaymentsByOrderId(orderId: Long): List<PaymentDto> {
//        return paymentRepository.findByOrderIdAndIsDeletedFalse(orderId)
//            .map { paymentMapper.toDto(it) }
//    }

    @Transactional(readOnly = true)
    fun searchPayments(
        orderId: Long?,
        status: PaymentStatus?,
        startDate: LocalDateTime?,
        endDate: LocalDateTime?,
        pageable: Pageable
    ): Page<PaymentDto> {
        return paymentRepository.searchPayments(
            orderId = orderId,
            status = status,
            startDate = startDate,
            endDate = endDate,
            pageable = pageable
        ).map { paymentMapper.toDto(it) }
    }

//    @Transactional
//    fun createPayment(request: CreatePaymentRequest, createdBy: User): PaymentDto {
//        val order = orderService.getOrderById(request.orderId)
//            ?: throw IllegalArgumentException("Order with id ${request.orderId} not found")
//
//        // Validate payment amount doesn't exceed order balance
//        val totalPaid = paymentRepository.findByOrderIdAndIsDeletedFalse(order?.id)
//            .sumOf { it.amount }
//
//        if (totalPaid + request.amount > order.totalAmount) {
//            throw IllegalArgumentException("Payment amount exceeds order balance")
//        }
//
//        val payment = paymentMapper.toEntity(request, order, createdBy)
//        val savedPayment = paymentRepository.save(payment)
//
//        // Update order payment status if fully paid
//        if (totalPaid + request.amount >= order.totalAmount) {
//            orderService.updatePaymentStatus(order.id, OrderPaymentStatus.PAID, "Payment completed")
//        }
//
//        return paymentMapper.toDto(savedPayment)
//    }

    @Transactional
    fun updatePayment(id: Long, request: UpdatePaymentRequest): PaymentDto {
        val payment = paymentRepository.findByIdAndIsDeletedFalse(id)
            ?: throw PaymentNotFoundException("Payment with id $id not found")
            
        request.amount?.let { payment.amount = it }
        request.paymentMethod?.let { payment.paymentMethod = it }
        request.status?.let { payment.status = it }
        request.notes?.let { payment.notes = it }
        request.transactionId?.let { payment.transactionId = it }
        
        val updatedPayment = paymentRepository.save(payment)
        return paymentMapper.toDto(updatedPayment)
    }

    @Transactional
    fun deletePayment(id: Long) {
        val payment = paymentRepository.findByIdAndIsDeletedFalse(id)
            ?: throw PaymentNotFoundException("Payment with id $id not found")
            
        payment.isDeleted = true
        paymentRepository.save(payment)
    }
    
//    @Transactional(readOnly = true)
//    fun getTotalPaymentsByOrderId(orderId: Long): Double {
//        return paymentRepository.findByOrderIdAndIsDeletedFalse(orderId)
//            .sumOf { it.amount.toDouble() }
//    }
    
//    @Transactional
//    fun refundPayment(paymentId: Long, notes: String? = null): PaymentDto {
//        val payment = paymentRepository.findByIdAndIsDeletedFalse(paymentId)
//            ?: throw PaymentNotFoundException("Payment with id $paymentId not found")
//
//        if (payment.status != PaymentStatus.COMPLETED) {
//            throw IllegalStateException("Only completed payments can be refunded")
//        }
//
//        // Create a refund payment record
//        val refundPayment = Payment(
//            order = payment.order,
//            amount = payment.amount.negate(),
//            paymentMethod = payment.paymentMethod,
//            status = PaymentStatus.REFUNDED,
//            notes = notes ?: "Refund for payment #${payment.id}",
//            transactionId = "REFUND_${payment.transactionId ?: System.currentTimeMillis()}",
//            createdBy = payment.createdBy
//        )
//
//        val savedRefund = paymentRepository.save(refundPayment)
//        return paymentMapper.toDto(savedRefund)
//    }
}
