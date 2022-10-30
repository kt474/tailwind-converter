import { convertAttributes } from "../src/helper";

describe("Sizing Classes", () => {
  test("font size", () => {
    const attr = { 'font-size': "1rem" };
    expect(convertAttributes(attr)).toEqual(["text-base"]);
  });
  test("font smoothing", () => {
    const attr = { '-webkit-font-smoothing': "antialiased" };
    expect(convertAttributes(attr)).toEqual(["antialiased"]);
  });
  test("font style", () => {
    const attr = { 'font-style': "italic" };
    expect(convertAttributes(attr)).toEqual(["italic"]);
  });
  test("font weight", () => {
    const attr = { 'font-weight': "400" };
    expect(convertAttributes(attr)).toEqual(["font-normal"]);
  });
  test("font variant numeric", () => {
    const attr = { 'font-variant-numeric': "normal" };
    expect(convertAttributes(attr)).toEqual(["normal-nums"]);
  });
  test("letter spacing", () => {
    const attr = { 'letter-spacing': "0em" };
    expect(convertAttributes(attr)).toEqual(["tracking-normal"]);
  });
  test("list style type", () => {
    const attr = { 'list-style-type': "none" };
    expect(convertAttributes(attr)).toEqual(["list-none"]);
  });
  test("list style position", () => {
    const attr = { 'list-style-position': "inside" };
    expect(convertAttributes(attr)).toEqual(["list-inside"]);
  });
  test("text align", () => {
    const attr = { 'text-align': "left" };
    expect(convertAttributes(attr)).toEqual(["text-left"]);
  });
  test("text decoration", () => {
    const attr = { 'text-decoration-line': "underline" };
    expect(convertAttributes(attr)).toEqual(["underline"]);
  });
  test("text decoration style", () => {
    const attr = { 'text-decoration-style': "solid" };
    expect(convertAttributes(attr)).toEqual(["decoration-solid"]);
  });
  test("text underline offset", () => {
    const attr = { 'text-underline-offset': "1px" };
    expect(convertAttributes(attr)).toEqual(["underline-offset-1"]);
  });
  test("text transform", () => {
    const attr = { 'text-transform': "uppercase" };
    expect(convertAttributes(attr)).toEqual(["uppercase"]);
  });
  test("text indent", () => {
    const attr = { 'text-indent': "0.5rem" };
    expect(convertAttributes(attr)).toEqual(["indent-2"]);
  });
  test("vertical align", () => {
    const attr = { 'vertical-align': "baseline" };
    expect(convertAttributes(attr)).toEqual(["align-baseline"]);
  });
  test("whitespace", () => {
    const attr = { 'white-space': "normal" };
    expect(convertAttributes(attr)).toEqual(["whitespace-normal"]);
  });
  test("content", () => {
    const attr = { 'content': "none" };
    expect(convertAttributes(attr)).toEqual(["content-none"]);
  });
});
