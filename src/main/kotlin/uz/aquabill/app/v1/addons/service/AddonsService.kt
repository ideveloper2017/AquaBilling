
package uz.aquabill.app.v1.addons.service

import uz.aquabill.app.v1.addons.dto.AddonsDto

interface AddonsService {
    fun getAll(): List<AddonsDto>
}
