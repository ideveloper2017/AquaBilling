// src/main/kotlin/uz/aquabill/app/modules/v1/meterreading/service/MeterReadingService.kt
package uz.aquabill.app.modules.v1.meterreading.service

import jakarta.persistence.EntityNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import uz.aquabill.app.modules.v1.meter.repository.MeterRepository
import uz.aquabill.app.modules.v1.meterreading.dto.MeterReadingRequest
import uz.aquabill.app.modules.v1.meterreading.dto.MeterReadingResponse

import uz.aquabill.app.modules.v1.meterreading.model.MeterReading
import uz.aquabill.app.modules.v1.meterreading.model.ReadingSource
import uz.aquabill.app.modules.v1.meterreading.repository.MeterReadingRepository
import java.time.Instant
import java.time.LocalDate

@Service
class MeterReadingService(
    private val meterReadingRepository: MeterReadingRepository,
    private val meterRepository: MeterRepository
) {
    @Transactional
    fun saveMeterReading(request: MeterReadingRequest): MeterReadingResponse {
        val meter = meterRepository.findById(request.meterId)
            .orElseThrow { EntityNotFoundException("Meter not found with id: ${request.meterId}") }

        val previousReading = meterReadingRepository.findTopByMeterOrderByReadingDateDesc(meter)
        val newReading = MeterReading(
            meter = meter,
            readingDate = request.readingDate,
            readingValue = request.readingValue,
            readerId = request.readerId,
            source = ReadingSource.MANUAL
        )

        val savedReading = meterReadingRepository.save(newReading)
        
        return MeterReadingResponse(
            id = savedReading.id,
            meterId = savedReading.meter.id,
            readingValue = savedReading.readingValue,
            readingDate = savedReading.readingDate,
            previousReading = previousReading?.readingValue,
            consumption = previousReading?.let { savedReading.readingValue - it.readingValue },
            readerId = savedReading.readerId,
            createdAt = savedReading.createdAt.toString()
        )
    }

    fun getMeterReadings(meterId: Long, startDate: LocalDate?, endDate: LocalDate?): List<MeterReadingResponse> {
        val meter = meterRepository.findById(meterId)
            .orElseThrow { EntityNotFoundException("Meter not found with id: $meterId") }

        val readings = if (startDate != null && endDate != null) {
            meterReadingRepository.findAllByMeterAndReadingDateBetween(meter, startDate, endDate)
        } else {
            meterReadingRepository.findByMeterOrderByReadingDateDesc(meter)
        }

        return readings.mapIndexed { index, reading ->
            val previousReading = if (index < readings.size - 1) {
                readings[index + 1].readingValue
            } else null

            MeterReadingResponse(
                id = reading.id,
                meterId = reading.meter.id,
                readingValue = reading.readingValue,
                readingDate = reading.readingDate,
                previousReading = previousReading,
                consumption = previousReading?.let { reading.readingValue - it },
                readerId = reading.readerId,
                createdAt = reading.createdAt.toString()
            )
        }
    }
}