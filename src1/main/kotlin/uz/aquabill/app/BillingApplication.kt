package uz.aquabill.app

import jakarta.annotation.PostConstruct
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.runApplication
import java.util.TimeZone
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@EnableJpaRepositories(basePackages = ["uz.aquabill.app"])
@EntityScan(basePackages = ["uz.aquabill.app"])
@SpringBootApplication(scanBasePackages = ["uz.aquabill.app"])
class BillingApplication:SpringBootServletInitializer() {
    override fun configure(application: SpringApplicationBuilder): SpringApplicationBuilder {
        return application.sources(BillingApplication::class.java)
    }
}

fun main(args: Array<String>) {
    @PostConstruct
    fun init() {
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
    }
    runApplication<BillingApplication>(*args)

}
