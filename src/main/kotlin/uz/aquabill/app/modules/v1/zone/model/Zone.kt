package uz.aquabill.app.modules.v1.zone.model

import jakarta.persistence.*
import uz.aquabill.app.common.BaseEntity
import java.time.Instant

@Entity
@Table(name = "zones")
 class Zone: BaseEntity() {
    @Column(nullable = false)
    var name: String? = null

    @Column(nullable = false)
    var description: String? = null

}
