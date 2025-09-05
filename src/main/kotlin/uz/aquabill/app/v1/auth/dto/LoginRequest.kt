package uz.aquabill.app.v1.auth.dto

data class LoginRequest(
    val usernameOrEmail: String,
    val password: String
)