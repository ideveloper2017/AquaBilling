package uz.aquabill.app.v1.user.repository
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import uz.aquabill.app.v1.user.model.User
import java.util.*

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByUsername(login: String): User?
    fun existsByUsername(login: String): Boolean
    fun existsByEmail(email: String): Boolean
    fun findByEmail(email: String): User?
    fun findByActiveIsTrue(): List<User>
    override fun findById(id: Long): Optional<User>
    
    @Query("SELECT u FROM User u WHERE u.username = :usernameOrEmail OR u.email = :usernameOrEmail")
    fun findByUsernameOrEmail(usernameOrEmail: String): User?
}
