
package uz.aquabill.app.modules.v1.addons.service

import uz.aquabill.app.modules.v1.addons.dto.AddonsDto


interface AddonsService {
    fun getAll(): List<AddonsDto>
}
