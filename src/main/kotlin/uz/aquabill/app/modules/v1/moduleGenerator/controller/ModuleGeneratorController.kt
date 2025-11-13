
package uz.aquabill.app.modules.v1.moduleGenerator.controller

import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*
import uz.aquabill.app.modules.v1.moduleGenerator.dto.ModuleGeneratorDto
import uz.aquabill.app.v1.util.ModuleGenerator

@RestController
@RequestMapping("/api/v1/moduleGenerator")
@Tag(name = "Module Generator", description = "Module generation endpoints")
class ModuleGeneratorController(

) {

    @PostMapping
    fun create(@RequestBody dto: ModuleGeneratorDto) {
        ModuleGenerator.createModule(basePackage = dto.pack, moduleName = dto.name)
    }
}
