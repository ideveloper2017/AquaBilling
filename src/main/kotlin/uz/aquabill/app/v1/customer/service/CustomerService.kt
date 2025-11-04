package uz.aquabill.app.v1.customer.service

import uz.aquabill.app.v1.customer.dto.CustomerDto
import uz.aquabill.app.v1.customer.model.Customer
import uz.aquabill.app.v1.zone.model.Zone

interface CustomerService {
    fun getAllCustomers(): List<CustomerDto>
    fun getCustomerById(id: Long): CustomerDto
    fun createCustomer(customerDto: CustomerDto): CustomerDto
    fun updateCustomer(id: Long, customerDto: CustomerDto): CustomerDto
    fun deleteCustomer(id: Long)
    fun searchCustomers(query: String): List<CustomerDto>
    fun getAll(): List<Customer>
    fun getById(id: Long): Customer

    fun findByAccountNumber(accountNumber: String): Customer?
    fun getByZone(zone: Zone): List<Customer>
    fun save(customer: Customer): Customer
    fun delete(id: Long)
}
