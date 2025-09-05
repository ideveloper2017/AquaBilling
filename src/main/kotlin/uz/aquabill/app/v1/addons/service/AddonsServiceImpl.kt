
package uz.aquabill.app.v1.addons.service

import org.springframework.stereotype.Service
import uz.aquabill.app.v1.addons.dto.AddonsDto
import uz.aquabill.app.v1.addons.repository.AddonsRepository
import uz.aquabill.app.v1.addons.mapper.AddonsMapper

@Service
class AddonsServiceImpl(
    private val repository: AddonsRepository,
    private val mapper: AddonsMapper
): AddonsService {
    override fun getAll(): List<AddonsDto> =
        repository.findAll().map { mapper.toDto(it) }
}
