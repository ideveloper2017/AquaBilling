
package uz.aquabill.app.v1.supplier.repository

import org.springframework.data.jpa.repository.JpaRepository
import uz.aquabill.app.v1.supplier.model.Supplier


interface SupplierRepository : JpaRepository<Supplier, Long>
