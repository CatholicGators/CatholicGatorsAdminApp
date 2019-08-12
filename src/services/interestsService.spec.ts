import InterestsService from "./interestsService"
import { NewSectionReq } from "../redux/actions/contactForm/interestActions";

describe('InterestsService', () => {
    let service: InterestsService, db, collection

    beforeEach(() => {
        collection = {
            add: jest.fn()
        }
        db = {
            collection: jest.fn(() => collection)
        }

        service = new InterestsService(db)
    })

    describe('addSection', () => {
        it('adds a section to the section collection and returns new section', done => {
            const newSectionReq: NewSectionReq = {
                position: 0,
                text: 'test',
                options: []
            }
            const docRef = {
                id: 'testId'
            }
            collection.add.mockResolvedValue(docRef)

            service.addSection(newSectionReq).then(result => {
                expect(result).toEqual({
                    id: docRef.id,
                    ...newSectionReq
                })
                done()
            })
            expect(db.collection).toHaveBeenCalledWith('sections')
        })
    })
})