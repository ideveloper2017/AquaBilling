package uz.aquabill.app.v1.payment.mapper

import org.springframework.stereotype.Component
import uz.aquabill.app.v1.invoice.model.Invoice

import uz.aquabill.app.v1.payment.dto.*
import uz.aquabill.app.v1.payment.model.Payment
import uz.aquabill.app.v1.payment.model.PaymentStatus
import uz.aquabill.app.v1.user.model.User

@Component
class PaymentMapper {
    
    fun toDto(payment: Payment): PaymentDto {
        return PaymentDto(
            id = payment.id,
            invoiceId = payment.invoice.id.let { it ?: throw IllegalArgumentException("Order ID cannot be null") },
            amount = payment.amount,
            paymentMethod = payment.paymentMethod,
            status = payment.status,
            transactionId = payment.transactionId,
            notes = payment.notes,
            createdAt = payment.createdAt,
            updatedAt = payment.updatedAt
        )
    }
    
    fun toEntity(
        request: CreatePaymentRequest,
        invoice: Invoice,
        createdBy: User? = null
    ): Payment {
        return Payment().apply {
            this.invoice = invoice
            this.amount = request.amount
            this.paymentMethod = request.paymentMethod
            this.status = PaymentStatus.PENDING
            this.notes = request.notes
            this.transactionId = request.transactionId
            this.createdBy = createdBy
        }
    }
    
    fun updateFromRequest(
        payment: Payment,
        request: UpdatePaymentRequest
    ): Payment {
        request.amount?.let { payment.amount = it }
        request.paymentMethod?.let { payment.paymentMethod = it }
        request.status?.let { payment.status = it }
        request.notes?.let { payment.notes = it }
        request.transactionId?.let { payment.transactionId = it }
        return payment
    }
}
