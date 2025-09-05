package uz.aquabill.app.v1.auth.dto

import uz.aquabill.app.v1.user.model.Role
import uz.aquabill.app.v1.user.model.User

data class UserInfoDto(
    val id: Long,
    val username: String,
    val email: String,
    val firstName: String?,
    val lastName: String?,
    val roles: Set<RoleDto> = emptySet(),
    val permissions: Set<String> = emptySet()
) {
    companion object {
        fun fromUser(user: User): UserInfoDto {
            val roleDtos = user.roles.map { role -> 
                RoleDto(role.id, role.name, role.permissions.map { it.name }.toSet())
            }.toSet()
            
            // Flatten all permissions from all roles
            val allPermissions = user.roles.flatMap { it.permissions.map { perm -> perm.name } }.toSet()
            
            return UserInfoDto(
                id = user.id!!,
                username = user.username,
                email = user.email,
                firstName = user.firstName,
                lastName = user.lastName,
                roles = roleDtos,
                permissions = allPermissions
            )
        }
    }
}

data class RoleDto(
    val id: Long?,
    val name: String,
    val permissions: Set<String>
)
