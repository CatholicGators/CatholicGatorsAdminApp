import InterestsService, {
    Section
} from '../../admin/modules/interests/services/interestsService'
import FirestoreAdapter, { Doc } from '../../../database/firestoreAdapter'

export const ContactStatus = {
    NOT_CALLED: 0,
    NEED_TO_CALL_AGAIN: 2,
    CALLED: 4
}

interface ContactData {
    firstName: string
    lastName: string
    gender: string
    email: string
    phoneNumber: string
    graduationSemester: string
    graduationYear: string
    school: string
    permanentAddress: string
    city: string
    state: string
    zipCode: string
    housingComplex: string
    parentName: string
    parentPhone: string
    parentEmail: string
    interests: string[]
    status: number
    createdAt: Date
}
export interface NewContactReq extends ContactData { }
export interface Contact extends Doc, ContactData { }

export default class ContactFormService {
    public static readonly CONTACTS_COLLECTION: string = 'contacts'

    constructor(
        private adapter: FirestoreAdapter,
        private interestsService: InterestsService
    ) { }

    addContact(contact: NewContactReq): Promise<Contact> {
        return this.adapter.add<Contact>(ContactFormService.CONTACTS_COLLECTION, contact)
    }

    getInterests(): Promise<Section[]> {
        return this.interestsService.getInterests()
    }

    getAllContacts(): Promise<Contact[]> {
        return this.adapter.getAll<Contact>(ContactFormService.CONTACTS_COLLECTION)
    }

    updateContactStatus(contactId: string, status: number): Promise<Contact> {
        return this.adapter.update<Contact>(ContactFormService.CONTACTS_COLLECTION, {
            id: contactId,
            changes: {
                status
            }
        })
    }
}
