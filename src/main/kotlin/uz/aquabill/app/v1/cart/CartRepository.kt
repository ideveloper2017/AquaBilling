package uz.aquabill.app.v1.cart

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface CartRepository : JpaRepository<Cart, Long> {
    fun findByUserIdAndIsActiveTrue(userId:Long): Cart?
    
    @Query("SELECT c FROM Cart c JOIN FETCH c.items WHERE c.user.id = :userId AND c.isActive = true")
    fun findByUserIdWithItems(@Param("userId") userId: Long): Cart?
    
    fun existsByUserIdAndIsActiveTrue(userId: Long): Boolean
}
