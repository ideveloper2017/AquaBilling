package uz.aquabill.app.security

import io.jsonwebtoken.*
import io.jsonwebtoken.security.Keys
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.stereotype.Component
import uz.aquabill.app.modules.v1.users.domain.User


import java.util.*
import javax.crypto.SecretKey

@Component
class JwtUtils(
    @Value("\${app.jwt.secret}")
    val jwtSecret: String,

    @Value("\${app.jwt.expiration:86400000}")
    private val jwtExpirationMs: Int
) {
    private val logger = LoggerFactory.getLogger(JwtUtils::class.java)
    private val key: SecretKey = Keys.hmacShaKeyFor(jwtSecret.toByteArray())

    fun validateJwtToken(authToken: String?): Boolean {
        if (authToken.isNullOrBlank()) {
            logger.error("JWT token is null or empty")
            return false
        }
        return try {
            Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(authToken)
            true
        } catch (e: Exception) {
            logger.error("Invalid JWT token: {}", e.message)
            false
        }
    }

    fun getUserNameFromJwtToken(token: String?): String? {
        if (token.isNullOrBlank()) return null
        return try {
            Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .payload
                .subject
        } catch (e: Exception) {
            logger.error("Error extracting username from token: {}", e.message)
            null
        }
    }

    fun getClaimsFromToken(token: String): Claims {
        return Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .payload as Claims
    }

    fun getAuthoritiesFromToken(token: String): Collection<GrantedAuthority> {
        val claims = getClaimsFromToken(token)
        val roles = claims.get("roles") as? List<*> ?: return emptyList()

        return roles.mapNotNull { role ->
            role?.let { SimpleGrantedAuthority(it.toString()) }
        }
    }

    fun generateJwtToken(authentication: Authentication): String {
        val principal = authentication.principal

        return when (principal) {
            is UserDetailsImpl -> {
                Jwts.builder()
                    .subject(principal.username)
//                    .claim("tenantId", principal.tenant?)
                    .claim("roles", principal.authorities?.map { it?.authority })
                    .issuedAt(Date())
                    .expiration(Date(System.currentTimeMillis() + jwtExpirationMs))
                    .signWith(key, Jwts.SIG.HS512)
                    .compact()
            }
            is User -> {
                val authorities = principal.roles.flatMap { role ->
                    listOf("ROLE_${role.name}") + role.permissions.map { it.name }
                }

                Jwts.builder()
                    .subject(principal.login)
                    .claim("tenantId", principal.tenant?.id)
                    .claim("roles", authorities)
                    .issuedAt(Date())
                    .expiration(Date(System.currentTimeMillis() + jwtExpirationMs))
                    .signWith(key, Jwts.SIG.HS512)
                    .compact()
            }
            else -> throw IllegalStateException("Unexpected principal type: ${principal.javaClass.name}")
        }
    }

    fun generateTokenFromUsername(username: String): String {
        return Jwts.builder()
            .expiration(Date(Date().time + jwtExpirationMs))
            .signWith(key, Jwts.SIG.HS512)
            .compact()
    }

    fun getClaimsFromJwtToken(token: String): Claims {
        return Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .payload
    }
}
