import { convertAttributes } from "../src/helper";

describe("SVG Classes", () => {
  test("stroke width", () => {
    const attr = { "stroke-width": "0" };
    expect(convertAttributes(attr)).toEqual(["stroke-0"]);
  });
  test("fill color", () => {
    const values = ["rgb(240, 0, 0)", "red", "#ff0000"];
    const result = "fill-red-600";
    values.forEach((value) => {
      let attr = { fill: value };
      expect(convertAttributes(attr)).toEqual([result]);
    });
  });
  test("stroke color", () => {
    const values = ["rgb(240, 0, 0)", "red", "#ff0000"];
    const result = "stroke-red-600";
    values.forEach((value) => {
      let attr = { stroke: value };
      expect(convertAttributes(attr)).toEqual([result]);
    });
  });
});
