package uz.aquabill.app.v1.tarrif.model

import jakarta.persistence.*
import uz.aquabill.app.v1.tariffslab.model.TariffSlab
import java.time.Instant
import java.time.LocalDate

@Entity
@Table(name = "tariffs")
data class Tariff(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val name: String,

    @Enumerated(EnumType.STRING)
    val type: TariffType = TariffType.FLAT,

    val effectiveFrom: LocalDate,
    val description: String? = null,

    val createdAt: Instant = Instant.now(),

    @OneToMany(mappedBy = "tariff", cascade = [CascadeType.ALL], orphanRemoval = true)
    val slabs: MutableList<TariffSlab> = mutableListOf()
)

enum class TariffType { FLAT, PROGRESSIVE }
