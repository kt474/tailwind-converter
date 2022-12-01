import { convertAttributes } from "../src/helper";

describe("Filters Classes", () => {
  test("grayscale", () => {
    const attr = { filter: "grayscale(0)" };
    expect(convertAttributes(attr)).toEqual(["grayscale-0"]);
  });
  test("invert", () => {
    const attr = { filter: "invert(0)" };
    expect(convertAttributes(attr)).toEqual(["invert-0"]);
  });
  test("sepia", () => {
    const attr = { filter: "sepia(0)" };
    expect(convertAttributes(attr)).toEqual(["sepia-0"]);
  });
  test("backdrop grayscale", () => {
    const attr = { "backdrop-filter": "grayscale(0)" };
    expect(convertAttributes(attr)).toEqual(["backdrop-grayscale-0"]);
  });
  test("backdrop invert", () => {
    const attr = { "backdrop-filter": "invert(0)" };
    expect(convertAttributes(attr)).toEqual(["backdrop-invert-0"]);
  });
  test("backdrop sepia", () => {
    const attr = { "backdrop-filter": "sepia(0)" };
    expect(convertAttributes(attr)).toEqual(["backdrop-sepia-0"]);
  });
  test("blur", () => {
    const attr = { filter: "blur(8px)" };
    expect(convertAttributes(attr)).toEqual(["blur"]);
  });
});
