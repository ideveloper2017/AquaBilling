// src/types/customer.ts
export interface Customer {
    id: string
    firstName: string
    lastName: string
    phone: string
    email?: string
    address: {
        street: string
        city: string
        state: string
        postalCode: string
        country: string
    }
    meters: Meter[]
    status: "ACTIVE" | "INACTIVE" | "SUSPENDED"
    createdAt: string
    updatedAt: string
}

export interface Meter {
    id: string
    serialNumber: string
    type: "ANALOG" | "DIGITAL"
    status: "ACTIVE" | "INACTIVE" | "FAULTY"
    installationDate: string
    lastReading?: MeterReading
}

export interface MeterReading {
    id: string
    meterId: string
    reading: number
    readingDate: string
    source: "MANUAL" | "IOT" | "IMPORT"
    notes?: string
    recordedBy: string
    recordedAt: string
}