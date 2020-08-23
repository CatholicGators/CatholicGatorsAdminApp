import { when } from "jest-when";

import UserService, { User, UserData } from "./userService";
import { Update } from "../../../../../database/firestoreAdapter";

describe("UserService", () => {
    let service: UserService, adapter, users: User[], userData: UserData;

    beforeEach(() => {
        adapter = {
            get: jest.fn(),
            add: jest.fn(),
            delete: jest.fn(),
            getAll: jest.fn(),
            update: jest.fn(),
            batchUpdate: jest.fn(),
            batchDelete: jest.fn(),
        };
        userData = {
            email: "email",
            isAdmin: true,
            isApproved: true,
            name: "test",
            photoUrl: "url",
        };
        users = [
            {
                id: "1",
                ...userData,
            },
            {
                id: "2",
                ...userData,
            },
            {
                id: "3",
                ...userData,
            },
        ];

        service = new UserService(adapter);
    });

    describe("getUser", () => {
        it("gets the user", async () => {
            const user: User = users[0];
            when(adapter.get)
                .calledWith(UserService.USERS, user.id)
                .mockReturnValue(user);

            const result = await service.getUser(user.id);

            expect(result).toBe(user);
        });
    });

    describe("getAllUsers", () => {
        it("gets the users from the adapter", async () => {
            when(adapter.getAll)
                .calledWith(UserService.USERS)
                .mockReturnValue(users);

            const result = await service.getAllUsers();

            expect(result).toBe(users);
        });
    });

    describe("updateApproval", () => {
        it("approves the user when passed true", async () => {
            const user: User = {
                ...users[0],
                isApproved: false,
            };
            const updatedUser: User = {
                ...user,
                isApproved: !user.isApproved,
            };
            when(adapter.update)
                .calledWith(UserService.USERS, {
                    id: user.id,
                    changes: {
                        isApproved: true,
                    },
                } as Update)
                .mockReturnValue(updatedUser);

            const result = await service.updateApproval(user.id, true);

            expect(result).toBe(updatedUser);
        });

        it("approves the user when passed false", async () => {
            const user: User = {
                ...users[0],
                isApproved: true,
            };
            const updatedUser: User = {
                ...user,
                isApproved: !user.isApproved,
            };
            when(adapter.update)
                .calledWith(UserService.USERS, {
                    id: user.id,
                    changes: {
                        isApproved: false,
                    },
                } as Update)
                .mockReturnValue(updatedUser);

            const result = await service.updateApproval(user.id, false);

            expect(result).toBe(updatedUser);
        });
    });

    describe("updateAdminStatus", () => {
        it("makes the user admin when passed true", async () => {
            const user: User = {
                ...users[0],
                isAdmin: false,
            };
            const updatedUser: User = {
                ...user,
                isAdmin: !user.isAdmin,
            };
            when(adapter.update)
                .calledWith(UserService.USERS, {
                    id: user.id,
                    changes: {
                        isAdmin: true,
                    },
                } as Update)
                .mockReturnValue(updatedUser);

            const result = await service.updateAdminStatus(user.id, true);

            expect(result).toBe(updatedUser);
        });

        it("makes the user not an admin when passed false", async () => {
            const user: User = {
                ...users[0],
                isAdmin: true,
            };
            const updatedUser: User = {
                ...user,
                isAdmin: !user.isAdmin,
            };
            when(adapter.update)
                .calledWith(UserService.USERS, {
                    id: user.id,
                    changes: {
                        isAdmin: false,
                    },
                } as Update)
                .mockReturnValue(updatedUser);

            const result = await service.updateAdminStatus(user.id, false);

            expect(result).toBe(updatedUser);
        });
    });

    describe("deleteUser", () => {
        it("deletes the user", async () => {
            const user: User = users[0];

            await service.deleteUser(user.id);

            expect(adapter.delete).toHaveBeenCalledWith(
                UserService.USERS,
                user.id
            );
        });
    });

    describe("batchUpdateApproval", () => {
        it("batch updates all of the approvals when passed true", async () => {
            const isApproved = true;
            users.forEach((user) => {
                user.isApproved = isApproved;
            });
            const updates = users.map((user) => ({
                id: user.id,
                changes: { isApproved: !isApproved },
            }));
            const ids = users.map((user) => user.id);
            const updatedUsers = users.map((user) => ({
                ...user,
                isApproved: !isApproved,
            }));
            when(adapter.batchUpdate)
                .calledWith(UserService.USERS, updates)
                .mockReturnValue(updatedUsers);

            const result = await service.batchUpdateApproval(ids, !isApproved);

            expect(result).toBe(updatedUsers);
        });

        it("batch updates all of the approvals when passed false", async () => {
            const isApproved = false;
            users.forEach((user) => {
                user.isApproved = isApproved;
            });
            const updates = users.map((user) => ({
                id: user.id,
                changes: { isApproved: !isApproved },
            }));
            const ids = users.map((user) => user.id);
            const updatedUsers = users.map((user) => ({
                ...user,
                isApproved: !isApproved,
            }));
            when(adapter.batchUpdate)
                .calledWith(UserService.USERS, updates)
                .mockReturnValue(updatedUsers);

            const result = await service.batchUpdateApproval(ids, !isApproved);

            expect(result).toBe(updatedUsers);
        });
    });

    describe("batchUpdateAdminStatus", () => {
        it("batch updates all of the admin statuses when passed true", async () => {
            const isAdmin = false;
            users.forEach((user) => {
                user.isAdmin = isAdmin;
            });
            const updates = users.map((user) => ({
                id: user.id,
                changes: { isAdmin: !isAdmin },
            }));
            const ids = users.map((user) => user.id);
            const updatedUsers = users.map((user) => ({
                ...user,
                isAdmin: !isAdmin,
            }));
            when(adapter.batchUpdate)
                .calledWith(UserService.USERS, updates)
                .mockReturnValue(updatedUsers);

            const result = await service.batchUpdateAdminStatus(ids, !isAdmin);

            expect(result).toBe(updatedUsers);
        });

        it("batch updates all of the admin statuses when passed false", async () => {
            const isAdmin = false;
            users.forEach((user) => {
                user.isAdmin = isAdmin;
            });
            const updates = users.map((user) => ({
                id: user.id,
                changes: { isAdmin: !isAdmin },
            }));
            const ids = users.map((user) => user.id);
            const updatedUsers = users.map((user) => ({
                ...user,
                isAdmin: !isAdmin,
            }));
            when(adapter.batchUpdate)
                .calledWith(UserService.USERS, updates)
                .mockReturnValue(updatedUsers);

            const result = await service.batchUpdateAdminStatus(ids, !isAdmin);

            expect(result).toBe(updatedUsers);
        });
    });

    describe("batchDeleteUsers", () => {
        it("batch updates all of the admin statuses when passed true", async () => {
            const ids = users.map((user) => user.id);

            await service.batchDeleteUsers(ids);

            expect(adapter.batchDelete).toHaveBeenCalledWith(
                UserService.USERS,
                ids
            );
        });
    });
});
