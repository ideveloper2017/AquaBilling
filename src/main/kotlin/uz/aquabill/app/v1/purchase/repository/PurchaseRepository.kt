
package uz.aquabill.app.v1.purchase.repository


import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import uz.aquabill.app.v1.purchase.model.Purchase

@Repository
interface PurchaseRepository : JpaRepository<Purchase, Long> {
    fun findBySupplierId(supplierId: Long, pageable: Pageable): Page<Purchase>
    fun findByWarehouseId(warehouseId: Long, pageable: Pageable): Page<Purchase>
}
