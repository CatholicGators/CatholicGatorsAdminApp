import 'firebase/firestore'
import { NewOptionReq, NewSectionReq } from '../redux/actions/interestActions';

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
    public static readonly OPTIONS: string = 'options'
    public static readonly SECTIONS: string = 'sections'

    constructor(private db: firebase.firestore.Firestore) {}

    async getInterests() : Promise<Section[]> {
        const [sectionDocs, optionDocs] = await Promise.all([
            this.getAllAndFlatten<SectionDoc>(InterestsService.SECTIONS),
            this.getAllAndFlatten<Option>(InterestsService.OPTIONS)
        ]);
        const sections = sectionDocs.map(section => ({
            ...section,
            options: section.options.map(optionId => optionDocs.filter(option => option.id === optionId)[0]).filter(option => option !== undefined)
        }));
        return sections.sort((a, b) => a.position - b.position);
    }

    addOption(sectionId: string, optionReq: NewOptionReq) : Promise<Option> {
        return this.db.runTransaction(async transaction => {
            const optionDoc = await transaction.get(this.db.collection(InterestsService.OPTIONS).doc())
            const sectionDoc = await transaction.get(this.db.collection(InterestsService.SECTIONS).doc(sectionId))

            const options = sectionDoc.data().options
            options.push(optionDoc.id)
            transaction.update(sectionDoc.ref, {
                options
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
            const optionDoc = await transaction.get(this.db.collection(InterestsService.OPTIONS).doc(optionId))
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

    async addSection(sectionReq: NewSectionReq) : Promise<Section> {
        const sectionRef = await this.db.collection(InterestsService.SECTIONS).add(sectionReq);
        return ({
            id: sectionRef.id,
            ...sectionReq
        });
    }

    private async getAllAndFlatten<T extends Doc>(collection: string) : Promise<T[]> {
        const snapshot = await this.db.collection(collection).get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as T));
    }
}
