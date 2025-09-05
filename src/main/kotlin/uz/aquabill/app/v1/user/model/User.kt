package uz.aquabill.app.v1.user.model

import uz.aquabill.app.common.BaseEntity
import jakarta.persistence.*
import java.io.Serializable

@Entity
@Table(name = "users")
class User : BaseEntity(), Serializable {

    companion object {
        private const val serialVersionUID = 1L
    }
    @Column(unique = true, nullable = false)
    var username: String = ""

    @Column(unique = true, nullable = false)
    var phone: String = ""

    @Column(nullable = false)
    var password: String = ""

    @Column(unique = true, nullable = false)
    var email: String = ""

    @Column(name = "first_name")
    var firstName: String? = null

    @Column(name = "last_name")
    var lastName: String? = null

    @Column(nullable = false)
    var active: Boolean = true

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = [JoinColumn(name = "user_id")],
        inverseJoinColumns = [JoinColumn(name = "role_id")]
    )
    var roles: MutableSet<Role> = mutableSetOf()

    fun getFullName(): String {
        return listOfNotNull(firstName, lastName).joinToString(" ").ifEmpty { username }
    }
}