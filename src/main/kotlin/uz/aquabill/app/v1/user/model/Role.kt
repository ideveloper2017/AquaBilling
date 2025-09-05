package uz.aquabill.app.v1.user.model

import uz.aquabill.app.common.BaseEntity
import jakarta.persistence.*

@Entity
@Table(name = "roles")
class Role(
    @Column(nullable = false, unique = true)
    var name: String = ""
) : BaseEntity() {

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "role_permissions",
        joinColumns = [JoinColumn(name = "role_id")],
        inverseJoinColumns = [JoinColumn(name = "permission_id")]
    )
    var permissions: MutableSet<Permission> = mutableSetOf()
}