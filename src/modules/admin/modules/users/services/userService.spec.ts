import { when } from 'jest-when'

import UserService from './userService'

describe('UserService', () => {
    let service: UserService, db, usersCollection, user, userSnapshot, userRef

    beforeEach(() => {
        usersCollection = {
            add: jest.fn(),
            doc: jest.fn(),
            get: jest.fn()
        }
        db = {
            collection: jest.fn()
        }
        when(db.collection)
            .calledWith(UserService.USERS)
            .mockReturnValue(usersCollection)

        user = {
            foo: 'bar'
        }
        userSnapshot = {
            data: jest.fn(() => user)
        }
        userRef = {
            id: 'userDocId',
            get: jest.fn(() => userSnapshot)
        }

        service = new UserService(db)
    })

    describe('getUser', () => {
        it('gets the user', async () => {
            when(usersCollection.doc)
                .calledWith(userRef.id)
                .mockReturnValue(userRef)

            const user = await service.getUser(userRef.id)

            expect(user).toEqual({
                id: userRef.id,
                ...user
            })
        })
    })
})
