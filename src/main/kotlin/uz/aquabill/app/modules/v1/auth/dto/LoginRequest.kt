package uz.aquabill.app.modules.v1.auth.dto

data class LoginRequest(
    val username: String,
    val password: String
)
