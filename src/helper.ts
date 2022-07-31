import { trim, get } from "lodash";
//@ts-ignore
import { toJSON } from "cssjson";
import {
  sizes,
  spacing,
  percentages,
  spacingCustom,
  fontSize,
  fontWeight,
  mainDict
} from "./tailwindStyles";

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
    // @ts-ignore
    let styleValue = attributes[style];
    let styleNumber = styleValue.replace(/\D/g, "");
    let tailwindValue = "";
    let abbreviation = "";
    // margin, padding, width, height
    if (spacing.includes(style)) {
      abbreviation = style.charAt(0);
      if (style.includes("-")) {
        let direction = style.split("-")[1].charAt(0);
        abbreviation += direction;
      }
      if (styleValue.includes("px")) {
        styleNumber = styleNumber / 16;
        tailwindValue = getClosestValue(sizes, styleNumber * 4);
      } else if (styleValue.includes("rem")) {
        tailwindValue = getClosestValue(sizes, styleNumber * 4);
      } else if (styleValue.includes("%")) {
        if (style === "margin" || style === "padding") {
          continue;
        }
        let tailwindDecimal = getClosestValue(
          Object.keys(percentages),
          styleNumber / 100
        );
        tailwindValue = percentages[tailwindDecimal as keyof object];
      } else if (style === "width" || style === "height") {
        tailwindValue = get(spacingCustom, styleValue, "");
      }
    } else if (style === "font-size") {
      // font-size
      abbreviation = "text";
      let size = "";
      if (styleValue.includes("px")) {
        styleNumber = styleNumber / 16;
        size = getClosestValue(Object.keys(fontSize), styleNumber);
      } else if (styleValue.includes("rem")) {
        size = getClosestValue(Object.keys(fontSize), styleNumber);
      }
      tailwindValue = get(fontSize, size, "");
    } // font-weight
    else if (style === "font-weight") {
      abbreviation = "font";
      tailwindValue = get(fontWeight, styleNumber, "");
    } // font-style
    else if (style === "font-style") {
      tailwindValue = styleValue === "italic" ? "italic" : "non-italic";
    } // display
    else if (style === "display") {
      tailwindValue = styleValue === "none" ? "hidden" : styleValue;
    } else if (style === "position") {
      tailwindValue = styleValue;
    } else {
      tailwindValue = mainDict[style][styleValue];
    }
    result.push(
      abbreviation ? (abbreviation += "-" + tailwindValue) : tailwindValue
    );
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
