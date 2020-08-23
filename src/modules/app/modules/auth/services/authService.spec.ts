import AuthService from './authService'

describe('AuthService', () => {
    let service: AuthService, auth, usersService

    beforeEach(() => {
        auth = {}
        usersService = {}

        service = new AuthService(auth)
    })
})
