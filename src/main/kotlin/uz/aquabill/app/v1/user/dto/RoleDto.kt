package uz.aquabill.app.v1.user
import uz.aquabill.app.v1.user.model.Role
import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Role data transfer object")
data class RoleDto(
    @Schema(description = "Role ID", example = "1", required = false)
    val id: Long? = null,

    @Schema(description = "Role name", example = "MANAGER", required = true)
    val name: String,

    @Schema(description = "List of permission IDs associated with this role", required = false)
    val permissionIds: Set<Long> = emptySet()
) {
    companion object {
        fun fromEntity(role: Role): RoleDto = RoleDto(
            id = role.id,
            name = role.name,
            permissionIds = role.permissions.map { it.id!! }.toSet()
        )
    }
}
