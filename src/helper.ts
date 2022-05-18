import { trim } from "lodash";
//@ts-ignore
import { toJSON } from "cssjson";

export const convertToObj = (plainText: string) => {
  const cssJson = toJSON(trim(plainText));
  let result = "";
  for (const className in cssJson.children) {
    result += className + " ";
    let attributes = cssJson.children[className].attributes;
    for (const style in attributes) {
      result += style + " " + attributes[style] + " ";
    }
  }
  return result;
};
