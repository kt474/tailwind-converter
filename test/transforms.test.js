import { convertAttributes } from "../src/helper";

describe("Transforms Classes", () => {
  test("transform origin", () => {
    const attr = { 'transform-origin': "top" };
    expect(convertAttributes(attr)).toEqual(["origin-top"]);
  });
});
