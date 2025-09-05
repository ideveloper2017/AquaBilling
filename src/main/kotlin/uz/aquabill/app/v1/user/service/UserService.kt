package uz.aquabill.app.v1.user.service


import uz.aquabill.app.v1.user.dto.UserDto

interface UserService {
    fun getAllUsers(): List<UserDto>
    fun getUserById(id: Long): UserDto
    fun createUser(userDto: UserDto): UserDto
    fun updateUser(id: Long, userDto: UserDto): UserDto
    fun deleteUser(id: Long)
    fun assignRolesToUser(userId: Long, roleIds: List<Long>): UserDto
    fun removeRolesFromUser(userId: Long, roleIds: List<Long>): UserDto
}
