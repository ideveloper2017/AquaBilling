package uz.aquabill.app.modules.v1.users.services.impl

import jakarta.persistence.EntityNotFoundException
import org.springframework.stereotype.Service
import jakarta.transaction.Transactional
import org.springframework.security.core.context.SecurityContextHolder
import uz.aquabill.app.modules.v1.users.domain.User
import uz.aquabill.app.modules.v1.users.dto.UserDto
import uz.aquabill.app.modules.v1.users.repository.RoleRepository
import uz.aquabill.app.modules.v1.users.repository.UserRepository
import uz.aquabill.app.modules.v1.users.services.UserService
import kotlin.to


@Service
class UserServiceImpl(
    private val userRepository: UserRepository,
    private val roleRepository: RoleRepository
) : UserService {

    override fun getAllUsers(): List<UserDto> {
        return userRepository.findAll().mapNotNull { UserDto.fromUser(it) }
    }

    override fun getUserById(id: Long): UserDto {
        val user = userRepository.findById(id)
            .orElseThrow { EntityNotFoundException("User not found with id: $id") }
        return UserDto.fromUser(user) ?: throw IllegalStateException("Failed to convert user to DTO")
    }

    override fun findUserByUsername(username: String): User? {
        return userRepository.findByLogin(username).orElse(null)
    }

    override fun createUser(user: User): User {
        return userRepository.save(user)
    }

    override fun updateUser(user: User): User {
        return userRepository.save(user)
    }

      override fun assignRoleToUser(userId: Long, roleName: String) {
        val user = userRepository.findById(userId).orElseThrow {
            RuntimeException("User not found")
        }
        val role = roleRepository.findByName(roleName).orElseThrow {
            RuntimeException("Role not found")
        }

        user.roles.add(role)
        userRepository.save(user)
    }

    override fun  removeRoleFromUser(userId: Long, roleName: String) {
        val user = userRepository.findById(userId).orElseThrow {
            RuntimeException("User not found")
        }
        val role = roleRepository.findByName(roleName).orElseThrow {
            RuntimeException("Role not found")
        }

        user.roles.remove(role)
        userRepository.save(user)
    }

    override fun getUserReports(userId: Long): List<String> {
        // This would return reports for the user
        return listOf("Report 1", "Report 2", "Report 3")
    }

    override fun getUserProfile(targetUser: User): Map<String, Any> {
        return mapOf(
            "username" to targetUser.login,
            "email" to targetUser.email,
            "firstName" to targetUser.firstName,
            "lastName" to targetUser.lastName,
            "roles" to targetUser.roles.map { it.name }
        ) as Map<String, Any>
    }

    override  fun getCurrentUser(): User? {
        val authentication = SecurityContextHolder.getContext().authentication
        if (authentication != null && authentication.isAuthenticated) {
            return when (authentication.principal) {
                is User -> authentication.principal as User
                is User -> {
                    val username = authentication.name
                    userRepository.findByLogin(username).orElse(null)
                }
                else -> null
            }
        }
        return null
    }

    override fun isManagerOfUser(userId: Long): Boolean {
        val currentUser = getCurrentUser()
        return currentUser?.roles?.any { it.name == "MANAGER" } == true
    }

    fun isCurrentUser(username: String): Boolean {
        val currentUser = getCurrentUser()
        return currentUser?.login == username
    }

    @Transactional
    override fun createUser(userDto: UserDto): UserDto {
        if (userRepository.existsByLogin(userDto.username)) {
            throw IllegalArgumentException("Username ${userDto.username} already exists")
        }
        if (userRepository.existsByEmail(userDto.email)) {
            throw IllegalArgumentException("Email ${userDto.email} already exists")
        }

        val user = User().apply {
            login = userDto.username
            phone = userDto.phone
            email = userDto.email
            firstName = userDto.firstName
            lastName = userDto.lastName
            enabled = userDto.active
            passwords = "changeMe" // This should be encoded in a real application
        }

        if (userDto.roleIds.isNotEmpty()) {
            val roles = roleRepository.findAllById(userDto.roleIds).toMutableSet()
            user.roles = roles
        }

        val savedUser = userRepository.save(user)
        return UserDto.fromUser(savedUser) ?: throw IllegalStateException("Failed to convert saved user to DTO")
    }

    @Transactional
    override fun updateUser(id: Long, userDto: UserDto): UserDto {
        val existingUser = userRepository.findById(id)
            .orElseThrow { EntityNotFoundException("User not found with id: $id") }

        // Check if username is being changed and if it's already taken
        if (existingUser.username != userDto.username && userRepository.existsByLogin(userDto.username)) {
            throw IllegalArgumentException("Username ${userDto.username} already exists")
        }

        // Check if email is being changed and if it's already taken
        if (existingUser.email != userDto.email && userRepository.existsByEmail(userDto.email)) {
            throw IllegalArgumentException("Email ${userDto.email} already exists")
        }

        // Update user properties
        existingUser.login = userDto.username
        existingUser.phone = userDto.phone
        existingUser.email = userDto.email
        existingUser.firstName = userDto.firstName
        existingUser.lastName = userDto.lastName
        existingUser.enabled = userDto.active

        if (userDto.roleIds.isNotEmpty()) {
            val roles = roleRepository.findAllById(userDto.roleIds).toMutableSet()
            existingUser.roles = roles
        }

        val updatedUser = userRepository.save(existingUser)
        return UserDto.fromUser(updatedUser) ?: throw IllegalStateException("Failed to convert updated user to DTO")
    }



    @Transactional
    override fun deleteUser(id: Long) {
        if (!userRepository.existsById(id)) {
            throw EntityNotFoundException("User not found with id: $id")
        }
        userRepository.deleteById(id)
    }

    @Transactional
    override fun assignRolesToUser(userId: Long, roleIds: List<Long>): UserDto {
        val user = userRepository.findById(userId)
            .orElseThrow { EntityNotFoundException("User not found with id: $userId") }

        val roles = roleRepository.findAllById(roleIds).toMutableSet()
        user.roles = roles

        val updatedUser = userRepository.save(user)
        return UserDto.fromUser(updatedUser) ?: throw IllegalStateException("Failed to convert user with assigned roles to DTO")
    }

    @Transactional
    override fun removeRolesFromUser(
        userId: Long,
        roleIds: List<Long>
    ): UserDto {
        // Get user or throw exception if not found
        val user = userRepository.findById(userId)
            .orElseThrow { EntityNotFoundException("User not found with id: $userId") }

        // Get roles to remove
        val rolesToRemove = roleRepository.findAllById(roleIds).toSet()
        
        // Update user's roles
        user.roles = user.roles?.filter { role -> !rolesToRemove.contains(role) }
            ?.toMutableSet()
            ?: mutableSetOf()

        // Save updated user
        val updatedUser = userRepository.save(user)
        
        // Convert to DTO
        return UserDto.fromUser(updatedUser) ?: throw IllegalStateException("Failed to convert user to DTO")
    }

}