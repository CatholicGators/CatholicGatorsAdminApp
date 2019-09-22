import 'firebase/firestore'
import InterestsService, {
    Section
} from '../../admin/modules/interests/services/interestsService'

export const ContactStatus = {
    NOT_CALLED: 0,
    NEED_TO_CALL_AGAIN: 2,
    CALLED: 4
}

export type NewContactReq = {
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

export type Contact = {
    id: string
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

interface Doc {
    id: string
}

export default class ContactFormService {
    public static readonly CONTACTS_COLLECTION: string = 'contacts'

    constructor(
        private db: firebase.firestore.Firestore,
        private interestsService: InterestsService
    ) {}

    async addContact(contact: NewContactReq): Promise<Contact> {
        const contactFormRef = await this.db
            .collection(ContactFormService.CONTACTS_COLLECTION)
            .add(contact)
        return {
            id: contactFormRef.id,
            ...contact
        }
    }

    async getInterests(): Promise<Section[]> {
        return await this.interestsService.getInterests()
    }

    async getAllContacts(): Promise<Contact[]> {
        return await this.getAllAndFlatten<Contact>(
            ContactFormService.CONTACTS_COLLECTION
        )
    }

    updateContactStatus(contactId: string, status: number): Promise<Contact> {
        return this.db.runTransaction(async transaction => {
            const contactDoc = await transaction.get(
                this.db
                    .collection(ContactFormService.CONTACTS_COLLECTION)
                    .doc(contactId)
            )
            const updatedOption = {
                ...contactDoc.data(),
                id: contactDoc.id,
                status: status
            } as Contact

            transaction.set(contactDoc.ref, updatedOption)

            return updatedOption
        })
    }

    private async getAllAndFlatten<T extends Doc>(
        collection: string
    ): Promise<T[]> {
        const snapshot = await this.db.collection(collection).get()
        return snapshot.docs.map(
            doc =>
                ({
                    id: doc.id,
                    ...doc.data()
                } as T)
        )
    }
}
