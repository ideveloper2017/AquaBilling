package uz.aquabill.app.modules.v1.meter.model

import jakarta.persistence.*
import uz.aquabill.app.modules.v1.customer.model.Customer

import java.time.Instant
import java.time.LocalDate

@Entity
@Table(name = "meters")
data class Meter(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    val customer: Customer,

    @Column(unique = true, nullable = false)
    val serialNumber: String,

    val installationDate: LocalDate,

    @Enumerated(EnumType.STRING)
    val meterType: MeterType = MeterType.ANALOG,

    @Enumerated(EnumType.STRING)
    val status: MeterStatus = MeterStatus.ACTIVE,

    val createdAt: Instant = Instant.now()
)

enum class MeterType { ANALOG, DIGITAL }
enum class MeterStatus { ACTIVE, INACTIVE, REPLACED }
