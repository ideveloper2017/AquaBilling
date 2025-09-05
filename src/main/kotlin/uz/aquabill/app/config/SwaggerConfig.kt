package uz.aquabill.app.config

import io.swagger.v3.oas.models.Components
import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import io.swagger.v3.oas.models.security.SecurityRequirement
import io.swagger.v3.oas.models.security.SecurityScheme
import io.swagger.v3.oas.models.servers.Server
import io.swagger.v3.oas.models.tags.Tag
import org.springdoc.core.models.GroupedOpenApi
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class SwaggerConfig {

    @Bean
    fun publicApi(): GroupedOpenApi = GroupedOpenApi.builder()
        .group("public-apis")
        .pathsToMatch(
            "/v1/api/units/**",
            "/api/v1/**"
        )
        .build()

    @Bean
    fun openAPI(): OpenAPI = OpenAPI()
        .info(
            Info()
                .title("Off POS API")
                .version("1.0")
                .description("REST API documentation for Off POS - Retail POS and Stock Management System")
        )
        .addTagsItem(Tag().name("Units").description("Unit management API"))
        .addTagsItem(Tag().name("Orders").description("Unit management API"))
        .addTagsItem(Tag().name("Products").description("Operations related to products"))
        .addTagsItem(Tag().name("Product Categories").description("Operations related to product categories"))
        .addTagsItem(Tag().name("Users").description("User management operations"))
        .addServersItem(Server().url("/")
            .description("Default Server URL"))
        .components(
            Components()
                .addSecuritySchemes(
                    "bearerAuth",
                    SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                )
        )
        .addSecurityItem(
            io.swagger.v3.oas.models.security.SecurityRequirement().addList("bearerAuth")
        )

//    @Bean
//    fun mediaOpenApi(): GroupedOpenApi = GroupedOpenApi.builder()
//        .group("media")
//        .pathsToMatch("/api/v1/media/**")
//        .addOpenApiCustomizer { openApi ->
//            openApi.info(
//                Info()
//                    .title("Media Library API")
//                    .description("API for managing media files in Off POS")
//                    .version("1.0.0")
//            )
//            // Add security scheme
//            openApi.schemaRequirement("JWT", SecurityScheme()
//                .type(SecurityScheme.Type.HTTP)
//                .scheme("bearer")
//                .bearerFormat("JWT")
//            )
//            // Add security requirement
//            openApi.addSecurityItem(SecurityRequirement().addList("JWT"))
//        }
//        .build()
}
