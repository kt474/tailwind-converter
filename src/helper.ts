import { trim, get } from "lodash";
//@ts-ignore
import { toJSON } from "cssjson";
import { sizes, spacing, percentages, spacingCustom } from "./tailwindStyles";

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

const getClosestValue = (sizes: Array<any>, value: number) => {
  return sizes.reduce((prev: number, curr: number) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
};

const convertAttributes = (attributes: object) => {
  let result = [];
  for (let style in attributes) {
    if (spacing.includes(style)) {
      let abbreviation = style.charAt(0);
      if (style.includes("-")) {
        let direction = style.split("-")[1].charAt(0);
        abbreviation += direction;
      }
      // @ts-ignore
      let styleValue = attributes[style];
      let styleNumber = styleValue.replace(/\D/g, "");
      let tailwindValue = "";
      if (styleValue.includes("px")) {
        styleNumber = styleNumber / 16;
        tailwindValue = getClosestValue(sizes, styleNumber * 4);
      } else if (styleValue.includes("rem")) {
        tailwindValue = getClosestValue(sizes, styleNumber * 4);
      } else if (styleValue.includes("%")) {
        let tailwindDecimal = getClosestValue(
          Object.keys(percentages),
          styleNumber / 100
        );
        tailwindValue = percentages[tailwindDecimal as keyof object];
      } else if (style === "width" || style === "height") {
        tailwindValue = get(spacingCustom, styleValue, "");
      }
      result.push((abbreviation += "-" + tailwindValue));
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
