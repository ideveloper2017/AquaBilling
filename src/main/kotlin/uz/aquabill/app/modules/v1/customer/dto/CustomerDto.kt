package uz.aquabill.app.modules.v1.customer.dto

import org.springframework.stereotype.Component
import uz.aquabill.app.modules.v1.customer.model.Customer
import uz.aquabill.app.modules.v1.zone.dto.ZoneDto
import uz.aquabill.app.modules.v1.zone.mapper.ZoneMapper
import uz.aquabill.app.modules.v1.zone.model.Zone

data class CustomerDto(
    val id: Long?,
    val firstName: String?,
    val lastName: String?,
    val surName: String?,
    val phone: String?,
    val address: String?,
    val zone: ZoneDto?
) {
    companion object {
        fun toDto(customer: Customer, zoneMapper: ZoneMapper = ZoneMapper()): CustomerDto {
            val zoneDto = customer.zone?.let { zoneMapper.toDto(it) }
            return CustomerDto(
                id = customer.id,
                firstName = customer.first_name,
                lastName = customer.last_name,
                surName = customer.sur_name,
                phone = customer.phone,
                address = customer.address,
                zone = zoneDto
            )
        }

        fun toEntity(dto: CustomerDto): Customer {
            return Customer().apply {
                id = dto.id
                first_name = dto.firstName
                last_name = dto.lastName
                sur_name = dto.surName
                phone = dto.phone
                address = dto.address
                zone = dto.zone?.let { Zone().apply { name = it.name } }
            }
        }

        fun toDtoList(customers: List<Customer>): List<CustomerDto> {
            return customers.map { toDto(it) }
        }

//    fun toEntityList(dtos: List<CustomerDto>): List<Customer> {
//        return dtos.map { toEntity(it) }
//    }
    }
}
