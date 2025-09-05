package uz.aquabill.app.v1.warehouse.model

import jakarta.persistence.*
import uz.aquabill.app.common.BaseEntity
import java.io.Serializable

@Entity
@Table(name = "warehouses")
class Warehouse : BaseEntity() {

    @Column(nullable = false, unique = true)
    lateinit var name: String

    @Column(nullable = false)
    var isActive: Boolean = true

    @Column(name = "is_default")
    var isDefault: Boolean = false

}
