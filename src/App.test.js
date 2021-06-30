import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";

/**
 * Imports component
 */
import App from "./App";

describe("<App />", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });

  it("matches the snapshot", () => {
    const wrapper = shallow(<App />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
