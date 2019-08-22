import { when } from 'jest-when'

import InterestsService, { Section } from "./interestsService"
import { NewSectionReq, NewOptionReq } from "../redux/actions/contactForm/interestActions";

describe('InterestsService', () => {
    let service: InterestsService,
        db,
        optionsCollection,
        sectionsCollection,
        transaction,
        optionDoc,
        sectionDoc

    beforeEach(() => {
        optionsCollection = {
            add: jest.fn(),
            doc: jest.fn(),
            get: jest.fn()
        }
        sectionsCollection = {
            add: jest.fn(),
            doc: jest.fn(),
            get: jest.fn()
        }
        optionDoc = {
            id: 'optionDocId',
            data: jest.fn(),
            ref: {
                id: 'optionDocId'
            }
        }
        sectionDoc = {
            id: 'sectionDocId',
            data: jest.fn(),
            ref: {
                id: 'sectionDocId'
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
        when(db.collection).calledWith(InterestsService.OPTIONS).mockReturnValue(optionsCollection)
        when(db.collection).calledWith(InterestsService.SECTIONS).mockReturnValue(sectionsCollection)


        service = new InterestsService(db)
    })

    describe('addSection', () => {
        it('adds a section to the section collection and returns new section', async () => {
            const newSectionReq: NewSectionReq = {
                position: 0,
                text: 'test',
                options: []
            }
            when(sectionsCollection.add).calledWith(newSectionReq).mockResolvedValue(sectionDoc.ref)

            const result = await service.addSection(newSectionReq)

            expect(result).toEqual({
                id: sectionDoc.ref.id,
                ...newSectionReq
            })
        })
    })

    describe('updateOptionText', () => {
        it('gets the document reference, then updates the text in one transaction', async () => {
            const id = 'test'
            const optionInDb = {
                text: 'testing'
            }
            const newText = 'newText'
            when(optionsCollection.doc).calledWith(id).mockReturnValue(optionDoc.ref)
            when(transaction.get).calledWith(optionDoc.ref).mockResolvedValue(optionDoc)
            when(optionDoc.data).calledWith().mockReturnValue(optionInDb)

            const result = await service.updateOptionText(id, newText)

            expect(result).toEqual({
                id,
                ...optionInDb,
                text: newText
            })
            expect(transaction.set).toHaveBeenCalledWith(optionDoc.ref, {
                ...optionInDb,
                text: newText
            })
        })
    })

    describe('addOption', () => {
        it('adds the option to its collection and updates its corresponding section in one transaction', async () => {
            const sectionId = 'testSectionId'
            const optionReq: NewOptionReq = {
                text: 'test'
            }
            const newOptionDoc = {
                id: 'newId',
                data: jest.fn(),
                ref: {
                    id: 'newId'
                }
            }
            const sectionInDb = {
                position: 0,
                text: 'testSection',
                options: []
            }
            when(optionsCollection.doc).calledWith().mockReturnValue(newOptionDoc.ref)
            when(transaction.get).calledWith(newOptionDoc.ref).mockResolvedValue(newOptionDoc)
            when(sectionsCollection.doc).calledWith(sectionId).mockReturnValue(sectionDoc.ref)
            when(transaction.get).calledWith(sectionDoc.ref).mockResolvedValue(sectionDoc)
            when(sectionDoc.data).calledWith().mockReturnValue(sectionInDb)

            const result = await service.addOption(sectionId, optionReq)

            expect(result).toEqual({
                id: newOptionDoc.id,
                ...optionReq
            })
            expect(transaction.update).toHaveBeenCalledWith(sectionDoc.ref, {
                options: [newOptionDoc.id]
            })
            expect(transaction.set).toHaveBeenCalledWith(newOptionDoc.ref, optionReq)
        })
    })

    describe('getInterests', () => {
        const optionsSnapshot = {
            docs: [
                {
                    id: '1',
                    data: () => ({
                        text: '1'
                    })
                },
                {
                    id: '2',
                    data: () => ({
                        text: '2'
                    })
                },
                {
                    id: '3',
                    data: () => ({
                        text: '3'
                    })
                },
                {
                    id: '4',
                    data: () => ({
                        text: '4'
                    })
                },
            ]
        }
        const sectionsSnapshot = {
            docs: [
                {
                    id: '5',
                    data: () => ({
                        position: 1,
                        text: '5',
                        options: [
                            '4',
                            '3'
                        ]
                    })
                },
                {
                    id: '6',
                    data: () => ({
                        position: 0,
                        text: '6',
                        options: [
                            '2',
                            '1'
                        ]
                    })
                }
            ]
        }
        const expectedInterests: Section[] = [
            {
                id: '6',
                position: 0,
                text: '6',
                options: [
                    {
                        id: '2',
                        text: '2'
                    },
                    {
                        id: '1',
                        text: '1'
                    }
                ]
            },
            {
                id: '5',
                position: 1,
                text: '5',
                options: [
                    {
                        id: '4',
                        text: '4'
                    },
                    {
                        id: '3',
                        text: '3'
                    }
                ]
            }
        ]

        it('gets all of the sections and options and merges them properly', async () => {
            when(optionsCollection.get).calledWith().mockResolvedValue(optionsSnapshot)
            when(sectionsCollection.get).calledWith().mockResolvedValue(sectionsSnapshot)

            const result = await service.getInterests()

            expect(result).toEqual(expectedInterests)
            result.forEach(section => expect(section.options).not.toContain(undefined))
        })
    })
})
