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
  test("scale", () => {
    const attr = { transform: "scalex(0.5);" };
    expect(convertAttributes(attr)).toEqual(["scale-x-50"]);
  });
  test("translate", () => {
    const attr = { transform: "translateY(18rem)" };
    expect(convertAttributes(attr)).toEqual(["translate-y-72"]);
  });
});
