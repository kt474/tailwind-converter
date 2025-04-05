import { convertAttributes } from "../src/helper";

describe("Sizing Classes", () => {
  test("width", () => {
    const attr = { width: "10px" };
    expect(convertAttributes(attr)).toEqual(["w-2.5"]);
  });
  test("min-width", () => {
    const attr = { "min-width": "100%" };
    expect(convertAttributes(attr)).toEqual(["min-w-full"]);
  });
  test("height", () => {
    const attr = { height: "10px" };
    expect(convertAttributes(attr)).toEqual(["h-2.5"]);
  });
  test("min-height", () => {
    const attr = { "min-height": "100%" };
    expect(convertAttributes(attr)).toEqual(["min-h-full"]);
  });
  test("max-height", () => {
    const attr = { "max-height": "100%" };
    expect(convertAttributes(attr)).toEqual(["max-h-full"]);
  });
  test("max-width", () => {
    const attr = { "max-width": "100%" };
    expect(convertAttributes(attr)).toEqual(["max-w-full"]);
  });
});
