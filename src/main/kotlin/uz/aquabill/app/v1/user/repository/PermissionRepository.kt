package uz.aquabill.app.v1.user.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import uz.aquabill.app.v1.user.model.Permission

@Repository
interface PermissionRepository : JpaRepository<Permission, Long> {
    fun findByName(name: String): Permission?
    fun existsByName(name: String): Boolean
}
