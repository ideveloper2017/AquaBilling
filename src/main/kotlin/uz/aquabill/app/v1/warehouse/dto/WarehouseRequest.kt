package uz.aquabill.app.v1.warehouse.dto

data class WarehouseRequest(
    val name: String,
    val isDefault: Boolean = false,
)
