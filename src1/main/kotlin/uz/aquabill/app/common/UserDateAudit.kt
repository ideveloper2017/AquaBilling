package uz.aquabill.app.common

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import jakarta.persistence.FetchType
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.MappedSuperclass
import org.springframework.data.annotation.CreatedBy
import org.springframework.data.annotation.LastModifiedBy
import uz.aquabill.app.modules.v1.users.domain.User


@MappedSuperclass
@JsonIgnoreProperties(
    value = ["createdBy", "updatedBy"],
    allowGetters = true
)
abstract class UserDateAudit : DateAudit() {

    @CreatedBy
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", updatable = false)
    var createdBy: User? = null

    @LastModifiedBy
    var updatedBy: Long? = null
        protected set
}