import { setUser } from "../actions/authActions";
import authReducer, { INITIAL_AUTH_STATE } from "./authReducer";

describe("authReducer", () => {
    let user;

    beforeAll(() => {
        user = {
            name: "Joey",
        };
    });

    it("returns the state unmutated by default", () => {
        const action = { type: "foo" };
        const state = {
            ...INITIAL_AUTH_STATE,
            user: "bar",
        };

        expect(authReducer(state, action)).toEqual(state);
    });

    it("applies user on SET_USER", () => {
        const action = setUser(user);

        expect(authReducer(undefined, action)).toEqual({
            ...INITIAL_AUTH_STATE,
            user: action.user,
        });
    });
});
