package uz.aquabill.app.v1.util

import java.io.File

object ModuleGenerator {

    fun createModule(
        basePackage: String,
        moduleName: String
    ) {
        val root = "src/main/kotlin/" + basePackage.replace('.', '/') + "/$moduleName"

        val templates = listOf(
            Triple("controller", "Controller") {
"""
package $basePackage.$moduleName.controller

import org.springframework.web.bind.annotation.*
import ${basePackage}.${moduleName}.dto.${moduleName.capitalize()}Dto
import ${basePackage}.${moduleName}.service.${moduleName.capitalize()}Service

@RestController
@RequestMapping("/api/$moduleName")
class ${moduleName.capitalize()}Controller(
    private val ${moduleName}Service: ${moduleName.capitalize()}Service
) {
    @GetMapping
    fun list(): List<${moduleName.capitalize()}Dto> = ${moduleName}Service.getAll()
}
"""
            },
            Triple("service", "Service") {
"""
package $basePackage.$moduleName.service

import ${basePackage}.${moduleName}.dto.${moduleName.capitalize()}Dto

interface ${moduleName.capitalize()}Service {
    fun getAll(): List<${moduleName.capitalize()}Dto>
}
"""
            },
            Triple("service", "ServiceImpl") {
"""
package $basePackage.$moduleName.service

import org.springframework.stereotype.Service
import ${basePackage}.${moduleName}.dto.${moduleName.capitalize()}Dto
import ${basePackage}.${moduleName}.repository.${moduleName.capitalize()}Repository
import ${basePackage}.${moduleName}.mapper.${moduleName.capitalize()}Mapper

@Service
class ${moduleName.capitalize()}ServiceImpl(
    private val repository: ${moduleName.capitalize()}Repository,
    private val mapper: ${moduleName.capitalize()}Mapper
): ${moduleName.capitalize()}Service {
    override fun getAll(): List<${moduleName.capitalize()}Dto> =
        repository.findAll().map { mapper.toDto(it) }
}
"""
            },
            Triple("repository", "Repository") {
"""
package $basePackage.$moduleName.repository

import org.springframework.data.jpa.repository.JpaRepository
import ${basePackage}.${moduleName}.model.${moduleName.capitalize()}

interface ${moduleName.capitalize()}Repository : JpaRepository<${moduleName.capitalize()}, Long>
"""
            },
            Triple("model", "") {
"""
package $basePackage.$moduleName.model

import jakarta.persistence.*
import uz.aquabill.app.common.BaseEntity
import java.io.Serializable

@Entity
@Table(name = "${moduleName.lowercase()}")
data class ${moduleName.capitalize()}:BaseEntity()(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    
    @Column(nullable = false)
    var name: String
)
"""
            },
            Triple("dto", "Dto") {
"""
package $basePackage.$moduleName.dto

data class ${moduleName.capitalize()}Dto(
    val id: Long? = null,
    val name: String
)
"""
            },
            Triple("mapper", "Mapper") {
"""
package $basePackage.$moduleName.mapper

import org.springframework.stereotype.Component
import ${basePackage}.${moduleName}.dto.${moduleName.capitalize()}Dto
import ${basePackage}.${moduleName}.model.${moduleName.capitalize()}

@Component
class ${moduleName.capitalize()}Mapper {
    fun toDto(entity: ${moduleName.capitalize()}) = ${moduleName.capitalize()}Dto(entity.id, entity.name)
    fun fromDto(dto: ${moduleName.capitalize()}Dto) = ${moduleName.capitalize()}(
        id = dto.id ?: 0,
        name = dto.name
    )
}
"""
            },
            Triple("config", "Config") {
"""
package $basePackage.$moduleName.config

import org.springframework.context.annotation.Configuration

@Configuration
class ${moduleName.capitalize()}Config {
    // TODO: config
}
"""
            }
        )

        templates.forEach { (subdir, suffix, contentProvider) ->
            val dir = File("$root/$subdir")
            dir.mkdirs()
            val fileName = if (suffix.isNotBlank()) "${moduleName.capitalize()}$suffix.kt" else "${moduleName.capitalize()}.kt"
            val file = File(dir, fileName)
            file.writeText(contentProvider())
        }

        println("Module '$moduleName' created successfully!")
    }
}