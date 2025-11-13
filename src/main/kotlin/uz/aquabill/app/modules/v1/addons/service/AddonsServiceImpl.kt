
package uz.aquabill.app.modules.v1.addons.service

import org.springframework.stereotype.Service
import uz.aquabill.app.modules.v1.addons.dto.AddonsDto
import uz.aquabill.app.modules.v1.addons.mapper.AddonsMapper
import uz.aquabill.app.modules.v1.addons.repository.AddonsRepository


@Service
class AddonsServiceImpl(
    private val repository: AddonsRepository,
    private val mapper: AddonsMapper
): AddonsService {
    override fun getAll(): List<AddonsDto> =
        repository.findAll().map { mapper.toDto(it) }
}
