package uz.aquabill.app.v1.user.model

import uz.aquabill.app.common.BaseEntity
import jakarta.persistence.*

@Entity
@Table(name = "permissions")
class Permission(
    @Column(nullable = false, unique = true)
    var name: String = ""
) : BaseEntity() {

    @ManyToMany(mappedBy = "permissions")
    var roles: MutableSet<Role> = mutableSetOf()
}