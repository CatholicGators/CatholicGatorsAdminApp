import { auth } from "firebase/app"
import "firebase/auth"
import { Observable, from } from "rxjs"

import UserService, {
    User,
} from "../../../../admin/modules/users/services/userService"
import { switchMap } from "rxjs/operators"

type Auth = auth.Auth
type FirebaseUser = firebase.User

export default class AuthService {
    private user$: Observable<User>

    constructor(private auth: Auth, private userService: UserService) {
        this.user$ = Observable.create((observer) =>
            this.auth.onAuthStateChanged(
                (user) => observer.next(user),
                (err) => observer.error(err)
            )
        ).pipe(
            switchMap((x: FirebaseUser) => from(this.storeUserInfoOnLogin(x)))
        )
    }

    googleSignIn(): Promise<void> {
        return this.auth.signInWithRedirect(new auth.GoogleAuthProvider())
    }

    signOut(): Promise<void> {
        return this.auth.signOut()
    }

    listenForUser(): Observable<User> {
        return this.user$
    }

    private storeUserInfoOnLogin(user: FirebaseUser): Promise<User> {
        if (user) {
            return this.userService.getOrInitUser(user)
        } else {
            return Promise.resolve(null)
        }
    }
}
