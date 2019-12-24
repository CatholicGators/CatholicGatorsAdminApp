import { when } from 'jest-when'

import UserService, { User } from './userService'

describe('UserService', () => {
    let service: UserService, adapter, user: User

    beforeEach(() => {
        adapter = {
            get: jest.fn()
        }
        user = {
            id: 'userId',
            email: 'email',
            isAdmin: true,
            isApproved: true,
            name: 'test',
            photoURL: 'url'
        }

        service = new UserService(adapter)
    })

    describe('getUser', () => {
        it('gets the user', async () => {
            when(adapter.get)
                .calledWith(UserService.USERS, user.id)
                .mockReturnValue(user)

            const result = await service.getUser(user.id)

            expect(result).toBe(user)
        })
    })
})
