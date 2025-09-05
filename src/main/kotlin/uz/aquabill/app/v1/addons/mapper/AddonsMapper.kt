
package uz.aquabill.app.v1.addons.mapper

import org.springframework.stereotype.Component
import uz.aquabill.app.v1.addons.dto.AddonsDto
import uz.aquabill.app.v1.addons.model.Addons

@Component
class AddonsMapper {
    fun toDto(entity: Addons) = AddonsDto(entity.id, entity.name)
    fun fromDto(dto: AddonsDto) = Addons(
        id = dto.id ?: 0,
        name = dto.name
    )
}
