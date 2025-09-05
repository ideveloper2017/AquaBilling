package uz.aquabill.app.v1.user.controller

import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.tags.Tag
import io.swagger.v3.oas.annotations.responses.ApiResponse as SwaggerApiResponse
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import uz.aquabill.app.common.ApiResponse
import uz.aquabill.app.v1.user.dto.UserDto
import uz.aquabill.app.v1.user.service.UserService

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "User Management", description = "Endpoints for managing users")
class UserController(private val userService: UserService) {

    @GetMapping
    @Operation(
        summary = "Get all users",
        description = "Returns a list of all users in the system",
        responses = [
            SwaggerApiResponse(
                responseCode = "200",
                description = "Successfully retrieved users",
                content = [Content(schema = Schema(implementation = ApiResponse::class))]
            ),
            SwaggerApiResponse(
                responseCode = "403",
                description = "Access denied"
            )
        ]
    )
    @PreAuthorize("hasAuthority('USER_VIEW')")
    fun getAllUsers(): ResponseEntity<ApiResponse<List<UserDto>>> {
        val users = userService.getAllUsers()
        return ResponseEntity.ok(ApiResponse.success(users))
    }

    @GetMapping("/{id}")
    @Operation(
        summary = "Get user by ID",
        description = "Returns details of a specific user",
        responses = [
            SwaggerApiResponse(
                responseCode = "200",
                description = "Successfully retrieved user",
                content = [Content(schema = Schema(implementation = ApiResponse::class))]
            ),
            SwaggerApiResponse(
                responseCode = "404",
                description = "User not found"
            ),
            SwaggerApiResponse(
                responseCode = "403",
                description = "Access denied"
            )
        ]
    )
    @PreAuthorize("hasAuthority('USER_VIEW')")
    fun getUserById(
        @Parameter(description = "ID of the user to retrieve")
        @PathVariable id: Long
    ): ResponseEntity<ApiResponse<UserDto>> {
        val user = userService.getUserById(id)
        return if (user != null) {
            ResponseEntity.ok(ApiResponse.success(user))
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("User not found"))
        }
    }

    @PostMapping
    @Operation(
        summary = "Create new user",
        description = "Creates a new user with the provided details",
        responses = [
            SwaggerApiResponse(
                responseCode = "201",
                description = "User created successfully",
                content = [Content(schema = Schema(implementation = ApiResponse::class))]
            ),
            SwaggerApiResponse(
                responseCode = "400",
                description = "Invalid input or username/email already exists"
            ),
            SwaggerApiResponse(
                responseCode = "403",
                description = "Access denied"
            )
        ]
    )
    @PreAuthorize("hasAuthority('USER_CREATE')")
    fun createUser(
        @Parameter(description = "User details to create")
        @Valid @RequestBody userDto: UserDto
    ): ResponseEntity<ApiResponse<UserDto>> {
        val createdUser = userService.createUser(userDto)
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success(createdUser))
    }

    @PutMapping("/{id}")
    @Operation(
        summary = "Update user",
        description = "Updates an existing user's details",
        responses = [
            SwaggerApiResponse(
                responseCode = "200",
                description = "User updated successfully",
                content = [Content(schema = Schema(implementation = ApiResponse::class))]
            ),
            SwaggerApiResponse(
                responseCode = "404",
                description = "User not found"
            ),
            SwaggerApiResponse(
                responseCode = "403",
                description = "Access denied"
            )
        ]
    )
    @PreAuthorize("hasAuthority('USER_EDIT')")
    fun updateUser(
        @Parameter(description = "ID of the user to update")
        @PathVariable id: Long,
        @Parameter(description = "Updated user details")
        @Valid @RequestBody userDto: UserDto
    ): ResponseEntity<ApiResponse<UserDto>> {
        val updatedUser = userService.updateUser(id, userDto)
        return ResponseEntity.ok(ApiResponse.success(updatedUser))
    }

    @DeleteMapping("/{id}")
    @Operation(
        summary = "Delete user",
        description = "Deletes a user from the system",
        responses = [
            SwaggerApiResponse(
                responseCode = "204",
                description = "User successfully deleted"
            ),
            SwaggerApiResponse(
                responseCode = "404",
                description = "User not found"
            ),
            SwaggerApiResponse(
                responseCode = "403",
                description = "Access denied"
            )
        ]
    )
    @PreAuthorize("hasAuthority('USER_DELETE')")
    fun deleteUser(
        @Parameter(description = "ID of the user to delete")
        @PathVariable id: Long
    ): ResponseEntity<ApiResponse<Void>> {
        userService.deleteUser(id)
        return ResponseEntity.ok(ApiResponse.success(message = "User deleted successfully"))
    }

    @PostMapping("/{userId}/roles")
    @Operation(
        summary = "Assign roles to user",
        description = "Assigns the specified roles to a user",
        responses = [
            SwaggerApiResponse(
                responseCode = "200",
                description = "Roles assigned successfully",
                content = [Content(schema = Schema(implementation = ApiResponse::class))]
            ),
            SwaggerApiResponse(
                responseCode = "404",
                description = "User not found"
            ),
            SwaggerApiResponse(
                responseCode = "403",
                description = "Access denied"
            )
        ]
    )
    @PreAuthorize("hasAuthority('USER_EDIT')")
    fun assignRolesToUser(
        @Parameter(description = "ID of the user to assign roles to")
        @PathVariable userId: Long,
        @Parameter(description = "List of role IDs to assign")
        @RequestBody roleIds: List<Long>
    ): ResponseEntity<ApiResponse<UserDto>> {
        val user = userService.assignRolesToUser(userId, roleIds)
        return ResponseEntity.ok(ApiResponse.success(user))
    }

    @DeleteMapping("/{userId}/roles")
    @Operation(
        summary = "Remove roles from user",
        description = "Removes specified roles from a user",
        responses = [
            SwaggerApiResponse(
                responseCode = "200",
                description = "Roles removed successfully",
                content = [Content(schema = Schema(implementation = ApiResponse::class))]
            ),
            SwaggerApiResponse(
                responseCode = "404",
                description = "User not found"
            ),
            SwaggerApiResponse(
                responseCode = "403",
                description = "Access denied"
            )
        ]
    )
    @PreAuthorize("hasAuthority('USER_EDIT')")
    fun removeRolesFromUser(
        @Parameter(description = "ID of the user to remove roles from")
        @PathVariable userId: Long,
        @Parameter(description = "List of role IDs to remove")
        @RequestBody roleIds: List<Long>
    ): ResponseEntity<ApiResponse<UserDto>> {
        val user = userService.removeRolesFromUser(userId, roleIds)
        return ResponseEntity.ok(ApiResponse.success(user))
    }
}
