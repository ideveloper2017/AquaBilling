package uz.aquabill.app.v1.moduleGenerator.service//
//package uz.aquabill.app.v1.moduleGenerator.service
//
//import org.springframework.stereotype.Service
//import uz.aquabill.app.v1.moduleGenerator.dto.ModuleGeneratorDto
//import uz.aquabill.app.v1.moduleGenerator.repository.ModuleGeneratorRepository
//import uz.aquabill.app.v1.moduleGenerator.mapper.ModuleGeneratorMapper
//
//@Service
//class ModuleGeneratorServiceImpl(
//    private val repository: ModuleGeneratorRepository,
//    private val mapper: ModuleGeneratorMapper
//): ModuleGeneratorService {
//    override fun getAll(): List<ModuleGeneratorDto> =
//        repository.findAll().map { mapper.toDto(it) }
//}
