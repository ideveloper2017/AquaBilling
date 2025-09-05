package uz.aquabill.app.v1.user.service.impl

import jakarta.persistence.EntityNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import uz.aquabill.app.v1.user.RoleDto
import uz.aquabill.app.v1.user.dto.RolePermissionDto
import uz.aquabill.app.v1.user.model.Role
import uz.aquabill.app.v1.user.repository.PermissionRepository
import uz.aquabill.app.v1.user.repository.RoleRepository
import uz.aquabill.app.v1.user.service.RoleService

@Service
class RoleServiceImpl(
    private val roleRepository: RoleRepository,
    private val permissionRepository: PermissionRepository
) : RoleService(roleRepository, permissionRepository) {

    override fun getAllRoles(): List<Role> {
        return roleRepository.findAll()
    }

    override fun getRoleById(id: Long): Role? {
        return roleRepository.findById(id).orElse(null)
    }

    @Transactional
    override fun saveRole(roleDto: RoleDto): Role {
        // Check if name already exists for new roles
        if (roleDto.id == null && roleRepository.findByName(roleDto.name) != null) {
            throw IllegalArgumentException("Role with name ${roleDto.name} already exists")
        }

        // Create new role or get existing one
        val role = if (roleDto.id != null) {
            roleRepository.findById(roleDto.id).orElseThrow {
                RuntimeException("Role not found with id: ${roleDto.id}")
            }
        } else {
            Role(name = roleDto.name)
        }

        // Check if name is being changed and if it's already taken
        if (roleDto.id != null && role.name != roleDto.name && roleRepository.findByName(roleDto.name) != null) {
            throw IllegalArgumentException("Role with name ${roleDto.name} already exists")
        }

        // Update role properties
        role.name = roleDto.name

        // Update permissions
        if (roleDto.permissionIds.isNotEmpty()) {
            val permissions = permissionRepository.findAllById(roleDto.permissionIds).toMutableSet()
            role.permissions = permissions
        }

        return roleRepository.save(role)
    }

    @Transactional
    override fun deleteRole(id: Long): Boolean {
        return if (roleRepository.existsById(id)) {
            roleRepository.deleteById(id)
            true
        } else {
            false
        }
    }

}
