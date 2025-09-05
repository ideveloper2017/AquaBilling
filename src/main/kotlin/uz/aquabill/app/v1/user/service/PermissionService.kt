package uz.aquabill.app.v1.user.service


import org.springframework.stereotype.Service
import uz.aquabill.app.v1.user.dto.PermissionDto
@Service
interface PermissionService {
    fun getAllPermissions(): List<PermissionDto>
    fun getPermissionById(id: Long): PermissionDto
    fun createPermission(permissionDto: PermissionDto): PermissionDto
    fun updatePermission(id: Long, permissionDto: PermissionDto): PermissionDto
    fun deletePermission(id: Long)
}


