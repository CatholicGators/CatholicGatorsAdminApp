import 'firebase/firestore'
import { Option, Section } from '../modules/admin/components/Interests/Interests';

export default class InterestsService {
    private readonly OPTIONS: string = 'options'
    private readonly INTERESTS: string = 'interests'
    private readonly SECTIONS: string = 'sections'

    constructor(private db: firebase.firestore.Firestore) {}

    getInterests() : Promise<Section[]> {
        return this.db.collection(this.INTERESTS).get()
            .then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Section) })))
            .then(sections =>
                Promise.all(sections.map(section => 
                    this.db.collection(this.OPTIONS).where("sectionId", "==", section.id).get()
                        .then(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Option) })))
                )).then((optionsResults: any) => sections.map((section, i) => ({ ...section, options: optionsResults[i] }) ))
            )
    }

    addOption(option: Option) {
        return this.db.collection(this.OPTIONS).add(option)
    }

    addSection(section: Section) {
        return this.db.collection(this.SECTIONS).add(section)
    }
}
