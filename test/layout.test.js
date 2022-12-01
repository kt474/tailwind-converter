import { convertAttributes } from "../src/helper";

describe("Layout classes", () => {
  test("aspect ratio", () => {
    const values = ["auto", "1/1", "16/9"];
    const results = ["aspect-auto", "aspect-square", "aspect-video"];
    values.forEach((value, index) => {
      let attr = { "aspect-ratio": value };
      expect(convertAttributes(attr)).toEqual([results[index]]);
    });
  });
  test("columns", () => {
    const values = ["3", "500px", "auto"];
    const results = ["columns-3", "columns-lg", "columns-auto"];
    values.forEach((value, index) => {
      let attr = { columns: value };
      expect(convertAttributes(attr)).toEqual([results[index]]);
    });
  });
  test("break after", () => {
    const values = ["auto", "avoid"];
    const results = ["break-after-auto", "break-after-avoid"];
    values.forEach((value, index) => {
      let attr = { "break-after": value };
      expect(convertAttributes(attr)).toEqual([results[index]]);
    });
  });
  test("break before", () => {
    const values = ["auto", "avoid"];
    const results = ["break-before-auto", "break-before-avoid"];
    values.forEach((value, index) => {
      let attr = { "break-before": value };
      expect(convertAttributes(attr)).toEqual([results[index]]);
    });
  });
  test("break inside", () => {
    const attr = { "break-inside": "auto" };
    expect(convertAttributes(attr)).toEqual(["break-inside-auto"]);
  });
  test("box decoration break", () => {
    const attr = { "box-decoration-break": "clone" };
    expect(convertAttributes(attr)).toEqual(["box-decoration-clone"]);
  });
  test("box sizing", () => {
    const attr = { "box-sizing": "border-box" };
    expect(convertAttributes(attr)).toEqual(["box-border"]);
  });
  test("display", () => {
    const values = ["block", "flex"];
    const results = ["block", "flex"];
    values.forEach((value, index) => {
      let attr = { display: value };
      expect(convertAttributes(attr)).toEqual([results[index]]);
    });
  });
  test("floats", () => {
    const attr = { float: "right" };
    expect(convertAttributes(attr)).toEqual(["float-right"]);
  });
  test("clear", () => {
    const attr = { clear: "both" };
    expect(convertAttributes(attr)).toEqual(["clear-both"]);
  });
  test("isolation", () => {
    const attr = { isolation: "isolate" };
    expect(convertAttributes(attr)).toEqual(["isolate"]);
  });
  test("object fit", () => {
    const attr = { "object-fit": "contain" };
    expect(convertAttributes(attr)).toEqual(["object-contain"]);
  });
  test("object position", () => {
    const attr = { "object-position": "bottom" };
    expect(convertAttributes(attr)).toEqual(["object-bottom"]);
  });
  test("overflow", () => {
    const attr = { overflow: "auto" };
    expect(convertAttributes(attr)).toEqual(["overflow-auto"]);
  });
  test("overscroll behavior", () => {
    const attr = { "overscroll-behavior": "auto" };
    expect(convertAttributes(attr)).toEqual(["overscroll-auto"]);
  });
  test("position", () => {
    const attr = { position: "static" };
    expect(convertAttributes(attr)).toEqual(["static"]);
  });
  test("visibility", () => {
    const attr = { visibility: "visible" };
    expect(convertAttributes(attr)).toEqual(["visible"]);
  });
  test("z-index", () => {
    const attr = { "z-index": "40" };
    expect(convertAttributes(attr)).toEqual(["z-40"]);
  });
  test("top", () => {
    const attr = { top: "4px" };
    expect(convertAttributes(attr)).toEqual(["top-1"]);
  });
  test("bottom", () => {
    const attr = { bottom: "50%" };
    expect(convertAttributes(attr)).toEqual(["bottom-1/2"]);
  });
  test("right", () => {
    const attr = { right: "1px" };
    expect(convertAttributes(attr)).toEqual(["right-px"]);
  });
  test("left", () => {
    const attr = { left: "auto" };
    expect(convertAttributes(attr)).toEqual(["left-auto"]);
  });
});
