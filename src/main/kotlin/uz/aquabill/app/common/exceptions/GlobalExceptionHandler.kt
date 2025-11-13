package uz.rms.modules.exception

import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import java.time.Instant
import jakarta.persistence.EntityNotFoundException

@RestControllerAdvice
class GlobalExceptionHandler {
    private val logger = LoggerFactory.getLogger(GlobalExceptionHandler::class.java)

    @ExceptionHandler(Exception::class)
    fun handleAllExceptions(ex: Exception): ResponseEntity<Map<String, Any>> {
        logger.error("Unhandled exception occurred", ex)
        
        val response = mapOf(
            "error" to "Internal Server Error",
            "message" to (ex.message ?: "An unexpected error occurred"),
            "timestamp" to Instant.now()
        )
        
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(response)
    }

    @ExceptionHandler(EntityNotFoundException::class)
    fun handleEntityNotFound(ex: EntityNotFoundException): ResponseEntity<Map<String, Any>> {
        val response = mapOf(
            "error" to "Not Found",
            "message" to (ex.message ?: "Resource not found"),
            "timestamp" to Instant.now()
        )
        
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(response)
    }
}
