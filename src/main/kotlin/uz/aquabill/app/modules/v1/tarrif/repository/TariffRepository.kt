package uz.aquabill.app.modules.v1.tarrif.repository


import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import uz.aquabill.app.modules.v1.tarrif.model.Tariff


@Repository
interface TariffRepository : JpaRepository<Tariff, Long>
