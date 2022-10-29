import { convertAttributes } from "../src/helper";

describe("Flexbox and grid classes", () => {
  test("flex direction", () => {
    const attr = { 'flex-direction': "row" };
    expect(convertAttributes(attr)).toEqual(["flex-row"]);
  });
  test("flex wrap", () => {
    const attr = { 'flex-wrap': "wrap" };
    expect(convertAttributes(attr)).toEqual(["flex-wrap"]);
  });
  test("flex", () => {
    const attr = { 'flex': "1 1 auto" };
    expect(convertAttributes(attr)).toEqual(["flex-auto"]);
  });
  test("flex grow", () => {
    const attr = { 'flex-grow': "1" };
    expect(convertAttributes(attr)).toEqual(["grow"]);
  });
  test("flex shrink", () => {
    const attr = { 'flex-shrink': "1" };
    expect(convertAttributes(attr)).toEqual(["shrink"]);
  });
});
