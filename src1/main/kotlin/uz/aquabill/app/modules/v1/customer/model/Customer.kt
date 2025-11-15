package uz.aquabill.app.modules.v1.customer.model

import jakarta.persistence.*
import uz.aquabill.app.common.BaseEntity
import uz.aquabill.app.modules.v1.zone.model.Zone


@Entity
@Table(name = "customers")
class Customer : BaseEntity() {

    @Column(nullable = false)
    var first_name: String? = null

    @Column(nullable = false)
    var last_name: String? = null

    @Column(nullable = false)
    var sur_name: String? = null

    @Column(nullable = false)
    var phone: String? = null

    @Column(nullable = false)
    var address: String? = null

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "zone_id")
    val zone: Zone? = null


    // Helper function to get full name
    fun getFullName(): String {
        return listOfNotNull(first_name, last_name,sur_name).joinToString(" ")
    }
}
