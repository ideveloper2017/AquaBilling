package uz.aquabill.app.security

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import uz.aquabill.app.modules.v1.users.domain.Role
import uz.aquabill.app.modules.v1.users.repository.UserRepository
import kotlin.collections.flatMap


@Service
@Transactional(readOnly = true)
class UserDetailsServiceImpl(
    private val userRepository: UserRepository
) : UserDetailsService {

    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsernameWithRolesAndPermissions(username)
            .orElseThrow {
                UsernameNotFoundException("User not found with username: $username")
            }

        return user
    }

    private fun getAuthorities(roles: Set<Role>): Collection<GrantedAuthority> {
        return roles.flatMap { role ->
            listOf(SimpleGrantedAuthority("ROLE_${role.name}")) +
                    role.permissions.map { SimpleGrantedAuthority(it.name) }
        }
    }
}
