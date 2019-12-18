import 'firebase/firestore'

import User from './user'

interface Doc {
    id: string
}

export default class UserService {
    public static readonly USERS: string = 'users'

    constructor(private db: firebase.firestore.Firestore) {}

    // addUser(user: User): Observable<User> {
    //     return this.docRefObservableToUserObservable(
    //         this.db.addDoc(USER_COLLECTION, user)
    //     )
    // }

    // addUsers(users: User[]): Observable<User[]> {
    //     return this.docRefsObservableToUsersObservable(
    //         this.db.upsertDocs(USER_COLLECTION, users)
    //     )
    // }

    async getUser(id: string): Promise<User> {
        return this.getAndFlatten(UserService.USERS, id)
    }

    // getAllUsers(): Observable<User[]> {
    //     return this.db.getCollection(USER_COLLECTION) as Observable<User[]>
    // }

    // updateUser(id: string, update: Object): Observable<User> {
    //     return this.docRefObservableToUserObservable(
    //         this.db.updateDoc(USER_COLLECTION, id, update)
    //     )
    // }

    // updateUsers(users: User[]): Observable<User[]> {
    //     return this.docRefsObservableToUsersObservable(
    //         this.db.updateDocs(USER_COLLECTION, users)
    //     )
    // }

    // updateUserApproval(id: string, isApproved: boolean): Observable<User> {
    //     return this.docRefObservableToUserObservable(
    //         this.db.updateDoc(USER_COLLECTION, id, {
    //             isApproved
    //         })
    //     )
    // }

    // updateUsersApproval(
    //     ids: string[],
    //     isApproved: boolean
    // ): Observable<User[]> {
    //     const updates = ids.map(id => ({
    //         id,
    //         isApproved
    //     }))

    //     return this.docRefsObservableToUsersObservable(
    //         this.db.updateDocs(USER_COLLECTION, updates)
    //     )
    // }

    // updateUserAdminStatus(id: string, isAdmin: boolean): Observable<User> {
    //     return this.docRefObservableToUserObservable(
    //         this.db.updateDoc(USER_COLLECTION, id, {
    //             isAdmin
    //         })
    //     )
    // }

    // updateUsersAdminStatus(
    //     ids: string[],
    //     isAdmin: boolean
    // ): Observable<User[]> {
    //     const updates = ids.map(id => ({
    //         id,
    //         isAdmin
    //     }))

    //     return this.docRefsObservableToUsersObservable(
    //         this.db.updateDocs(USER_COLLECTION, updates)
    //     )
    // }

    // deleteUser(id: string): Observable<void> {
    //     return this.db.deleteDoc(USER_COLLECTION, id)
    // }

    // deleteUsers(ids: string[]): Observable<void> {
    //     return this.db.deleteDocs(USER_COLLECTION, ids)
    // }

    private async getAndFlatten<T extends Doc>(
        collection: string,
        id: string
    ): Promise<T> {
        const doc = await this.db
            .collection(collection)
            .doc(id)
            .get()

        return {
            id: doc.id,
            ...doc.data()
        } as T
    }
}
