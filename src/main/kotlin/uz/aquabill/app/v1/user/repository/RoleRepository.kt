package uz.aquabill.app.v1.user.repository
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import uz.aquabill.app.v1.user.model.Role

@Repository
interface RoleRepository : JpaRepository<Role, Long>{
    fun findByName(name: String): Role?
    fun existsByName(name: String): Boolean
}