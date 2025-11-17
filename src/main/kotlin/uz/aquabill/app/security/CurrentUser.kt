package uz.aquabill.app.security

import org.springframework.core.MethodParameter
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component
import org.springframework.web.bind.support.WebDataBinderFactory
import org.springframework.web.context.request.NativeWebRequest
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.method.support.ModelAndViewContainer
import uz.aquabill.app.modules.v1.users.domain.User
import uz.aquabill.app.modules.v1.users.repository.UserRepository
import java.lang.annotation.Documented
import java.util.*

@Target(AnnotationTarget.VALUE_PARAMETER)
@Retention(AnnotationRetention.RUNTIME)
@Documented
annotation class CurrentUser

@Target(AnnotationTarget.VALUE_PARAMETER)
@Retention(AnnotationRetention.RUNTIME)
@Documented
annotation class OptionalUser

@Component
class CurrentUserArgumentResolver(
    private val userRepository: UserRepository
) : HandlerMethodArgumentResolver {

    override fun supportsParameter(parameter: MethodParameter): Boolean {
        return parameter.parameterType == User::class.java &&
               (parameter.hasParameterAnnotation(CurrentUser::class.java) || 
                parameter.hasParameterAnnotation(OptionalUser::class.java))
    }

    override fun resolveArgument(
        parameter: MethodParameter,
        mavContainer: ModelAndViewContainer?,
        webRequest: NativeWebRequest,
        binderFactory: WebDataBinderFactory?
    ): Any? {
        val authentication: Authentication = SecurityContextHolder.getContext().authentication
            ?: return nullIfOptional(parameter)

        val username = when (val principal = authentication.principal) {
            is User -> return principal
            is UserDetails -> principal.username
            is String -> if (principal == "anonymousUser") return nullIfOptional(parameter) else principal
            else -> return nullIfOptional(parameter)
        } ?: return nullIfOptional(parameter)

        // Load the user from the repository with roles and permissions
        return userRepository.findByLogin(username).orElseGet {
            if (parameter.hasParameterAnnotation(OptionalUser::class.java)) {
                null
            } else {
                throw IllegalStateException("User not found with username: $username")
            }
        }
    }
    
    private fun nullIfOptional(parameter: MethodParameter): Any? {
        return if (parameter.hasParameterAnnotation(OptionalUser::class.java)) {
            null
        } else {
            throw IllegalStateException("No authenticated user found")
        }
    }
}
