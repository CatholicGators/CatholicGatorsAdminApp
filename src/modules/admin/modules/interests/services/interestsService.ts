import 'firebase/firestore'
import { NewOptionReq, NewSectionReq } from '../redux/actions/interestActions'
import FirestoreAdapter from '../../../../../database/firestoreAdapter'

type SectionDoc = {
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

export default class InterestsService {
    public static readonly OPTIONS: string = 'options'
    public static readonly SECTIONS: string = 'sections'

    constructor(private adapter: FirestoreAdapter) { }

    async getInterests(): Promise<Section[]> {
        const sectionDocs = await this.adapter.getAll<SectionDoc>(InterestsService.SECTIONS)
        const optionDocs = await this.adapter.getAll<Option>(InterestsService.OPTIONS)
        const sections = sectionDocs.map(section => ({
            ...section,
            options: section.options
                .map(
                    optionId =>
                        optionDocs.filter(option => option.id === optionId)[0]
                )
                .filter(option => option !== undefined)
        }))
        return sections.sort((a, b) => a.position - b.position)
    }

    addOption(sectionId: string, optionReq: NewOptionReq): Promise<Option> {
        return this.adapter.runTransaction(async transaction => {
            const optionDoc = await transaction.get(
                this.adapter.getNewDocReference(InterestsService.OPTIONS)
            )
            const sectionDoc = await transaction.get(
                this.adapter.getDocReference(InterestsService.SECTIONS, sectionId)
            )

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

    updateOptionText(optionId: string, text: string): Promise<Option> {
        return this.adapter.update<Option>(InterestsService.OPTIONS, optionId, {
            text
        })
    }

    addSection(sectionReq: NewSectionReq): Promise<Section> {
        return this.adapter.add<Section>(InterestsService.SECTIONS, sectionReq)
    }
}
