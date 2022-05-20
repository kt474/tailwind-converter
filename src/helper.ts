import { trim } from "lodash";
//@ts-ignore
import { toJSON } from "cssjson";

export const cssToJson = (plainText: string) => {
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

export const injectClass = (
  htmlText: string,
  attribute: string,
  style: Array<string>
) => {
  let firstIndex = htmlText.indexOf(attribute);
  let styles = "";
  style.forEach((val) => {
    styles += val + " ";
  });
  let result =
    htmlText.slice(0, firstIndex + attribute.length) +
    " class = " +
    `"` +
    styles +
    `"` +
    htmlText.slice(firstIndex + attribute.length);
  return result;
};
