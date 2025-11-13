
package uz.aquabill.app.modules.v1.addons.model

import jakarta.persistence.*
import uz.aquabill.app.common.BaseEntity

@Entity
@Table(name = "addons")
class Addons(): BaseEntity() {

    @Column(nullable = false)
    var name: String = ""

    constructor(id:Long,name:String):this() {
        this.id =id
        this.name =name
    }
}


