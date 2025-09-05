package uz.aquabill.app.security

import com.fasterxml.jackson.databind.ObjectMapper
import uz.aquabill.app.common.ApiResponse
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.MediaType
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.stereotype.Component
import java.io.IOException

@Component
class JwtAuthenticationEntryPoint : AuthenticationEntryPoint {
    @Throws(IOException::class)
    override fun commence(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authException: AuthenticationException
    ) {
        response.contentType = MediaType.APPLICATION_JSON_VALUE
        response.status = HttpServletResponse.SC_UNAUTHORIZED
        
        val apiResponse = ApiResponse.error<Any>(
            message = "Unauthorized: ${authException.message}",
            error = "UNAUTHORIZED"
        )
        
        val mapper = ObjectMapper()
        response.outputStream.println(mapper.writeValueAsString(apiResponse))
    }
}
