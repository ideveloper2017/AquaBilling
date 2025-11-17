
package uz.aquabill.app.modules.v1.customer.mapper

import jakarta.persistence.EntityNotFoundException
import jakarta.transaction.Transactional
import org.springframework.stereotype.Component
import uz.aquabill.app.modules.v1.customer.dto.CustomerDto
import uz.aquabill.app.modules.v1.customer.model.Customer
import uz.aquabill.app.modules.v1.zone.mapper.ZoneMapper
import uz.aquabill.app.modules.v1.zone.model.Zone
import uz.aquabill.app.modules.v1.zone.service.ZoneService


@Component
class CustomerMapper(
    private val zoneService: ZoneService,
    private val zoneMapper: ZoneMapper = ZoneMapper()
) {
    fun toDto(entity: Customer): CustomerDto = CustomerDto(
        id = entity.id,
        firstName = entity.first_name ?: "",
        lastName = entity.last_name ?: "",
        surName = entity.sur_name ?: "",
        phone = entity.phone ?: "",
        address = entity.address ?: "",
        zone = entity.zone?.let { zoneMapper.toDto(it) }
    )

    @Transactional
    fun fromDto(dto: CustomerDto): Customer {
        val customer = Customer()
        customer.first_name = dto.firstName
        customer.last_name = dto.lastName
        customer.sur_name = dto.surName
        customer.phone = dto.phone
        customer.address = dto.address
        
        dto.zone?.let { zoneDto ->
            // If zone has an ID, fetch the existing zone
            if (zoneDto.id != null) {
                zoneService.findById(zoneDto.id)?.let { existingZone ->
                    customer.zone = existingZone
                } ?: throw EntityNotFoundException("Zone with id ${zoneDto.id} not found")
            } else if (zoneDto.name != null) {
                // If no ID but has name, try to find by name or create new
                val zone = zoneService.findByName(zoneDto.name) ?: Zone().apply {
                    name = zoneDto.name
                    description = zoneDto.description
                }
                customer.zone = zone
            }
        }
        
        return customer
    }
}
