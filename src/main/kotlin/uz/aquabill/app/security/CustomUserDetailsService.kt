package uz.aquabill.app.security

import uz.aquabill.app.v1.user.repository.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.context.annotation.Primary
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Primary
class CustomUserDetailsService(
    private val userRepository: UserRepository
) : UserDetailsService {

    @Transactional(readOnly = true)
    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with login: $username")
            
        if (!user.active) {
            throw UsernameNotFoundException("User is inactive")
        }
        
        return UserDetailsImpl(user)
    }
    
    @Transactional(readOnly = true)
    fun loadUserById(id: Long): UserDetails {
        val user = userRepository.findById(id)
            .orElseThrow { UsernameNotFoundException("User not found with id: $id") }
            
        if (!user!!.active) {
            throw UsernameNotFoundException("User is inactive")
        }
        
        return UserDetailsImpl(user)
    }
}
