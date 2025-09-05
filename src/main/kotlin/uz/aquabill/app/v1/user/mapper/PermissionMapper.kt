package uz.aquabill.app.v1.user.mapper

import uz.aquabill.app.v1.user.dto.PermissionDto
import uz.aquabill.app.v1.user.model.Permission

object PermissionMapper {
    fun toDto(permission: Permission): PermissionDto {
        return PermissionDto(
            id = permission.id,
            name = permission.name,
            // Add other fields as needed
        )
    }

    // Optionally add fromDto method if needed
    // fun fromDto(dto: PermissionDto): Permission { ... }
}