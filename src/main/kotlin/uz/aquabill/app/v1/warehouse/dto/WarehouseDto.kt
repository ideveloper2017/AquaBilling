
package uz.aquabill.app.v1.warehouse.dto

import java.time.Instant

data class WarehouseDto(
    val id: Long,
    val name: String,
    val isActive: Boolean,
    val isDefault: Boolean,
    val createdAt: Instant,
    val updatedAt: Instant
)
