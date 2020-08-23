import { when } from "jest-when"

import InterestsService, {
    Section,
    NewOptionReq,
    NewSectionReq,
    OptionData,
    Option,
    SectionDbData,
    SectionDoc,
} from "./interestsService"
import { Update } from "database/firestoreAdapter"

describe("InterestsService", () => {
    let service: InterestsService, adapter, transaction, optionDoc, sectionDoc

    beforeEach(() => {
        optionDoc = {
            id: "optionDocId",
            data: jest.fn(),
            ref: {},
        }
        sectionDoc = {
            id: "sectionDocId",
            data: jest.fn(),
            ref: {},
        }
        transaction = {
            get: jest.fn(),
            set: jest.fn(),
            update: jest.fn(),
        }
        adapter = {
            getAll: jest.fn(),
            add: jest.fn(),
            update: jest.fn(),
            getNewDocReference: jest.fn(),
            getDocReference: jest.fn(),
            runTransaction: jest.fn((cb) => cb(transaction)),
        }

        service = new InterestsService(adapter)
    })

    describe("addSection", () => {
        it("adds a section to the section collection and returns new section initialized with no options", async () => {
            const newSectionReq: NewSectionReq = {
                position: 0,
                text: "test",
            }
            const expectedSection: Section = {
                ...newSectionReq,
                id: "id",
                options: [],
            }
            when(adapter.add)
                .calledWith(InterestsService.SECTIONS, {
                    ...newSectionReq,
                    options: [],
                })
                .mockResolvedValue(expectedSection)

            const result = await service.addSection(newSectionReq)

            expect(result).toEqual(expectedSection)
        })
    })

    describe("updateOptionText", () => {
        it("gets the document reference, then updates the text in one transaction", async () => {
            const optionInDb: OptionData = {
                text: "testing",
            }
            const newText = `not ${optionInDb.text}`
            const updatedOption: Option = {
                id: optionDoc.id,
                ...optionInDb,
                text: newText,
            }
            when(adapter.update)
                .calledWith(InterestsService.OPTIONS, {
                    id: optionDoc.id,
                    changes: {
                        text: newText,
                    },
                } as Update)
                .mockReturnValue(updatedOption)

            const result = await service.updateOptionText(
                optionDoc.id,
                newText
            )

            expect(result).toBe(updatedOption)
        })
    })

    describe("addOption", () => {
        it("adds the option to its collection and updates its corresponding section in one transaction", async () => {
            const sectionId = "testSectionId"
            const optionReq: NewOptionReq = {
                text: "test",
            }
            const newOptionDoc = {
                id: "newId",
                data: jest.fn(),
                ref: {
                    id: "newId",
                },
            }
            const sectionInDb: SectionDbData = {
                position: 0,
                text: "testSection",
                options: [],
            }
            when(adapter.getNewDocReference)
                .calledWith(InterestsService.OPTIONS)
                .mockReturnValue(newOptionDoc.ref)
            when(transaction.get)
                .calledWith(newOptionDoc.ref)
                .mockResolvedValue(newOptionDoc)
            when(adapter.getDocReference)
                .calledWith(InterestsService.SECTIONS)
                .mockReturnValue(sectionDoc.ref)
            when(transaction.get)
                .calledWith(sectionDoc.ref)
                .mockResolvedValue(sectionDoc)
            when(sectionDoc.data).calledWith().mockReturnValue(sectionInDb)

            const result = await service.addOption(sectionId, optionReq)

            expect(result).toEqual({
                id: newOptionDoc.id,
                ...optionReq,
            })
            expect(transaction.update).toHaveBeenCalledWith(sectionDoc.ref, {
                options: [newOptionDoc.id],
            })
            expect(transaction.set).toHaveBeenCalledWith(
                newOptionDoc.ref,
                optionReq
            )
        })
    })

    describe("getInterests", () => {
        const options: Option[] = [
            {
                id: "1",
                text: "1",
            },
            {
                id: "2",
                text: "2",
            },
            {
                id: "3",
                text: "3",
            },
            {
                id: "4",
                text: "4",
            },
        ]
        const sections: SectionDoc[] = [
            {
                id: "5",
                position: 1,
                text: "5",
                options: ["4", "3"],
            },
            {
                id: "6",
                position: 0,
                text: "6",
                options: ["2", "1"],
            },
        ]
        const expectedInterests: Section[] = [
            {
                id: "6",
                position: 0,
                text: "6",
                options: [
                    {
                        id: "2",
                        text: "2",
                    },
                    {
                        id: "1",
                        text: "1",
                    },
                ],
            },
            {
                id: "5",
                position: 1,
                text: "5",
                options: [
                    {
                        id: "4",
                        text: "4",
                    },
                    {
                        id: "3",
                        text: "3",
                    },
                ],
            },
        ]

        it("gets all of the sections and options and merges them properly", async () => {
            when(adapter.getAll)
                .calledWith(InterestsService.OPTIONS)
                .mockResolvedValue(options)
            when(adapter.getAll)
                .calledWith(InterestsService.SECTIONS)
                .mockResolvedValue(sections)

            const result = await service.getInterests()

            expect(result).toEqual(expectedInterests)
            result.forEach((section) =>
                expect(section.options).not.toContain(undefined)
            )
        })
    })
})
