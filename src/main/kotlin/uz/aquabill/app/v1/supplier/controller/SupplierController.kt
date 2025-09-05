package uz.aquabill.app.v1.supplier.controller

import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.web.bind.annotation.*
import uz.aquabill.app.v1.supplier.dto.SupplierDto
import uz.aquabill.app.v1.supplier.service.SupplierService

@RestController
@RequestMapping("/api/v1/supplier")
@Tag(name = "Supplier", description = "Supplier management APIs")
class SupplierController(
    private val service: SupplierService
) {
    @GetMapping
    fun list(): List<SupplierDto> = service.getAll()

    @GetMapping("/{id}")
    fun get(@PathVariable id: Long): SupplierDto = service.getById(id)

    @PostMapping
    fun create(@RequestBody dto: SupplierDto): SupplierDto = service.create(dto)

    @PutMapping("/{id}")
    fun update(@PathVariable id: Long, @RequestBody dto: SupplierDto): SupplierDto = service.update(id, dto)

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long) = service.delete(id)
}
