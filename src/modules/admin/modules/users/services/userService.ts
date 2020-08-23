import FirestoreAdapter, {
    Doc,
    DocNotFoundError,
} from "../../../../../database/firestoreAdapter";

type FirebaseUser = firebase.User;

export interface UserData {
    email: string;
    name: string;
    photoUrl: string;
    isApproved: boolean;
    isAdmin: boolean;
}
export interface User extends Doc, UserData {}

export default class UserService {
    public static readonly USERS: string = "users2";
    public static readonly INITIAL_PERMISSIONS = {
        isApproved: false,
        isAdmin: false,
    };

    constructor(private adapter: FirestoreAdapter) {}

    getUser(id: string): Promise<User> {
        return this.adapter.get<User>(UserService.USERS, id);
    }

    getAllUsers(): Promise<User[]> {
        return this.adapter.getAll<User>(UserService.USERS);
    }

    getOrInitUser(user: FirebaseUser): Promise<User> {
        return this.adapter
            .get<User>(UserService.USERS, user.uid)
            .catch((e) => {
                if (e instanceof DocNotFoundError) {
                    return this.adapter.addWithId<User>(
                        UserService.USERS,
                        user.uid,
                        {
                            email: user.email,
                            name: user.displayName,
                            photoUrl: user.photoURL,
                            ...UserService.INITIAL_PERMISSIONS,
                        }
                    );
                } else {
                    throw e;
                }
            });
    }

    updateUser(id: string, user: User): Promise<User> {
        return this.adapter.update(UserService.USERS, {
            id,
            changes: user,
        });
    }

    updateApproval(id: string, isApproved: boolean): Promise<User> {
        return this.adapter.update<User>(UserService.USERS, {
            id,
            changes: { isApproved },
        });
    }

    updateAdminStatus(id: string, isAdmin: boolean): Promise<User> {
        return this.adapter.update<User>(UserService.USERS, {
            id,
            changes: { isAdmin },
        });
    }

    deleteUser(id: string): Promise<void> {
        return this.adapter.delete(UserService.USERS, id);
    }

    batchUpdateApproval(ids: string[], isApproved: boolean): Promise<User[]> {
        const updates = ids.map((id) => ({
            id,
            changes: { isApproved },
        }));

        return this.adapter.batchUpdate<User>(UserService.USERS, updates);
    }

    batchUpdateAdminStatus(ids: string[], isAdmin: boolean): Promise<User[]> {
        const updates = ids.map((id) => ({
            id,
            changes: { isAdmin },
        }));

        return this.adapter.batchUpdate<User>(UserService.USERS, updates);
    }

    batchDeleteUsers(ids: string[]): Promise<void> {
        return this.adapter.batchDelete(UserService.USERS, ids);
    }
}
