package uz.aquabill.app.modules.v1.zone.mapper

import org.springframework.stereotype.Component
import uz.aquabill.app.modules.v1.zone.dto.ZoneDto
import uz.aquabill.app.modules.v1.zone.model.Zone


@Component
class ZoneMapper {
    fun toDto(entity: Zone) = ZoneDto(
        id = entity.id,
        name = entity.name,
        description = entity.description,
    )

    fun fromDto(dto: ZoneDto): Zone {
        val zone = Zone()
        zone.name = dto.name
        zone.description = dto.description
        return zone
    }
}