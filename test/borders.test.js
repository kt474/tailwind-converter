import { convertAttributes } from "../src/helper";

describe("Borders Classes", () => {
  test("border style", () => {
    const attr = { 'border-style': "solid" };
    expect(convertAttributes(attr)).toEqual(["border-solid"]);
  }); 
  test("outline width", () => {
    const attr = { 'outline-width': "0px" };
    expect(convertAttributes(attr)).toEqual(["outline-0"]);
  });   
  test("outline offset", () => {
    const attr = { 'outline-offset': "0px" };
    expect(convertAttributes(attr)).toEqual(["outline-offset-0"]);
  });  
});
