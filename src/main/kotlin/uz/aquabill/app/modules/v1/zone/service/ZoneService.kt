package uz.aquabill.app.modules.v1.zone.service

import jakarta.persistence.EntityNotFoundException
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import uz.aquabill.app.modules.v1.zone.dto.ZoneDto
import uz.aquabill.app.modules.v1.zone.mapper.ZoneMapper
import uz.aquabill.app.modules.v1.zone.model.Zone
import uz.aquabill.app.modules.v1.zone.repository.ZoneRepository


@Service
class ZoneService(
    private val zoneRepository: ZoneRepository,
    private val zoneMapper: ZoneMapper
) {
    @Transactional(readOnly = true)
    fun findAll(pageable: Pageable): Page<ZoneDto> {
        return zoneRepository.findAll(pageable).map { zoneMapper.toDto(it) }
    }

    @Transactional(readOnly = true)
    fun findById(id: Long): Zone? {
        return zoneRepository.findById(id).orElse(null)
    }

    @Transactional(readOnly = true)
    fun findByName(name: String): Zone? {
        return zoneRepository.findByName(name)
    }

    @Transactional
    fun create(zoneDto: ZoneDto): ZoneDto {
        val zone = zoneMapper.fromDto(zoneDto)
        val savedZone = zoneRepository.save(zone)
        return zoneMapper.toDto(savedZone)
    }

    @Transactional
    fun update(id: Long, zoneDto: ZoneDto): ZoneDto {
        val existingZone = zoneRepository.findById(id)
            .orElseThrow { EntityNotFoundException("Zone with id $id not found") }
        
        existingZone.name = zoneDto.name ?: existingZone.name
        existingZone.description = zoneDto.description ?: existingZone.description
        
        val updatedZone = zoneRepository.save(existingZone)
        return zoneMapper.toDto(updatedZone)
    }

    @Transactional
    fun delete(id: Long) {
        if (!zoneRepository.existsById(id)) {
            throw EntityNotFoundException("Zone with id $id not found")
        }
        zoneRepository.deleteById(id)
    }

    @Transactional(readOnly = true)
    fun existsById(id: Long): Boolean {
        return zoneRepository.existsById(id)
    }
}
