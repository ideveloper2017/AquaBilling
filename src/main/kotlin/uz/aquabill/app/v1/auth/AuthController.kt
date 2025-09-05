package uz.aquabill.app.v1.auth

import io.github.oshai.kotlinlogging.KotlinLogging
import uz.aquabill.app.common.ApiResponse as CommonApiResponse
import uz.aquabill.app.v1.user.repository.RoleRepository
import uz.aquabill.app.v1.user.model.User
import uz.aquabill.app.v1.user.repository.UserRepository
import uz.aquabill.app.v1.auth.dto.UserInfoDto
import jakarta.validation.Valid

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.security.core.userdetails.UserDetails
import uz.aquabill.app.v1.auth.dto.JwtResponse
import uz.aquabill.app.v1.auth.dto.LoginRequest
import uz.aquabill.app.v1.auth.dto.SignUpRequest
import uz.aquabill.app.security.CurrentUser
import uz.aquabill.app.security.CustomUserDetailsService
import uz.aquabill.app.security.JwtTokenUtil
import io.swagger.v3.oas.annotations.responses.ApiResponse as SwaggerApiResponse

private val logger = KotlinLogging.logger {}

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication", description = "Authentication endpoints")
class AuthController(
    private val authenticationManager: AuthenticationManager,
    private val userRepository: UserRepository,
    private val roleRepository: RoleRepository,
    private val passwordEncoder: PasswordEncoder,
    private val jwtTokenUtil: JwtTokenUtil,
    private val userDetailsService: CustomUserDetailsService
) {
    @PostMapping("/login")
    @Operation(
        summary = "Authenticate user and get JWT token",
        description = "Authenticates a user and returns a JWT token for authorization",
        responses = [
            SwaggerApiResponse(
                responseCode = "200",
                description = "Successfully authenticated",
                content = [Content(schema = Schema(implementation = JwtResponse::class))]
            ),
            SwaggerApiResponse(
                responseCode = "401",
                description = "Invalid credentials",
                content = [Content(schema = Schema(implementation = CommonApiResponse::class))]
            )
        ]
    )
    fun login(@Valid @RequestBody loginRequest: LoginRequest): ResponseEntity<CommonApiResponse<JwtResponse>> {
        try {
            // Authenticate the user
            val authentication = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(
                    loginRequest.usernameOrEmail,
                    loginRequest.password
                )
            )

            // Set authentication in the security context
            SecurityContextHolder.getContext().authentication = authentication

            // Get authenticated user details
            val userDetails = authentication.principal as UserDetails

            // Get user details
            val user = (userDetails as? org.springframework.security.core.userdetails.User)?.let { 
                userRepository.findByUsernameOrEmail(it.username)
            }
            
            // Generate tokens
            val accessToken = jwtTokenUtil.generateAccessToken(userDetails)
            val refreshToken = jwtTokenUtil.generateRefreshToken(userDetails)

            // Create user info DTO
            val userInfo = user?.let { UserInfoDto.fromUser(it) }
            println(userDetails);
            // Return successful response with tokens and user info
            return ResponseEntity.ok(CommonApiResponse.success(
                JwtResponse(
                    accessToken = accessToken,
                    refreshToken = refreshToken,
                    expiresIn = jwtTokenUtil.getExpirationInSeconds(accessToken),
                    user = userInfo
                )
            ))
        } catch (e: Exception) {
            logger.error("Login failed: ${e.message}")
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(CommonApiResponse.error(message = "Invalid username or password"))
        }
    }
    
    @PostMapping("/register")
    @Operation(
        summary = "Register a new user",
        description = "Creates a new user account with the provided details",
        responses = [
            SwaggerApiResponse(
                responseCode = "201",
                description = "User registered successfully"
            ),
            SwaggerApiResponse(
                responseCode = "400",
                description = "Validation error or username/email already exists",
                content = [Content(schema = Schema(implementation = CommonApiResponse::class))]
            )
        ]
    )
    fun register(@Valid @RequestBody signUpRequest: SignUpRequest): ResponseEntity<CommonApiResponse<Any>> {
        if (userRepository.existsByUsername(signUpRequest.username)) {
            return ResponseEntity.badRequest()
                .body(CommonApiResponse.error(message = "Username is already taken!"))
        }
        
        if (userRepository.existsByEmail(signUpRequest.email)) {
            return ResponseEntity.badRequest()
                .body(CommonApiResponse.error(message = "Email is already in use!"))
        }
        
        // Create new user's account
        val user = User().apply {
            username = signUpRequest.username
            email = signUpRequest.email
            phone=signUpRequest.phone
            password = passwordEncoder.encode(signUpRequest.password)
            firstName = signUpRequest.firstName
            lastName = signUpRequest.lastName
            active = true

           val userRole = roleRepository.findByName("USER")
            if (userRole != null) {
                roles = mutableSetOf(userRole)
            } else {
                roles = mutableSetOf()
            }
        }
        userRepository.save(user)
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(CommonApiResponse.success(message = "User registered successfully"))
    }
    
    @GetMapping(
        "/me",
        produces = ["application/json"]
    )
    @Operation(
        summary = "Get current user details",
        description = "Returns the details of the currently authenticated user",
        security = [SecurityRequirement(name = "bearerAuth")],
        responses = [
            SwaggerApiResponse(
                responseCode = "200",
                description = "Successfully retrieved user details",
                content = [Content(schema = Schema(implementation = UserInfoDto::class))]
            ),
            SwaggerApiResponse(
                responseCode = "401",
                description = "Unauthorized",
                content = [Content(schema = Schema(implementation = CommonApiResponse::class))]
            )
        ]
    )
    fun getCurrentUser(@CurrentUser user: User): ResponseEntity<CommonApiResponse<UserInfoDto>> {
        val userInfo = UserInfoDto.fromUser(user)
        return ResponseEntity.ok(CommonApiResponse.success(userInfo))
    }
    
    @PostMapping("/refresh-token")
    @Operation(
        summary = "Refresh access token",
        description = "Refreshes the access token using a refresh token",
        responses = [
            SwaggerApiResponse(
                responseCode = "200",
                description = "Successfully refreshed token",
                content = [Content(schema = Schema(implementation = JwtResponse::class))]
            ),
            SwaggerApiResponse(
                responseCode = "401",
                description = "Invalid refresh token",
                content = [Content(schema = Schema(implementation = CommonApiResponse::class))]
            )
        ]
    )
    fun refreshToken(@RequestHeader("Authorization") refreshToken: String): ResponseEntity<CommonApiResponse<JwtResponse>> {
        try {
            // Remove 'Bearer ' prefix if present
            val token = refreshToken.substringAfter("Bearer ").trim()
            
            // Validate it's a refresh token
            if (!jwtTokenUtil.isRefreshToken(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(CommonApiResponse.error(message = "Invalid refresh token"))
            }
            
            // Get username from token
            val username = jwtTokenUtil.getUsernameFromToken(token) ?: 
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(CommonApiResponse.error(message = "Invalid refresh token"))
            
            // Load user details
            val userDetails = userDetailsService.loadUserByUsername(username)
            
            // Generate new tokens
            val newAccessToken = jwtTokenUtil.generateAccessToken(userDetails)
            val newRefreshToken = jwtTokenUtil.generateRefreshToken(userDetails)
            
            return ResponseEntity.ok(CommonApiResponse.success(
                JwtResponse(
                    accessToken = newAccessToken,
                    refreshToken = newRefreshToken,
                    expiresIn = jwtTokenUtil.getExpirationInSeconds(newAccessToken)
                )
            ))
        } catch (e: Exception) {
            logger.error("Token refresh failed: ${e.message}")
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(CommonApiResponse.error(message = "Invalid refresh token"))
        }
    }
}






