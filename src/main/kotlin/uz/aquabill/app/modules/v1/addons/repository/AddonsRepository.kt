
package uz.aquabill.app.modules.v1.addons.repository

import org.springframework.data.jpa.repository.JpaRepository
import uz.aquabill.app.modules.v1.addons.model.Addons


interface AddonsRepository : JpaRepository<Addons, Long>
