package uz.aquabill.app.config

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import io.swagger.v3.oas.models.info.Contact
import io.swagger.v3.oas.models.info.License
import io.swagger.v3.oas.models.security.SecurityScheme
import io.swagger.v3.oas.models.Components
import io.swagger.v3.oas.models.parameters.Parameter
import io.swagger.v3.oas.models.media.StringSchema
import io.swagger.v3.oas.models.media.IntegerSchema
import org.springdoc.core.converters.models.Sort
import org.springdoc.core.converters.models.PageableAsQueryParam
import org.springdoc.core.converters.models.Pageable
import org.springdoc.core.customizers.OpenApiCustomizer
import org.springdoc.core.models.GroupedOpenApi
import org.springdoc.core.utils.SpringDocUtils
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import kotlin.jvm.java
import org.springframework.data.domain.Pageable as SpringPageable
import org.springframework.data.domain.Sort as SpringSort

@Configuration
class OpenApiConfig {

    init {
        // Configure SpringDoc to properly handle Pageable and Sort
        val config = SpringDocUtils.getConfig()
        config.replaceWithClass(SpringPageable::class.java, PageableAsQueryParam::class.java)
        // config.replaceWithClass(SpringSort::class.java, SortDefaultSchema::class.java)
    }

    @Bean
    fun customOpenAPI(): OpenAPI {
        return OpenAPI()
            .info(
                Info()
                    .title("RMS Projects API")
                    .version("1.0.0")
                    .description("RMS Projects Management System API Documentation")
                    .contact(
                        Contact()
                            .name("RMS Team")
                            .email("support@rms.uz")
                    )
                    .license(
                        License()
                            .name("Apache 2.0")
                            .url("https://www.apache.org/licenses/LICENSE-2.0.html")
                    )
            )
            .components(
                Components()
                    .addSecuritySchemes(
                        "bearerAuth",
                        SecurityScheme()
                            .type(SecurityScheme.Type.HTTP)
                            .scheme("bearer")
                            .bearerFormat("JWT")
                            .description("JWT token authentication")
                    )
            )
    }

    @Bean
    fun publicApi(openApiCustomizer: OpenApiCustomizer): GroupedOpenApi {
        return GroupedOpenApi.builder()
            .group("public-apis")
            .pathsToMatch("/api/**")
            .addOpenApiCustomizer(openApiCustomizer)
            .addOpenApiCustomizer(pageableOpenApiCustomizer())
            .build()
    }

    @Bean
    fun pageableOpenApiCustomizer(): OpenApiCustomizer {
        return OpenApiCustomizer { openApi ->
            // Initialize components if null
            if (openApi.components == null) {
                openApi.components = Components()
            }

            // Add page parameter
            val pageParam = Parameter()
                .name("page")
                .`in`("query")
                .description("Zero-based page index (0..N)")
                .required(false)

            val pageSchema = IntegerSchema()
            pageParam.schema = pageSchema

            openApi.components.addParameters("page", pageParam)

            // Add size parameter
            val sizeParam = Parameter()
                .name("size")
                .`in`("query")
                .description("Number of items per page")
                .required(false)

            val sizeSchema = IntegerSchema()

            sizeParam.schema = sizeSchema

            openApi.components.addParameters("size", sizeParam)

            // Add sort parameter
            val sortParam = Parameter()
                .name("sort")
                .`in`("query")
                .description("Sorting criteria in the format: property,(asc|desc). " +
                        "Default sort order is ascending. Multiple sort criteria are supported.")
                .required(false)
                .schema(StringSchema())

            openApi.components.addParameters("sort", sortParam)
        }
    }

    @Bean
    fun openApiCustomizer(): OpenApiCustomizer {
        return OpenApiCustomizer { openApi ->
            // Remove any problematic schemas or paths if needed
            openApi.components?.schemas?.keys?.removeIf {
                it.contains("JsonNode") || it.contains("Sort") || it.contains("Pageable")
            }
        }
    }
}
