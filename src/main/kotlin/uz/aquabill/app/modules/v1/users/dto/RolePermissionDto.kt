package uz.aquabill.app.modules.v1.users.dto

data class RolePermissionDto(
    val roleId: Long,
    val permissionIds: List<Long>
)
