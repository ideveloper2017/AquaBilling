package uz.aquabill.app.v1.meterreading.model

import jakarta.persistence.*
import uz.aquabill.app.v1.meter.model.Meter
import java.math.BigDecimal
import java.time.Instant
import java.time.LocalDate

@Entity
@Table(name = "meter_readings")
data class MeterReading(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meter_id")
    val meter: Meter,

    val readingDate: LocalDate,
    val readingValue: BigDecimal,

    val readerId: Long? = null,

    @Enumerated(EnumType.STRING)
    val source: ReadingSource = ReadingSource.MANUAL,

    val createdAt: Instant = Instant.now()
)

enum class ReadingSource { MANUAL, IOT, IMPORT }
