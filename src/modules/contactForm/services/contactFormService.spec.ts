import { when } from 'jest-when'

import ContactFormService, { NewContactReq, Contact } from "./contactFormService"

describe('ContactFormService', () => {
    let service: ContactFormService,
        testContactReq: NewContactReq,
        adapter,
        interestsService

    beforeEach(() => {
        testContactReq = {
            firstName: 'testing',
            lastName: 'testing',
            gender: 'testing',
            email: 'testing',
            phoneNumber: 'testing',
            graduationSemester: 'testing',
            graduationYear: 'testing',
            school: 'testing',
            permanentAddress: 'testing',
            city: 'testing',
            state: 'testing',
            zipCode: 'testing',
            housingComplex: 'testing',
            parentName: 'testing',
            parentPhone: 'testing',
            parentEmail: 'testing',
            interests: ['123', '456'],
            status: 2568,
            createdAt: new Date
        }
        adapter = {
            getAll: jest.fn(),
            add: jest.fn(),
            update: jest.fn()
        }
        interestsService = {
            getInterests: jest.fn()
        }

        service = new ContactFormService(adapter, interestsService)
    })

    describe('updateDocumentStatus', () => {
        it('updates the doc using the firestore adapter', async () => {
            const newStatus = 2
            const updatedContact: Contact = {
                id: 'contactDocId',
                ...testContactReq,
                status: newStatus
            }
            when(adapter.update)
                .calledWith(ContactFormService.CONTACTS_COLLECTION, {
                    id: updatedContact.id,
                    changes: {
                        status: newStatus
                    }
                })
                .mockReturnValue(updatedContact)

            const result = await service.updateContactStatus(updatedContact.id, newStatus)

            expect(result).toBe(updatedContact)
        })
    })

    describe('addContact', () => {
        it('adds the contact to its collection via the firestore adapter', async () => {
            const addedContact: Contact = {
                id: 'newId',
                ...testContactReq
            }

            when(adapter.add)
                .calledWith(ContactFormService.CONTACTS_COLLECTION, testContactReq)
                .mockResolvedValue(addedContact)

            const result = await service.addContact(testContactReq)

            expect(result).toBe(addedContact)
        })
    })

    describe('getAllContacts', () => {
        it('gets all of the contacts via the firestore adapter', async () => {
            const contacts: Contact[] = [
                {
                    id: '1',
                    ...testContactReq
                },
                {
                    id: '2',
                    ...testContactReq
                },
                {
                    id: '3',
                    ...testContactReq
                },
                {
                    id: '4',
                    ...testContactReq
                }
            ]
            when(adapter.getAll)
                .calledWith(ContactFormService.CONTACTS_COLLECTION)
                .mockResolvedValue(contacts)

            const result = await service.getAllContacts()

            expect(result).toBe(contacts)
        })
    })
})
