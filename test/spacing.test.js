import { convertAttributes } from "../src/helper";

describe("Spacing Classes", () => {
  test("padding", () => {
    const attr = { margin: "1rem" };
    expect(convertAttributes(attr)).toEqual(["m-4"]);
  });
  test("margin", () => {
    const attr = { margin: "1rem" };
    expect(convertAttributes(attr)).toEqual(["m-4"]);
  });
});
