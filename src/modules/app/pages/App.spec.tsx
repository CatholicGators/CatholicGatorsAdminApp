import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { App } from "./App";

describe("App", () => {
    let props, wrapper;

    beforeEach(() => {
        props = {
            listenForUser: jest.fn(),
        };
        wrapper = shallow(<App {...props} />);
    });

    it("should match snapshot", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("should call listenForUser when mounted", () => {
        expect(props.listenForUser).toHaveBeenCalled();
    });
});
