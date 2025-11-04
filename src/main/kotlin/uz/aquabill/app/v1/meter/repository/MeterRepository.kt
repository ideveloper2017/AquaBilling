package uz.aquabill.app.v1.meter.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import uz.aquabill.app.v1.customer.model.Customer
import uz.aquabill.app.v1.meter.model.Meter

@Repository
interface MeterRepository : JpaRepository<Meter, Long> {
    fun findBySerialNumber(serialNumber: String): Meter?
    fun findAllByCustomer(customer: Customer): List<Meter>
}
