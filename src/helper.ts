import { trim, get } from "lodash";
//@ts-ignore
import { toJSON } from "cssjson";
import {
  duration,
  opacity,
  textDecorationValues,
  zIndex,
  letterSpacing,
  spacingValues,
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

export const convertAttributes = (attributes: object) => {
  let result = [];
  for (let style in attributes) {
    // @ts-ignore
    let styleValue = attributes[style];
    let styleNumber = styleValue.replace(/[^-.\d]/g, "");
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
    } else if (style === "z-index") {
      abbreviation = "z-index";
      tailwindValue =
        styleValue === "auto" ? "auto" : getClosestValue(zIndex, styleValue);
    } else if (style === "letter-spacing") {
      abbreviation = "tracking";
      let spacingNumber = getClosestValue(letterSpacing, styleNumber);
      tailwindValue = spacingValues[letterSpacing.indexOf(spacingNumber)];
    } else if (style === "text-decoration-thickness") {
      abbreviation = "decoration";
      if (styleValue === "auto" || styleValue === "from-font") {
        tailwindValue = styleValue;
      } else if (styleNumber) {
        tailwindValue = getClosestValue(textDecorationValues, styleNumber);
      } else break;
    } else if (style === "text-underline-offset") {
      abbreviation = "underline-offset";
      if (styleValue === "auto") {
        tailwindValue = styleValue;
      } else if (styleNumber) {
        tailwindValue = getClosestValue(textDecorationValues, styleNumber);
      } else break;
    } else if (style === "text-indent") {
      abbreviation = "indent";
      if (styleValue === "1px") {
        tailwindValue = "px";
      } else if (styleValue.includes("px")) {
        styleNumber = styleNumber / 16;
        tailwindValue = getClosestValue(sizes, styleNumber * 4);
      }
    } else if (style === "outline-width") {
      abbreviation = "outline";
      tailwindValue = getClosestValue(textDecorationValues, styleNumber);
    } else if (style === "outline-offset") {
      abbreviation = "outline-offset";
      tailwindValue = getClosestValue(textDecorationValues, styleNumber);
    } else if (style === "opacity") {
      abbreviation = "opacity";
      tailwindValue = getClosestValue(opacity, styleNumber * 100);
    } else if (style === "cursor") {
      abbreviation = "cursor";
      tailwindValue = styleValue;
    } else if (style === "transition-duration") {
      abbreviation = "duration";
      if (!styleValue.includes("ms")) styleNumber = styleNumber * 1000;
      tailwindValue = getClosestValue(duration, styleNumber);
    } else if (style === "transition-delay") {
      abbreviation = "delay";
      if (!styleValue.includes("ms")) styleNumber = styleNumber * 1000;
      tailwindValue = getClosestValue(duration, styleNumber);
    } else if (style === "order") {
      abbreviation = "order";
      if (styleNumber === "-9999") tailwindValue = "first";
      else if (styleNumber === "9999") tailwindValue = "last";
      else if (styleNumber === "0") tailwindValue = "none";
      else if (Number(styleNumber) <= 12) {
        tailwindValue = styleNumber;
      }
    } else if (style === "gap") {
      abbreviation = "gap";
      if (styleValue.includes("px")) {
        styleNumber = styleNumber / 16;
      }
      tailwindValue = getClosestValue(sizes, styleNumber * 4);
    } else if (style === "column-gap") {
      abbreviation = "gap-x";
      if (styleValue.includes("px")) {
        styleNumber = styleNumber / 16;
      }
      tailwindValue = getClosestValue(sizes, styleNumber * 4);
    } else if (style === "row-gap") {
      abbreviation = "gap-y";
      if (styleValue.includes("px")) {
        styleNumber = styleNumber / 16;
      }
      tailwindValue = getClosestValue(sizes, styleNumber * 4);
    } else if (style === "-webkit-font-smoothing") {
      if (styleValue === "antialiased") tailwindValue = "antialiased";
      else if (styleValue === "auto") tailwindValue = "subpixel-antialiased";
    } else if (style in mainDict) {
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
