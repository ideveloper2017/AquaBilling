package uz.aquabill.app.v1.invoice.service

import org.springframework.stereotype.Service
import uz.aquabill.app.v1.customer.model.Customer
import uz.aquabill.app.v1.invoice.model.Invoice
import uz.aquabill.app.v1.invoice.repository.InvoiceRepository
import uz.aquabill.app.v1.meterreading.repository.MeterReadingRepository
import uz.aquabill.app.v1.tarrif.model.Tariff
import uz.aquabill.app.v1.tarrif.repository.TariffRepository
import java.math.BigDecimal
import java.time.LocalDate
import kotlin.collections.firstOrNull

@Service
class InvoiceService(
    private val meterReadingRepository: MeterReadingRepository,
    private val invoiceRepository: InvoiceRepository,
    private val tariffRepository: TariffRepository
) {
    fun generateInvoice(customer: Customer, periodStart: LocalDate, periodEnd: LocalDate): Invoice {
        val latestMeter = customer.id.let { meterReadingRepository.findAll().firstOrNull { it.meter.customer == it } }
            ?: throw IllegalStateException("No meter reading found for this customer")

        val readings = meterReadingRepository.findAllByMeterAndReadingDateBetween(latestMeter.meter, periodStart, periodEnd)
        if (readings.isEmpty()) throw IllegalStateException("No readings found for the given period")

        val startValue = readings.minByOrNull { it.readingDate }!!.readingValue
        val endValue = readings.maxByOrNull { it.readingDate }!!.readingValue
        val consumption = endValue.subtract(startValue)
        val tariff = tariffRepository.findAll().firstOrNull() ?: throw IllegalStateException("No tariff defined")
        val totalAmount = calculateAmount(tariff, consumption)
        val invoice = Invoice(
            invoiceNumber = "INV-" + System.currentTimeMillis(),
            customer = customer,
            periodStart = periodStart,
            periodEnd = periodEnd,
            issueDate = LocalDate.now(),
            dueDate = LocalDate.now().plusDays(10),
            totalAmount = totalAmount
        )
        return invoiceRepository.save(invoice)
    }

    private fun calculateAmount(tariff: Tariff, consumption: BigDecimal): BigDecimal {
//        if (tariff.type == TariffType.FLAT) {
//            val flatPrice = tariff.slabs.firstOrNull()?.pricePerM3 ?: BigDecimal.ZERO
//            return flatPrice.multiply(consumption)
//        }
        // progressive slab logic
        var total = BigDecimal.ZERO
        var remaining = consumption
//        tariff.slabs.sortedBy { it.fromM3 }.forEach { slab ->
//            val upper = slab.toM3 ?: remaining
//            val diff = upper.min(remaining)
//            total = total.add(diff.multiply(slab.pricePerM3))
//            remaining = remaining.subtract(diff)
//            if (remaining <= BigDecimal.ZERO) return@forEach
//        }
        return total
    }
}
