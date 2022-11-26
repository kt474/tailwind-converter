import { convertAttributes } from "../src/helper";

describe("Interactivity Classes", () => {
  test("appearance", () => {
    const attr = { appearance: "none" };
    expect(convertAttributes(attr)).toEqual(["appearance-none"]);
  });
  test("cursor", () => {
    const attr = { cursor: "pointer" };
    expect(convertAttributes(attr)).toEqual(["cursor-pointer"]);
  });
  test("pointer events", () => {
    const attr = { "pointer-events": "none" };
    expect(convertAttributes(attr)).toEqual(["pointer-events-none"]);
  });
  test("resize", () => {
    const attr = { resize: "none" };
    expect(convertAttributes(attr)).toEqual(["resize-none"]);
  });
  test("scroll behavior", () => {
    const attr = { "scroll-behavior": "auto" };
    expect(convertAttributes(attr)).toEqual(["scroll-auto"]);
  });
  test("scroll snap align", () => {
    const attr = { "scroll-snap-align": "start" };
    expect(convertAttributes(attr)).toEqual(["snap-start"]);
  });
  test("scroll snap stop", () => {
    const attr = { "scroll-snap-stop": "normal" };
    expect(convertAttributes(attr)).toEqual(["snap-normal"]);
  });
  test("touch action", () => {
    const attr = { "touch-action": "auto" };
    expect(convertAttributes(attr)).toEqual(["touch-auto"]);
  });
  test("user select", () => {
    const attr = { "user-select": "none" };
    expect(convertAttributes(attr)).toEqual(["select-none"]);
  });
  test("will change", () => {
    const attr = { "will-change": "auto" };
    expect(convertAttributes(attr)).toEqual(["will-change-auto"]);
  });
  test("accent color", () => {
    const values = ["rgb(240, 0, 0)", "red", "#ff0000"];
    const result = "accent-red-600";
    values.forEach((value) => {
      let attr = { "accent-color": value };
      expect(convertAttributes(attr)).toEqual([result]);
    });
  });
  test("caret color", () => {
    const values = ["rgb(240, 0, 0)", "red", "#ff0000"];
    const result = "caret-red-600";
    values.forEach((value) => {
      let attr = { "caret-color": value };
      expect(convertAttributes(attr)).toEqual([result]);
    });
  });
  test("scroll margin", () => {
    const attr = { "scroll-margin-top": "20px" };
    expect(convertAttributes(attr)).toEqual(["scroll-mt-5"]);
  });
  test("scroll padding", () => {
    const attr = { "scroll-padding-top": "20px" };
    expect(convertAttributes(attr)).toEqual(["scroll-pt-5"]);
  });
  test("scroll snap type", () => {
    const attr = { "scroll-snap-type": "none" };
    expect(convertAttributes(attr)).toEqual(["snap-none"]);
  });
});
