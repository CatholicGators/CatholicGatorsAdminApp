import { when } from "jest-when";
import * as firebase from "firebase/app";

import FirestoreAdapter, {
    Doc,
    DocNotFoundError,
    Update,
} from "./firestoreAdapter";

const FieldPath = firebase.firestore.FieldPath;

interface TestInterface extends Doc {
    foo: String;
}

describe("firestoreAdapter", () => {
    let adapter: FirestoreAdapter,
        db,
        batch,
        collectionName,
        collection,
        docRefs,
        docSnapshots;

    let createDocSnapshot = (id, ref) => {
        const doc = {
            foo: "bar",
        };

        return {
            id: id,
            exists: true,
            data: jest.fn(() => doc),
            ref,
        };
    };

    let createDocRef = (id) => {
        let ref = {
            id,
            get: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
        };
        ref.get = jest.fn(() => Promise.resolve(createDocSnapshot(id, ref)));
        return ref;
    };

    beforeEach(async () => {
        collectionName = "testCollectionName";
        docRefs = [createDocRef("1"), createDocRef("2"), createDocRef("3")];
        docSnapshots = await Promise.all(docRefs.map((doc) => doc.get()));
        collection = {
            add: jest.fn(),
            doc: jest.fn(),
            get: jest.fn(() =>
                Promise.resolve({
                    docs: docSnapshots,
                })
            ),
            where: jest.fn(),
        };
        batch = {
            update: jest.fn(),
            commit: jest.fn(),
        };
        db = {
            collection: jest.fn(),
            runTransaction: jest.fn(),
            batch: jest.fn(() => batch),
        };
        when(db.collection)
            .calledWith(collectionName)
            .mockReturnValue(collection);
        docRefs.forEach((ref) => {
            when(collection.doc).calledWith(ref.id).mockReturnValue(ref);
        });

        adapter = new FirestoreAdapter(db);
    });

    describe("get", () => {
        let docRef;

        beforeEach(() => {
            docRef = docRefs[0];
        });

        it("when given an id for a doc that exists, successfully gets that document and flattens it", async () => {
            const data = await adapter.get<TestInterface>(
                collectionName,
                docRef.id
            );

            expect(data).toEqual({
                id: docRef.id,
                ...(await docRef.get()).data(),
            });
        });

        it("when given an id for a doc that doesnt exist, throws a DocNotFoundException", async () => {
            const docSnapshot = docRef.get();
            docRef.get = jest.fn(() => ({
                ...docSnapshot,
                exists: false,
                data: jest.fn(() => null),
            }));

            try {
                await adapter.get<TestInterface>(collectionName, docRef.id);
                fail("expected DocumentNotFoundError");
            } catch (e) {
                expect(e instanceof DocNotFoundError).toBeTruthy();
            }
        });
    });

    describe("getAll", () => {
        it("when given a collection name with docs, returns all of the docs flattened", async () => {
            const data = await adapter.getAll<TestInterface>(collectionName);

            expect(data).toEqual(
                docSnapshots.map((doc) => adapter.flattenSnapshot(doc))
            );
        });

        it("when given a collection name without docs, returns empty array", async () => {
            when(collection.get)
                .calledWith()
                .mockReturnValue(
                    Promise.resolve({
                        docs: [],
                    })
                );

            const data = await adapter.getAll<TestInterface>(collectionName);

            expect(data).toEqual([]);
        });
    });

    describe("add", () => {
        it("when given a collection name and a doc, it adds the doc", async () => {
            const newDoc = {
                foo: "bazz",
            };
            const testId = "testId";
            const docRef = {
                id: testId,
            };
            when(collection.add).calledWith(newDoc).mockReturnValue(docRef);

            const data = await adapter.add<TestInterface>(
                collectionName,
                newDoc
            );

            expect(data).toEqual({
                ...newDoc,
                id: testId,
            });
        });
    });

    describe("update", () => {
        let docRef;

        beforeEach(() => {
            docRef = docRefs[0];
        });

        it("when given an id for a doc that exists, successfully updates that document and flattens it", async () => {
            const doc = (await docRef.get()).data();
            const changes = {
                foo: "something new",
            };
            const update: Update = {
                id: docRef.id,
                changes,
            };

            const data = await adapter.update<TestInterface>(
                collectionName,
                update
            );

            expect(docRef.update).toHaveBeenCalledWith(update.changes);
            expect(data).toEqual({
                id: docRef.id,
                ...doc,
                ...changes,
            });
        });

        it("when given an id for a doc that doesnt exist, throws a DocNotFoundException", async () => {
            const docSnapshot = docRef.get();
            docRef.get = jest.fn(() => ({
                ...docSnapshot,
                exists: false,
                data: jest.fn(() => null),
            }));

            try {
                await adapter.update<TestInterface>(collectionName, {
                    id: docRef.id,
                    changes: {
                        doesnt: "matter",
                    },
                });
                fail("expected DocumentNotFoundError");
            } catch (e) {
                expect(docRef.update).not.toHaveBeenCalled();
                expect(e instanceof DocNotFoundError).toBeTruthy();
            }
        });
    });

    describe("batchUpdate", () => {
        it("when given a collection name and empty updates array, updates nothing", async () => {
            const updates = [];

            const updatedData = await adapter.batchUpdate<TestInterface>(
                collectionName,
                updates
            );

            expect(updatedData).toEqual([]);
            expect(batch.commit).not.toHaveBeenCalled();
        });

        it("when given a collection name and a falsy array, updates nothing", async () => {
            const updates = null;

            const updatedData = await adapter.batchUpdate<TestInterface>(
                collectionName,
                updates
            );

            expect(updatedData).toEqual([]);
            expect(batch.commit).not.toHaveBeenCalled();
        });

        it("when given a collection name and a non empty array of updates, updates each one, commits, then gets the updated docs from the collection", async () => {
            const changes = {
                buzz: "bazz",
            };
            const updates = docRefs.map((ref) => ({
                id: ref.id,
                changes,
            }));
            const updatedDocs: any = await Promise.all(
                docRefs.map(async (ref) => ({
                    id: ref.id,
                    data: jest.fn(async () => ({
                        ...(await ref.get()).data(),
                        ...changes,
                    })),
                }))
            );
            when(collection.where)
                .calledWith(
                    FieldPath.documentId(),
                    "in",
                    updates.map((update) => update.id)
                )
                .mockReturnValue({
                    get: jest.fn(() =>
                        Promise.resolve({
                            docs: updatedDocs,
                        })
                    ),
                });

            const updatedData = await adapter.batchUpdate<TestInterface>(
                collectionName,
                updates
            );

            expect(updatedData).toEqual(
                updatedDocs.map((doc) => adapter.flattenSnapshot(doc))
            );
            docRefs.forEach((ref) => {
                expect(batch.update).toHaveBeenCalledWith(ref, changes);
            });
            expect(batch.commit).toHaveBeenCalled();
        });
    });

    describe("deleteAll", () => {
        it("when given a collection name with docs, deletes all docs", async () => {
            await adapter.deleteAll(collectionName);

            for (let i = 0; i < docRefs.length; i++) {
                expect(docRefs[0].delete).toHaveBeenCalled();
            }
        });

        it("when given a collection name without docs, does nothing", async () => {
            when(collection.get)
                .calledWith()
                .mockReturnValue(
                    Promise.resolve({
                        docs: [],
                    })
                );

            await adapter.deleteAll(collectionName);
        });
    });

    describe("delete", () => {
        it("when given a collection name and an id that exists in that collection, it deletes the doc", async () => {
            let docRef = createDocRef("testId");
            when(collection.doc).calledWith(docRef.id).mockReturnValue(docRef);

            await adapter.delete(collectionName, docRef.id);

            expect(docRef.delete).toHaveBeenCalled();
        });
    });

    describe("runTransaction", () => {
        it("passes the update function to db.runTransaction()", async () => {
            const updateFn = jest.fn();

            await adapter.runTransaction(updateFn);

            expect(db.runTransaction).toHaveBeenCalledWith(updateFn);
        });
    });

    describe("getDocReference", () => {
        it("gets reference with collection name and id", () => {
            let docRef = createDocRef("testId");
            when(collection.doc).calledWith(docRef.id).mockReturnValue(docRef);

            const ref = adapter.getDocReference(collectionName, docRef.id);

            expect(ref).toBe(docRef);
        });
    });

    describe("getNewDocReference", () => {
        it("gets reference to a new doc with just a collection name and no id", () => {
            let docRef = createDocRef("testId");
            when(collection.doc).calledWith().mockReturnValue(docRef);

            const ref = adapter.getNewDocReference(collectionName);

            expect(ref).toBe(docRef);
        });
    });
});
