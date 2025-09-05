package uz.aquabill.app.v1.user.dto
import uz.aquabill.app.v1.user.model.Permission
import io.swagger.v3.oas.annotations.media.Schema

@Schema(description = "Permission data transfer object")
data class PermissionDto(
    @field:Schema(description = "Permission ID", example = "1")
    val id: Long? = null,

    @field:Schema(description = "Permission name", example = "USER_MANAGE", required = true)
    val name: String,

    @field:Schema(description = "List of role IDs associated with this permission")
    val roleIds: List<Long> = emptyList()
) {
    companion object {
        fun fromPermission(permission: Permission): PermissionDto {
            return PermissionDto(
                id = permission.id,
                name = permission.name,
                roleIds = permission.roles.mapNotNull { it.id }
            )
        }
    }
}