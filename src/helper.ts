import { trim } from "lodash";
//@ts-ignore
import { toJSON } from "cssjson";
import { sizes } from "./tailwindStyles";

export const initialCSS = `/* Edit CSS here */
 body {
  margin: 1rem;
  padding: 1rem;
}
.main{
  font-size: 1rem;
  color: #fff;
}
`;
export const initialHTML = `<!-- Edit HTML here -->
<html lang="">
  <body>
    <div class="main">
      <p>
        Lorem Ipsum
      </p>
    </div>  
  </body>
</html>`;

const spacing = ["padding", "margin"];

const getClosestValue = (sizes: Array<any>, value: number) => {
  return sizes.reduce((prev: number, curr: number) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
};

const convertAttributes = (attributes: object) => {
  let result = [];
  for (let style in attributes) {
    if (spacing.includes(style)) {
      // @ts-ignore
      let styleValue = attributes[style];
      let styleNumber = styleValue.replace(/\D/g, "");
      if (styleValue.includes("px")) {
        styleNumber = styleNumber / 16;
      }
      let tailwindValue = getClosestValue(sizes, styleNumber * 4);
      result.push((style += "-" + tailwindValue));
    }
  }
  return result;
};

export const cssToJson = (plainText: string) => {
  const cssJson = toJSON(trim(plainText));
  let result = [];
  for (const className in cssJson.children) {
    let obj: { [index: string]: any } = {};
    obj[className] = convertAttributes(
      cssJson.children[className].attributes
    ).join(" ");
    result.push(obj);
  }
  return result;
};

export const injectClass = (htmlText: string, attribute: object) => {
  htmlText = htmlText.replace(
    "<!-- Edit HTML here -->",
    "<!-- HTML with Tailwind -->"
  );
  const [key, value] = Object.entries(attribute)[0];
  if (key.includes(".") || key.includes("#")) {
    return htmlText.replaceAll(key.slice(1), value);
  } else {
    let keyString = "<" + key;
    let replaceString = keyString + " class=" + `"` + value + `"`;
    return htmlText.replaceAll(keyString, replaceString);
  }
};
