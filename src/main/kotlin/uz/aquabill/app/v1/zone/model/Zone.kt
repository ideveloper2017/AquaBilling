package uz.aquabill.app.v1.zone.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "zones")
data class Zone(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val name: String,

    val description: String? = null,

    val createdAt: Instant = Instant.now()
)
