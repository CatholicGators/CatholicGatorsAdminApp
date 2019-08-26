import { when } from 'jest-when'

import ContactFormService, { NewContactReq, Contact } from "./contactFormService"

const testContactReq: NewContactReq = {
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

describe('ContactFormService', () => {
    let service: ContactFormService,
        db,
        contactsCollection,
        transaction,
        contactDoc

    beforeEach(() => {
        contactsCollection = {
            add: jest.fn(),
            doc: jest.fn(),
            get: jest.fn()
        }
        contactDoc = {
            id: 'contactDocId',
            data: jest.fn(),
            ref: {
                id: 'contactDocId'
            }
        }
        transaction = {
            get: jest.fn(),
            set: jest.fn(),
            update: jest.fn()
        }
        db = {
            collection: jest.fn(),
            runTransaction: jest.fn(cb => cb(transaction))
        }
        when(db.collection).calledWith(ContactFormService.CONTACTS_COLLECTION).mockReturnValue(contactsCollection)

        service = new ContactFormService(db)
    })

    describe('updateDocumentStatus', () => {
        it('gets the document reference, then updates the status in one transaction', async () => {
            const id = 'contactDocId'
            const newStatus = 2
            const contactInDb = {
                id: id,
                status: 0
            }

            when(contactsCollection.doc).calledWith(id).mockReturnValue(contactDoc.ref)
            when(transaction.get).calledWith(contactDoc.ref).mockResolvedValue(contactDoc)
            when(contactDoc.data).calledWith().mockReturnValue(contactInDb)

            const result = await service.updateContactStatus(id, newStatus)

            expect(result).toEqual({
                id: id,
                status: newStatus
            })
            expect(transaction.set).toHaveBeenCalledWith(contactDoc.ref, {
                id: id,
                status: newStatus
            })
        })
    })

    describe('addContact', () => {
        it('adds the contact to its collection', async () => {
            const newContactDoc = {
                id: 'newId',
                data: jest.fn(),
                ref: {
                    id: 'newId'
                }
            }

            when(contactsCollection.add).calledWith(testContactReq).mockResolvedValue(newContactDoc)

            const result = await service.addContact(testContactReq)

            expect(result).toEqual({
                id: newContactDoc.id,
                ...testContactReq
            })
        })
    })

    describe('getAllContacts', () => {
        const contactsSnapshot = {
            docs: [
                {
                    id: '1',
                    data: () => ({
                        ...testContactReq
                    })
                },
                {
                    id: '2',
                    data: () => ({
                        ...testContactReq
                    })
                },
                {
                    id: '3',
                    data: () => ({
                        ...testContactReq
                    })
                },
                {
                    id: '4',
                    data: () => ({
                        ...testContactReq
                    })
                },
            ]
        }
        const expectedContacts: Contact[] = [
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

        it('gets all of the contacts', async () => {
            when(contactsCollection.get).calledWith().mockResolvedValue(contactsSnapshot)

            const result = await service.getAllContacts()

            expect(result).toEqual(expectedContacts)
        })
    })
})
