package uz.aquabill.app.v1.zone.repository

import com.example.waterbilling.model.Zone
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import uz.aquabill.app.v1.zone.model.Zone

@Repository
interface ZoneRepository : JpaRepository<Zone, Long> {
    fun findByName(name: String): Zone?
}
