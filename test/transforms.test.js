import { convertAttributes } from "../src/helper";

describe("Transforms Classes", () => {
  test("transform origin", () => {
    const attr = { "transform-origin": "top" };
    expect(convertAttributes(attr)).toEqual(["origin-top"]);
  });
  test("skew", () => {
    const attr = { transform: "skewX(6deg);" };
    expect(convertAttributes(attr)).toEqual(["skew-x-6"]);
  });
  test("rotate", () => {
    const attr = { transform: "rotate(6deg);" };
    expect(convertAttributes(attr)).toEqual(["rotate-6"]);
  });
});
