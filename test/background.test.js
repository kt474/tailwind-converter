import { convertAttributes } from "../src/helper";

describe("Background Classes", () => {
  test("background attachment", () => {
    const attr = { "background-attachment": "fixed" };
    expect(convertAttributes(attr)).toEqual(["bg-fixed"]);
  });
  test("background clip", () => {
    const attr = { "background-clip": "border-box" };
    expect(convertAttributes(attr)).toEqual(["bg-clip-border"]);
  });
  test("background origin", () => {
    const attr = { "background-origin": "border-box" };
    expect(convertAttributes(attr)).toEqual(["bg-origin-border"]);
  });
  test("background position", () => {
    const attr = { "background-position": "bottom" };
    expect(convertAttributes(attr)).toEqual(["bg-bottom"]);
  });
  test("background repeat", () => {
    const attr = { "background-repeat": "repeat" };
    expect(convertAttributes(attr)).toEqual(["bg-repeat"]);
  });
  test("background size", () => {
    const attr = { "background-size": "auto" };
    expect(convertAttributes(attr)).toEqual(["bg-auto"]);
  });
  test("background color", () => {
    const values = ["rgb(240, 0, 0)", "red", "#ff0000"];
    const result = "bg-red-600";
    values.forEach((value) => {
      let attr = { "background-color": value };
      expect(convertAttributes(attr)).toEqual([result]);
    });
  });
});
