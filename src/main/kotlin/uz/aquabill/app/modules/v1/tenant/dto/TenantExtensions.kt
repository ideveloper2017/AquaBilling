package uz.aquabill.app.modules.v1.tenant.dto

import uz.aquabill.app.modules.v1.tenant.domain.Tenant

fun Tenant.toDto() = TenantDto(
    id = id,
    name = name,
    domain = domain,
    active = active
)
