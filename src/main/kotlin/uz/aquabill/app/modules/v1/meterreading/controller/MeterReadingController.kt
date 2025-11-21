// src/main/kotlin/uz/aquabill/app/modules/v1/meterreading/controller/MeterReadingController.kt
package uz.aquabill.app.modules.v1.meterreading.controller

import jakarta.validation.Valid
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import uz.aquabill.app.modules.v1.meterreading.dto.MeterReadingRequest
import uz.aquabill.app.modules.v1.meterreading.service.MeterReadingService
import java.time.LocalDate

@RestController
@RequestMapping("/api/v1/meter-readings")
class MeterReadingController(
    private val meterReadingService: MeterReadingService
) {
    @PostMapping
    fun saveMeterReading(@Valid @RequestBody request: MeterReadingRequest) =
        ResponseEntity(meterReadingService.saveMeterReading(request), HttpStatus.CREATED)

    @GetMapping("/meter/{meterId}")
    fun getMeterReadings(
        @PathVariable meterId: Long,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) startDate: LocalDate?,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) endDate: LocalDate?
    ) = ResponseEntity.ok(meterReadingService.getMeterReadings(meterId, startDate, endDate))
}