// src/main/kotlin/uz/aquabill/app/modules/v1/meterreading/dto/MeterReadingRequest.kt
package uz.aquabill.app.modules.v1.meterreading.dto

import java.math.BigDecimal
import java.time.LocalDate

data class MeterReadingRequest(
    val meterId: Long,
    val readingValue: BigDecimal,
    val readingDate: LocalDate = LocalDate.now(),
    val readerId: Long? = null
)

data class MeterReadingResponse(
    val id: Long,
    val meterId: Long,
    val readingValue: BigDecimal,
    val readingDate: LocalDate,
    val previousReading: BigDecimal?,
    val consumption: BigDecimal?,
    val readerId: Long?,
    val createdAt: String
)