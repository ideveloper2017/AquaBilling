
package uz.aquabill.app.modules.v1.addons.controller

import org.springframework.web.bind.annotation.*
import uz.aquabill.app.modules.v1.addons.dto.AddonsDto
import uz.aquabill.app.modules.v1.addons.service.AddonsService

@RestController
@RequestMapping("/api/addons")
class AddonsController(
    private val addonsService: AddonsService
) {
    @GetMapping
    fun list(): List<AddonsDto> = addonsService.getAll()
}
