package uz.aquabill.app.modules.v1.meter.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import uz.aquabill.app.modules.v1.customer.model.Customer
import uz.aquabill.app.modules.v1.meter.model.Meter
import uz.aquabill.app.modules.v1.meterreading.model.MeterReading
import java.time.LocalDate


@Repository
interface MeterRepository : JpaRepository<Meter, Long> {
    fun findBySerialNumber(serialNumber: String): Meter?
    fun findAllByCustomer(customer: Customer): List<Meter>
//    fun findTopByMeterOrderByReadingDateDesc(meter: Meter): MeterReading?
//    fun findAllByMeterAndReadingDateBetween(meter: Meter, start: LocalDate, end: LocalDate): List<MeterReading>
//    fun findByMeterOrderByReadingDateDesc(meter: Meter): List<MeterReading>
}
