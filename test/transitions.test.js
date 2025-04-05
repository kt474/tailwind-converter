import { convertAttributes } from "../src/helper";

describe("Transitions Classes", () => {
  test("transition duration", () => {
    const attr = { 'transition-duration': "100ms" };
    expect(convertAttributes(attr)).toEqual(["duration-100"]);
  });
  test("transition delay", () => {
    const attr = { 'transition-delay': "100ms" };
    expect(convertAttributes(attr)).toEqual(["delay-100"]);
  });
});
