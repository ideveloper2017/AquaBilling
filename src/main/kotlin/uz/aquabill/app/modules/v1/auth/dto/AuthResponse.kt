package uz.aquabill.app.modules.v1.auth.dto

import uz.aquabill.app.modules.v1.users.dto.PermissionDto
import uz.aquabill.app.modules.v1.users.dto.RoleDto

data class AuthResponse(
    val token: String,
    val type: String = "Bearer",
    val id: Long?,
    val username: String,
    val email: String,
    val roles: List<RoleDto>,
    val permissions: List<PermissionDto>
)