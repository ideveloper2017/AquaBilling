
package uz.aquabill.app.v1.addons.repository

import org.springframework.data.jpa.repository.JpaRepository
import uz.aquabill.app.v1.addons.model.Addons

interface AddonsRepository : JpaRepository<Addons, Long>
