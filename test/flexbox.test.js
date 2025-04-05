import { convertAttributes } from "../src/helper";

describe("Flexbox and grid classes", () => {
  test("flex direction", () => {
    const attr = { "flex-direction": "row" };
    expect(convertAttributes(attr)).toEqual(["flex-row"]);
  });
  test("flex wrap", () => {
    const attr = { "flex-wrap": "wrap" };
    expect(convertAttributes(attr)).toEqual(["flex-wrap"]);
  });
  test("flex", () => {
    const attr = { flex: "1 1 auto" };
    expect(convertAttributes(attr)).toEqual(["flex-auto"]);
  });
  test("flex grow", () => {
    const attr = { "flex-grow": "1" };
    expect(convertAttributes(attr)).toEqual(["grow"]);
  });
  test("flex shrink", () => {
    const attr = { "flex-shrink": "1" };
    expect(convertAttributes(attr)).toEqual(["shrink"]);
  });
  test("order", () => {
    const attr = { order: "1" };
    expect(convertAttributes(attr)).toEqual(["order-1"]);
  });
  test("grid auto flow", () => {
    const attr = { "grid-auto-flow": "row" };
    expect(convertAttributes(attr)).toEqual(["grid-flow-row"]);
  });
  test("grid auto columns", () => {
    const attr = { "grid-auto-columns": "auto" };
    expect(convertAttributes(attr)).toEqual(["auto-cols-auto"]);
  });
  test("grid auto rows", () => {
    const attr = { "grid-auto-rows": "auto" };
    expect(convertAttributes(attr)).toEqual(["auto-rows-auto"]);
  });
  test("gap", () => {
    const attr = { gap: "2px" };
    expect(convertAttributes(attr)).toEqual(["gap-0.5"]);
  });
  test("justify content", () => {
    const attr = { "justify-content": "flex-start" };
    expect(convertAttributes(attr)).toEqual(["justify-start"]);
  });
  test("justify items", () => {
    const attr = { "justify-items": "start" };
    expect(convertAttributes(attr)).toEqual(["justify-items-start"]);
  });
  test("justify self", () => {
    const attr = { "justify-self": "auto" };
    expect(convertAttributes(attr)).toEqual(["justify-self-auto"]);
  });
  test("align content", () => {
    const attr = { "align-content": "center" };
    expect(convertAttributes(attr)).toEqual(["content-center"]);
  });
  test("align items", () => {
    const attr = { "align-items": "flex-start" };
    expect(convertAttributes(attr)).toEqual(["items-start"]);
  });
  test("align self", () => {
    const attr = { "align-self": "auto" };
    expect(convertAttributes(attr)).toEqual(["self-auto"]);
  });
  test("place content", () => {
    const attr = { "place-content": "center" };
    expect(convertAttributes(attr)).toEqual(["place-content-center"]);
  });
  test("place items", () => {
    const attr = { "place-items": "start" };
    expect(convertAttributes(attr)).toEqual(["place-items-start"]);
  });
  test("place self", () => {
    const attr = { "place-self": "auto" };
    expect(convertAttributes(attr)).toEqual(["place-self-auto"]);
  });
  test("flex basis", () => {
    const attr = { "flex-basis": "10%" };
    expect(convertAttributes(attr)).toEqual(["basis-1/12"]);
  });
});
