
package uz.aquabill.app.modules.v1.customer.mapper

import org.springframework.stereotype.Component
import uz.aquabill.app.modules.v1.customer.dto.CustomerDto
import uz.aquabill.app.modules.v1.customer.model.Customer
import uz.aquabill.app.modules.v1.zone.mapper.ZoneMapper
import uz.aquabill.app.modules.v1.zone.model.Zone

@Component
class CustomerMapper {
    fun toDto(entity: Customer, zoneMapper: ZoneMapper = ZoneMapper()) = CustomerDto(
        id = entity.id,
        firstName = entity.first_name ?: "",
        lastName = entity.last_name ?: "",
        surName = entity.sur_name ?: "",
        phone = entity.phone ?: "",
        address = entity.address ?: "",
        zone=zoneMapper.toDto(entity.zone!!)
    )

    fun fromDto(dto: CustomerDto): Customer {
        val customer = Customer()
        customer.first_name = dto.firstName
        customer.last_name = dto.lastName
        customer.sur_name = dto.surName
        customer.phone = dto.phone
        customer.address = dto.address
        customer.zone = dto.zone?.let { Zone().apply { name = it.name
            description=it.description } }
        return customer
    }
}
