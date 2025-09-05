package uz.aquabill.app

import jakarta.annotation.PostConstruct
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.runApplication
import java.util.TimeZone
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer


@SpringBootApplication(scanBasePackages = ["uz.aquabill.app", "uz.aquabill.app.v1.user.repository"])
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
