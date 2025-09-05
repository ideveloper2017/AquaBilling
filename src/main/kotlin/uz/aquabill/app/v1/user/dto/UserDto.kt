package uz.aquabill.app.v1.user.dto
import uz.aquabill.app.v1.user.model.User

data class UserDto(
    val id: Long? = null,
    val username: String,
    val password: String,
    val phone: String,
    val email: String,
    val firstName: String? = null,
    val lastName: String? = null,
    val active: Boolean = true,
    val roleIds: List<Long> = emptyList()
) {
    companion object {
        fun fromUser(user: User?): UserDto? {
            return user?.let {
                UserDto(
                    id = it.id,
                    username = it.username,
                    password = it.password,
                    phone = it.phone,
                    email = it.email,
                    firstName = it.firstName,
                    lastName = it.lastName,
                    active = it.active,
                    roleIds = it.roles.mapNotNull { role -> role.id }
                )
            }
        }
    }
}