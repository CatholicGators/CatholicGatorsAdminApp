import 'firebase/firestore'
import { NewOptionReq, NewSectionReq } from '../redux/actions/contactForm/interestActions';

export type SectionDoc = {
    id: string
    text: string
    position: number
    options: string[]
}

export type Section = {
    id: string
    text: string
    position: number
    options: Option[]
}

export type Option = {
    id: any
    text: string
}

interface Doc {
    id: string
}

export default class InterestsService {
    private readonly OPTIONS: string = 'options'
    private readonly SECTIONS: string = 'sections'

    constructor(private db: firebase.firestore.Firestore) {}

    getInterests() : Promise<Section[]> {
        return Promise.all([
            this.getAllAndFlatten<SectionDoc>(this.SECTIONS),
            this.getAllAndFlatten<Option>(this.OPTIONS)
        ]).then(([sectionDocs, optionDocs]) => sectionDocs.map(section => ({
                ...section,
                options: section.options.map(optionId => 
                    optionDocs.filter(option => option.id === optionId)[0]
                ).filter(option => option !== undefined)
            })
        )).then(sections => sections.sort((a, b) => a.position - b.position))
    }

    addOption(sectionId: string, optionReq: NewOptionReq) : Promise<Option> {
        return this.db.runTransaction(async transaction => {
            const optionDoc = await transaction.get(this.db.collection(this.OPTIONS).doc())
            const sectionDoc = await transaction.get(this.db.collection(this.SECTIONS).doc(sectionId))

            const options = sectionDoc.data().options
            options.push(optionDoc.id)
            transaction.update(sectionDoc.ref, {
                options: options
            })
            transaction.set(optionDoc.ref, optionReq)

            return {
                id: optionDoc.id,
                ...optionReq
            }
        })
    }

    updateOptionText(optionId: string, newText: string) : Promise<Option> {
        return this.db.runTransaction(async transaction => {
            const optionDoc = await transaction.get(this.db.collection(this.OPTIONS).doc(optionId))
            const updatedOption = {
                ...optionDoc.data(),
                text: newText
            }
            transaction.set(optionDoc.ref, updatedOption)

            return {
                id: optionId,
                ...updatedOption,
            }
        })
    }

    addSection(sectionReq: NewSectionReq) : Promise<Section> {
        return this.db.collection(this.SECTIONS).add(sectionReq).then(sectionRef => ({
            id: sectionRef.id,
            ...sectionReq
        }))
    }

    private flatten<T extends Doc>(doc) : T {
        return {
            id: doc.id,
            ...doc.data()
        } as T
    }

    private getAllAndFlatten<T extends Doc>(collection: string) : Promise<T[]> {
        return this.db.collection(collection).get()
            .then(snapshot => snapshot.docs.map(doc => this.flatten<T>(doc)))
    }
}
