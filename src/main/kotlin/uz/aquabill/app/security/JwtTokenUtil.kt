package uz.aquabill.app.security

import io.github.oshai.kotlinlogging.KotlinLogging
import io.jsonwebtoken.*
import io.jsonwebtoken.security.Keys

import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component
import java.security.Key
import java.util.*

private val logger = KotlinLogging.logger {}

@Component
class JwtTokenUtil(
    @Value("\${app.jwt.secret}")
    private val secret: String,
    @Value("\${app.jwt.expiration}")
    private val accessTokenExpirationInMs: Long,
    @Value("\${app.jwt.refresh-expiration:2592000000}") // 30 days default
    private val refreshTokenExpirationInMs: Long
) {
    private val key: Key = Keys.hmacShaKeyFor(secret.toByteArray())
    
    fun generateAccessToken(userDetails: UserDetails): String {
        val now = Date()
        val expiryDate = Date(now.time + accessTokenExpirationInMs)
        val userDetailsImpl = userDetails as? UserDetailsImpl

        return Jwts.builder()
            .setSubject(userDetails.username)
            .claim("id", userDetailsImpl?.getId())
            .claim("type", "access")
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .signWith(key, SignatureAlgorithm.HS512)
            .compact()
    }
    
    fun generateRefreshToken(userDetails: UserDetails): String {
        val now = Date()
        val expiryDate = Date(now.time + refreshTokenExpirationInMs)
        val userDetailsImpl = userDetails as? UserDetailsImpl

        return Jwts.builder()
            .setSubject(userDetails.username)
            .claim("id", userDetailsImpl?.getId())
            .claim("type", "refresh")
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .signWith(key, SignatureAlgorithm.HS512)
            .compact()
    }
    
    fun isRefreshToken(token: String): Boolean {
        return try {
            val claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .body
            
            claims["type"] == "refresh"
        } catch (e: Exception) {
            false
        }
    }
    
    fun getUsernameFromToken(token: String): String? {
        return try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .body
                .subject
        } catch (e: Exception) {
            logger.error(e) { "Error extracting username from token" }
            null
        }
    }
    
    fun getUserIdFromToken(token: String): Long? {
        return try {
            val claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .body
            
            @Suppress("UNCHECKED_CAST")
            (claims["id"] as? Number)?.toLong()
        } catch (e: Exception) {
            logger.error(e) { "Error extracting user ID from token" }
            null
        }
    }
    
    fun validateToken(token: String, userDetails: UserDetails): Boolean {
        val username = getUsernameFromToken(token) ?: return false
        return (username == userDetails.username && !isTokenExpired(token) && !isRefreshToken(token))
    }
    
    private fun isTokenExpired(token: String): Boolean {
        return try {
            val claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .body
            
            claims.expiration.before(Date())
        } catch (e: Exception) {
            true
        }
    }
    
    fun getExpirationInSeconds(token: String): Long {
        return try {
            val claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .body
            
            (claims.expiration.time - Date().time) / 1000
        } catch (e: Exception) {
            0L
        }
    }
}
