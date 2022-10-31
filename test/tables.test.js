import { convertAttributes } from "../src/helper";

describe("Tables Classes", () => {
  test("border collapse", () => {
    const attr = { 'border-collapse': "collapse" };
    expect(convertAttributes(attr)).toEqual(["border-collapse"]);
  });
  test("table layout", () => {
    const attr = { 'table-layout': "auto" };
    expect(convertAttributes(attr)).toEqual(["table-auto"]);
  });
});
