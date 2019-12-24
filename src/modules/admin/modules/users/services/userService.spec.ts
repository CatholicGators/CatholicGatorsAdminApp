import { when } from 'jest-when'

import UserService, { User, UserData } from './userService'
import { Update } from '../../../../../database/firestoreAdapter'

describe('UserService', () => {
    let service: UserService, adapter, users: User[], userData: UserData

    beforeEach(() => {
        adapter = {
            get: jest.fn(),
            add: jest.fn(),
            getAll: jest.fn(),
            update: jest.fn()
        }
        userData = {
            email: 'email',
            isAdmin: true,
            isApproved: true,
            name: 'test',
            photoURL: 'url'
        }
        users = [
            {
                id: '1',
                ...userData
            },
            {
                id: '2',
                ...userData
            },
            {
                id: '3',
                ...userData
            }
        ]

        service = new UserService(adapter)
    })

    describe('getUser', () => {
        it('gets the user', async () => {
            const user: User = users[0]
            when(adapter.get)
                .calledWith(UserService.USERS, user.id)
                .mockReturnValue(user)

            const result = await service.getUser(user.id)

            expect(result).toBe(user)
        })
    })

    describe('getAllUsers', () => {
        it('gets the users from the adapter', async () => {
            when(adapter.getAll)
                .calledWith(UserService.USERS)
                .mockReturnValue(users)

            const result = await service.getAllUsers()

            expect(result).toBe(users)
        })
    })

    describe('updateUserApproval', () => {
        it('approves the user when passed true', async () => {
            const user: User = {
                ...users[0],
                isApproved: false
            }
            const updatedUser: User = {
                ...user,
                isApproved: !user.isApproved
            }
            when(adapter.update)
                .calledWith(UserService.USERS, {
                    id: user.id,
                    changes: {
                        isApproved: true
                    }
                } as Update)
                .mockReturnValue(updatedUser)

            const result = await service.updateApproval(user.id, true)

            expect(result).toBe(updatedUser)
        })

        it('approves the user when passed false', async () => {
            const user: User = {
                ...users[0],
                isApproved: true
            }
            const updatedUser: User = {
                ...user,
                isApproved: !user.isApproved
            }
            when(adapter.update)
                .calledWith(UserService.USERS, {
                    id: user.id,
                    changes: {
                        isApproved: false
                    }
                } as Update)
                .mockReturnValue(updatedUser)

            const result = await service.updateApproval(user.id, false)

            expect(result).toBe(updatedUser)
        })
    })
})
