import { convertAttributes } from "../src/helper";

describe("Effects Classes", () => {
  test("opacity", () => {
    const attr = { 'opacity': "0.1" };
    expect(convertAttributes(attr)).toEqual(["opacity-10"]);
  }); 
  test("mix blend mode", () => {
    const attr = { 'mix-blend-mode': "screen" };
    expect(convertAttributes(attr)).toEqual(["mix-blend-screen"]);
  });   
  test("background blend mode", () => {
    const attr = { 'background-blend-mode': "screen" };
    expect(convertAttributes(attr)).toEqual(["bg-blend-screen"]);
  });  
});
