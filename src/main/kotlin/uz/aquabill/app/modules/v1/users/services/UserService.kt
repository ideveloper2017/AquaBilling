package uz.aquabill.app.modules.v1.users.services

import uz.aquabill.app.modules.v1.users.domain.User
import uz.aquabill.app.modules.v1.users.dto.UserDto


interface UserService {
    fun findUserByUsername(username: String): User?

    fun createUser(user: User): User

    fun updateUser(user: User): User

        fun assignRoleToUser(userId: Long, roleName: String)
    fun removeRoleFromUser(userId: Long, roleName: String)
    fun getUserReports(userId: Long): List<String>
    fun getUserProfile(targetUser: User): Map<String, Any>
     fun getCurrentUser(): User?
    fun isManagerOfUser(userId: Long): Boolean
    fun getAllUsers(): List<UserDto>
    fun getUserById(id: Long): UserDto
    fun createUser(userDto: UserDto): UserDto
    fun updateUser(id: Long, userDto: UserDto): UserDto
    fun deleteUser(id: Long)
    fun assignRolesToUser(userId: Long, roleIds: List<Long>): UserDto
    fun removeRolesFromUser(userId: Long, roleIds: List<Long>): UserDto
}
