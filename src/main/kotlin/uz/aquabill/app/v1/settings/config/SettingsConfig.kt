
package uz.aquabill.app.v1.settings.config

import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import uz.aquabill.app.v1.settings.model.Settings
import uz.aquabill.app.v1.settings.repository.SettingsRepository
import uz.aquabill.app.v1.settings.service.SettingsService
import uz.aquabill.app.v1.user.model.Permission

@Configuration
class SettingsConfig(private val settingsRepository: SettingsRepository) {




}
