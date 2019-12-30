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

    updateAdminStatus(id: string, isAdmin: boolean): Promise<User> {
        return this.adapter.update<User>(UserService.USERS, {
            id,
            changes: { isAdmin }
        })
    }

    deleteUser(id: string): Promise<void> {
        return this.adapter.delete(UserService.USERS, id)
    }

    batchUpdateApproval(ids: string[], isApproved: boolean): Promise<User[]> {
        const updates = ids.map(id => ({
            id,
            changes: { isApproved }
        }))

        return this.adapter.batchUpdate<User>(UserService.USERS, updates)
    }

    batchUpdateAdminStatus(ids: string[], isAdmin: boolean): Promise<User[]> {
        const updates = ids.map(id => ({
            id,
            changes: { isAdmin }
        }))

        return this.adapter.batchUpdate<User>(UserService.USERS, updates)
    }

    batchDeleteUsers(ids: string[]): Promise<void> {
        return this.adapter.batchDelete(UserService.USERS, ids)
    }
}
