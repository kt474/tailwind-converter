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
  test("brightness", () => {
    const attr = { filter: "brightness(0.5)" };
    expect(convertAttributes(attr)).toEqual(["brightness-50"]);
  });
  test("contrast", () => {
    const attr = { filter: "contrast(0.5)" };
    expect(convertAttributes(attr)).toEqual(["contrast-50"]);
  });
  test("hue-rotate", () => {
    const attr = { filter: "hue-rotate(60deg)" };
    expect(convertAttributes(attr)).toEqual(["hue-rotate-60"]);
  });
  test("saturate", () => {
    const attr = { filter: "saturate(1)" };
    expect(convertAttributes(attr)).toEqual(["saturate-100"]);
  });
  test("backdrop blur", () => {
    const attr = { "backdrop-filter": "blur(4px)" };
    expect(convertAttributes(attr)).toEqual(["backdrop-blur-sm"]);
  });
  test("backdrop brightness", () => {
    const attr = { "backdrop-filter": "brightness(.75) " };
    expect(convertAttributes(attr)).toEqual(["backdrop-brightness-75"]);
  });
  test("backdrop contrast", () => {
    const attr = { "backdrop-filter": "contrast(1) " };
    expect(convertAttributes(attr)).toEqual(["backdrop-contrast-100"]);
  });
  test("backdrop hue rotate", () => {
    const attr = { "backdrop-filter": "hue-rotate(30deg)" };
    expect(convertAttributes(attr)).toEqual(["backdrop-hue-rotate-30"]);
  });
  test("backdrop saturate", () => {
    const attr = { "backdrop-filter": "saturate(1)" };
    expect(convertAttributes(attr)).toEqual(["backdrop-saturate-100"]);
  });
  test("backdrop opacity", () => {
    const attr = { "backdrop-filter": "opacity(1)" };
    expect(convertAttributes(attr)).toEqual(["backdrop-opacity-100"]);
  });
});
