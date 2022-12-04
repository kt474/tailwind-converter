import { convertAttributes } from "../src/helper";

describe("Borders Classes", () => {
  test("border style", () => {
    const attr = { "border-style": "solid" };
    expect(convertAttributes(attr)).toEqual(["border-solid"]);
  });
  test("outline width", () => {
    const attr = { "outline-width": "0px" };
    expect(convertAttributes(attr)).toEqual(["outline-0"]);
  });
  test("outline offset", () => {
    const attr = { "outline-offset": "0px" };
    expect(convertAttributes(attr)).toEqual(["outline-offset-0"]);
  });
  test("outline color", () => {
    const values = ["rgb(240, 0, 0)", "red", "#ff0000"];
    const result = "outline-red-600";
    values.forEach((value) => {
      let attr = { "outline-color": value };
      expect(convertAttributes(attr)).toEqual([result]);
    });
  });
  test("border width", () => {
    const attr = { "border-width": "1px" };
    expect(convertAttributes(attr)).toEqual(["border"]);
  });
  test("border color", () => {
    const attr = { "border-left-color": "rgb(217, 70, 239)" };
    expect(convertAttributes(attr)).toEqual(["border-l-fuchsia-500"]);
  });
  test("border radius", () => {
    const attr = { "border-radius": "0.25rem" };
    expect(convertAttributes(attr)).toEqual(["rounded"]);
  });
});
