package uz.aquabill.app.security

import io.github.oshai.kotlinlogging.KotlinLogging
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.util.StringUtils
import org.springframework.web.filter.OncePerRequestFilter

private val logger = KotlinLogging.logger {}

@Component
class JwtAuthenticationFilter(
    private val jwtTokenUtil: JwtTokenUtil,
    private val userDetailsService: UserDetailsService
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        // Skip token validation for OPTIONS requests (preflight requests)
        if (request.method.equals("OPTIONS", ignoreCase = true)) {
            filterChain.doFilter(request, response)
            return
        }

        // Skip if already authenticated
        if (SecurityContextHolder.getContext().authentication != null) {
            filterChain.doFilter(request, response)
            return
        }

        try {
            val jwt = getJwtFromRequest(request)

            if (jwt != null) {
                val userId = jwtTokenUtil.getUserIdFromToken(jwt)
                val username = jwtTokenUtil.getUsernameFromToken(jwt)

                if (userId != null && username != null) {
                    val userDetails = try {
                        // Prevent circular dependencies by using a local variable
                        val userDetailsServiceImpl = userDetailsService
                        if (userDetailsServiceImpl is CustomUserDetailsService) {
                            userDetailsServiceImpl.loadUserById(userId)
                        } else {
                            userDetailsServiceImpl.loadUserByUsername(username)
                        }
                    } catch (e: Exception) {
                        logger.error("Error loading user details: ${e.message}")
                        null
                    }

                    if (userDetails != null && jwtTokenUtil.validateToken(jwt, userDetails)) {
                        val authentication = UsernamePasswordAuthenticationToken(
                            userDetails, 
                            null, 
                            userDetails.authorities
                        )

                        authentication.details = WebAuthenticationDetailsSource()
                            .buildDetails(request)

                        SecurityContextHolder.getContext().authentication = authentication
                    }
                }
            }
        } catch (e: Exception) {
            logger.error("Could not set user authentication in security context", e)
        }
        
        filterChain.doFilter(request, response)
    }
    
    private fun getJwtFromRequest(request: HttpServletRequest): String? {
        val bearerToken = request.getHeader("Authorization")
        return if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            bearerToken.substring(7)
        } else {
            null
        }
    }
}
