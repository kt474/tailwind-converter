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
});
