import { convertAttributes } from "../src/helper";

describe("SVG Classes", () => {
  test("stroke width", () => {
    const attr = { 'stroke-width': "0" };
    expect(convertAttributes(attr)).toEqual(["stroke-0"]);
  });
});
