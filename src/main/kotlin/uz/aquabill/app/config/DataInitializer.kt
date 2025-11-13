package uz.aquabill.app.config

import uz.aquabill.app.v1.user.model.Permission
import uz.aquabill.app.v1.user.repository.PermissionRepository
import uz.aquabill.app.v1.user.model.Role
import uz.aquabill.app.v1.user.repository.RoleRepository
import uz.aquabill.app.v1.user.model.User
import uz.aquabill.app.v1.user.repository.UserRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.boot.CommandLineRunner
import uz.aquabill.app.v1.settings.model.Settings
import uz.aquabill.app.v1.settings.repository.SettingsRepository
import uz.aquabill.app.v1.customer.model.Customer
import uz.aquabill.app.v1.customer.repository.CustomerRepository


@Configuration
class DataInitializer(
    private val userRepository: UserRepository,
    private val roleRepository: RoleRepository,
    private val permissionRepository: PermissionRepository,
    private val passwordEncoder: PasswordEncoder,
    private val settingsRepository: SettingsRepository,
    private val customerRepository: CustomerRepository,
) {

    @Bean
    @Profile("!test")
    fun initData(): CommandLineRunner {
        return CommandLineRunner {
//            val defaultUnits = listOf(
//                Units().apply {
//                    code = "шт."
//                    name = "Dona"
//                    active = true
//                },
//                Units().apply {
//                    code = "kg"
//                    name = "Kilogramm"
//                    active = true
//                },
//                Units().apply {
//                    code = "g"
//                    name = "Gramm"
//                    active = true
//                },
//                Units().apply {
//                    code = "l"
//                    name = "Litr"
//                    active = true
//                },
//                Units().apply {
//                    code = "m"
//                    name = "Metr"
//                    active = true
//                },
//                Units().apply {
//                    code = "m²"
//                    name = "Kvadrat metr"
//                    active = true
//                },
//                Units().apply {
//                    code = "m³"
//                    name = "Kub metr"
//                    active = true
//                },
//                Units().apply {
//                    code = "quti"
//                    name = "Quti"
//                    active = true
//                },
//                Units().apply {
//                    code = "set"
//                    name = "To'plam"
//                    active = true
//                },
//                Units().apply {
//                    code = "pair"
//                    name = "Juft"
//                    active = true
//                }
//            )
//            defaultUnits.forEach { unit ->
//                if (!unitsRepository.existsByCode(unit.code!!)) {
//                    unitsRepository.save(unit)
//                }
//            }

//            [{"id":"8d372046-7782-450d-bc7a-9e8031ef2c8a","label":"manager","value":"manager"},{"id":"4ee47946-9f6e-4f39-806b-3a9459bbd83d","label":"hostess","value":"hostess"},{"id":"c253171c-9311-4804-8117-cdc83df217c3","label":"casher","value":"casher"},{"id":"f66a180d-dd05-4fb8-9672-409a168cf4a4","label":"bookkeeper","value":"bookkeeper"},{"id":"a75d622d-58f2-4a40-bebd-fed761e81cc2","label":"waiter","value":"waiter"},{"id":"623ae99d-0cfe-4305-8cde-e452edd416aa","label":"barman","value":"barman"},{"id":"464bf248-b147-417b-8f7e-5eee0af6cffd","label":"cook","value":"cook"},{"id":"72c0227f-df0b-46a9-9c3c-2abb0fe51596","label":"runner","value":"runner"}]
//            Менеджер
//            Хостес
//            Кассир
//            Бухгалтер
//            Официант
//            Бармен
//            Повар

            val settingKeyValue= listOf(
                "app.name" to "My Application",
                "app.version" to "1.0.0",
                "app.description" to "This is a sample application"
            )

            val keyValues = settingKeyValue.map { perm ->
                settingsRepository.findByValue(value = perm.second) ?: settingsRepository.save(Settings(perm.first, perm.second))
            }.toSet()

            // 1. Default permissions
            val perms = listOf("USER_VIEW", "USER_CREATE", "USER_EDIT", "USER_DELETE", "PRODUCT_VIEW", "ORDER_MANAGE")
            val permissionEntities = perms.map { perm ->
                permissionRepository.findByName(perm) ?: permissionRepository.save(Permission(perm))
            }.toSet()

            // 1. Roles and their permissions
            val adminSuperRole = roleRepository.findByName("SUPERADMIN") ?: run {
                val role = Role(name = "SUPERADMIN")
                role.permissions = permissionEntities.toMutableSet()
                roleRepository.save(role)
            }

            // 2. Roles and their permissions
            val adminRole = roleRepository.findByName("ADMIN") ?: run {
                val role = Role(name = "ADMIN")
                role.permissions = permissionEntities.toMutableSet()
                roleRepository.save(role)
            }
            val userRole = roleRepository.findByName("USER") ?: run {
                val role = Role(name = "USER")
                // Faqat ko‘rish permissionlarini oddiy userga beramiz
                role.permissions = permissionEntities.filter { it.name.endsWith("_VIEW") }.toMutableSet()
                roleRepository.save(role)
            }

            // 1. Super Admin user
            if (!userRepository.existsByUsername("Superadmin")) {
                val superadmin = User().apply {
                    username = "Superadmin"
                    email = "superadmin@example.com"
                    phone= "+998921234567"
                    password = passwordEncoder.encode("superadmin123")
                    firstName = "Superadmin"
                    lastName = "Superadmin"
                    active = true
                    roles = mutableSetOf(adminSuperRole)
                }
                userRepository.save(superadmin)
            }

            // 2. Admin user
            if (!userRepository.existsByUsername("admin")) {
                val admin = User().apply {
                    username = "admin"
                    email = "admin@example.com"
                    phone= "+998901234567"
                    password = passwordEncoder.encode("admin123")
                    firstName = "Admin"
                    lastName = "User"
                    active = true
                    roles = mutableSetOf(adminRole)
                }
                userRepository.save(admin)
            }

            // 3. Test user
            if (!userRepository.existsByUsername("user")) {
                val user = User().apply {
                    username = "user"
                    email = "user@example.com"
                    phone= "+998911234567"
                    password = passwordEncoder.encode("user123")
                    firstName = "Test"
                    lastName = "User"
                    active = true
                    roles = mutableSetOf(userRole)
                }
                userRepository.save(user)
            }

            // Initialize sample customers
            val sampleCustomers = listOf(
                Customer().apply {
                    first_name = "John"
                    sur_name = "Doe"
                    last_name = "Doe"
                    phone = "+998901112233"
                    address = "123 Main St, Tashkent"
                },
                Customer().apply {
                    first_name = "Jane"
                    sur_name = "Jane"
                    last_name = "Smith"
                    phone = "+998902223344"
                    address = "456 Oak St, Samarkand"
                },
                Customer().apply {
                    first_name = "Bob"
                    sur_name = "Bob"
                    last_name = "Johnson"
                    phone = "+998903334455"
                    address = "789 Pine St, Bukhara"
                }
            )

            sampleCustomers.forEach { customer ->
                if (!customerRepository.existsByPhoneAndDeleted(customer.phone!!, false)) {
                    customerRepository.save(customer)
                }
            }
        }
    }
}