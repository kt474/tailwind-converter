import { convertAttributes } from "../src/helper";

describe("Spacing Classes", () => {
  test("margin", () => {
    const attr = { margin: "1rem" };
    expect(convertAttributes(attr)).toEqual(["m-4"]);
  });
});
