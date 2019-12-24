import FirestoreAdapter, { Doc } from '../../../../../database/firestoreAdapter'

export interface UserData {
    name: String
    email: String
    photoURL: String
    isApproved: boolean
    isAdmin: boolean
}
export interface User extends Doc, UserData { }

export default class UserService {
    public static readonly USERS: string = 'users'

    constructor(private adapter: FirestoreAdapter) { }

    getUser(id: string): Promise<User> {
        return this.adapter.get<User>(UserService.USERS, id)
    }

    getAllUsers(): Promise<User[]> {
        return this.adapter.getAll<User>(UserService.USERS)
    }

    updateApproval(id: string, isApproved: boolean): Promise<User> {
        return this.adapter.update<User>(UserService.USERS, {
            id,
            changes: { isApproved }
        })
    }

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
}
