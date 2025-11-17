package uz.aquabill.app.modules.v1.tariffSlab.model

import jakarta.persistence.*
import uz.aquabill.app.modules.v1.tarrif.model.Tariff
import java.math.BigDecimal

@Entity
@Table(name = "tariff_slabs")
data class TariffSlab(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tariff_id")
    val tariff: Tariff,

    val fromM3: BigDecimal,
    val toM3: BigDecimal? = null,
    val pricePerM3: BigDecimal
)