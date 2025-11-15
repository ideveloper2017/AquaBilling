package uz.aquabill.app.modules.v1.meterreading.repository


import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import uz.aquabill.app.modules.v1.meter.model.Meter
import uz.aquabill.app.modules.v1.meterreading.model.MeterReading

import java.time.LocalDate

@Repository
interface MeterReadingRepository : JpaRepository<MeterReading, Long> {
    fun findTopByMeterOrderByReadingDateDesc(meter: Meter): MeterReading?
    fun findAllByMeterAndReadingDateBetween(meter: Meter, start: LocalDate, end: LocalDate): List<MeterReading>
}
