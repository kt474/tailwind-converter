import { trim, get, remove } from "lodash";
//@ts-ignore
import { toJSON } from "cssjson";
//@ts-ignore
import NearestColor from "nearest-color";
import { colorCodes } from "./tailwindColors";
import {
  duration,
  opacity,
  borderValues,
  zIndex,
  letterSpacing,
  spacingValues,
  sizes,
  spacing,
  percentages,
  spacingCustom,
  fontSize,
  fontWeight,
  mainDict,
  columnSizes,
  colorDict,
  lineHeight,
  rotate,
  skew,
  scale,
  translate,
  blur,
  brightness,
  contrast,
  hueRotate,
  saturate,
  borderRadius,
  maxWidth
} from "./tailwindStyles";

export const initialCSS = `/* Edit CSS here */
body {
  margin: 1rem;
  padding: 1rem;
}

.main {
  text-align: center;
}

h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: blue;
}`;
export const initialHTML = `<!-- Edit HTML here -->
<html lang="en">
<body>
  <div class="main">
    <h2>Welcome to Tailwind Converter!</h2>
    <p>Edit/paste HTML here and CSS into
      the editor below
    </p>
  </div>
</body>
</html>`;

const getClosestValue = (sizes: Array<any>, value: number) => {
  return sizes.reduce((prev: number, curr: number) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
};

export const convertAttributes = (attributes: { [index: string]: any }) => {
  let result = [];
  let style: string;
  for (style in attributes) {
    let negativeValue: boolean = false;
    let styleValue: any = attributes[style];
    // TODO Refactor this bc there can be multiple filters
    if (Array.isArray(styleValue)) styleValue = styleValue[0];
    styleValue = styleValue.toLowerCase();
    let styleNumber: number = parseFloat(styleValue.replace(/[^-.\d]/g, ""));
    if (
      styleNumber < 0 &&
      styleValue.includes("hue-rotate") &&
      styleValue[0] !== "-"
    ) {
      styleNumber = Math.abs(styleNumber);
    } else if (styleNumber < 0) {
      styleNumber = Math.abs(styleNumber);
      negativeValue = true;
    }
    let tailwindValue: string | number = "";
    let abbreviation: string = "";
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
      abbreviation = "text";
      let size = "";
      if (styleValue.includes("px")) {
        styleNumber = styleNumber / 16;
        size = getClosestValue(Object.keys(fontSize), styleNumber);
      } else if (styleValue.includes("rem")) {
        size = getClosestValue(Object.keys(fontSize), styleNumber);
      }
      tailwindValue = get(fontSize, size, "");
    } else if (style === "font-weight") {
      abbreviation = "font";
      tailwindValue = get(fontWeight, styleNumber, "");
    } else if (style === "font-style") {
      tailwindValue = styleValue === "italic" ? "italic" : "non-italic";
    } else if (style === "display") {
      tailwindValue = styleValue === "none" ? "hidden" : styleValue;
    } else if (style === "position") {
      tailwindValue = styleValue;
    } else if (style === "z-index") {
      abbreviation = "z";
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
        tailwindValue = getClosestValue(borderValues, styleNumber);
      } else break;
    } else if (style === "text-underline-offset") {
      abbreviation = "underline-offset";
      if (styleValue === "auto") {
        tailwindValue = styleValue;
      } else if (styleNumber) {
        tailwindValue = getClosestValue(borderValues, styleNumber);
      } else break;
    } else if (style === "text-indent") {
      abbreviation = "indent";
      if (styleValue === "1px") {
        tailwindValue = "px";
      } else if (styleValue.includes("px")) {
        styleNumber = styleNumber / 16;
      }
      tailwindValue = getClosestValue(sizes, styleNumber * 4);
    } else if (style === "outline-width") {
      abbreviation = "outline";
      tailwindValue = getClosestValue(borderValues, styleNumber);
    } else if (style === "outline-offset") {
      abbreviation = "outline-offset";
      tailwindValue = getClosestValue(borderValues, styleNumber);
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
      if (styleNumber === -9999) tailwindValue = "first";
      else if (styleNumber === 9999) tailwindValue = "last";
      else if (styleNumber === 0) tailwindValue = "none";
      else if (Number(styleNumber) <= 12) {
        tailwindValue = String(styleNumber);
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
    } else if (style === "columns") {
      abbreviation = "columns";
      let size = 0;
      if ((styleValue <= 12 && styleValue > 0) || styleValue === "auto") {
        tailwindValue = styleValue;
      } else if (styleValue.includes("px")) {
        styleNumber = styleNumber / 16;
        size = getClosestValue(Object.keys(columnSizes), styleNumber);
      } else if (styleValue.includes("rem")) {
        size = getClosestValue(Object.keys(columnSizes), styleNumber);
      }
      if (size) {
        tailwindValue = columnSizes[size];
      }
    } else if (Object.keys(colorDict).includes(style)) {
      try {
        abbreviation = colorDict[style];
        if (styleValue === "inherit") tailwindValue = "inherit";
        else if (styleValue === "currentcolor") tailwindValue = "current";
        else if (styleValue === "transparent") tailwindValue = "transparent";
        else if (styleValue === "none") tailwindValue = "none";
        else {
          //only hex #ff0000 and rgb values rgb(255, 0, 0) are currently supported
          console.log(styleValue);
          tailwindValue = NearestColor.from(colorCodes)(styleValue).name;
        }
      } catch (e) {
        console.error(`Invalid color: ${e}`);
      }
    } else if (style === "font-family") {
      abbreviation = "font";
      if (styleValue.includes("sans-serif")) tailwindValue = "sans";
      else if (styleValue.includes("serif")) tailwindValue = "serif";
      else if (styleValue.includes("monospace")) tailwindValue = "mono";
    } else if (style === "text-overflow") {
      abbreviation = "text";
      if (styleValue === "ellipsis") tailwindValue = "ellipsis";
      else if (styleValue === "clip") tailwindValue = "clip";
    } else if (style === "overflow-wrap") {
      abbreviation = "break";
      if (styleValue === "normal") tailwindValue = "normal";
      else if (styleValue === "break-word") tailwindValue = "words";
    } else if (style === "word-break") {
      abbreviation = "break";
      if (styleValue === "break-all") tailwindValue = "all";
      else if (styleValue === "keep-all") tailwindValue = "keep";
    } else if (style === "line-height") {
      abbreviation = "leading";
      if (styleValue.includes("px")) {
        styleNumber = styleNumber / 16;
      }
      let height = getClosestValue(Object.keys(lineHeight), styleNumber);
      tailwindValue = lineHeight[height];
    } else if (
      style.includes("scroll-margin") ||
      style.includes("scroll-padding")
    ) {
      abbreviation = style.includes("scroll-margin") ? "scroll-m" : "scroll-p";
      if (styleValue.includes("px")) {
        styleNumber = styleNumber / 16;
      }
      tailwindValue = getClosestValue(sizes, styleNumber * 4);
      if (style.includes("top")) abbreviation += "t";
      if (style.includes("bottom")) abbreviation += "b";
      if (style.includes("right")) abbreviation += "r";
      if (style.includes("left")) abbreviation += "l";
      if (styleValue === "1px") tailwindValue = "px";
    } else if (style === "transform") {
      if (styleValue.includes("skew")) {
        abbreviation = styleValue.includes("skewx") ? "skew-x" : "skew-y";
        tailwindValue = getClosestValue(skew, styleNumber);
      } else if (styleValue.includes("rotate")) {
        abbreviation = "rotate";
        tailwindValue = getClosestValue(rotate, styleNumber);
      } else if (styleValue.includes("scale")) {
        abbreviation = "scale";
        if (styleValue.includes("scalex")) abbreviation += "-x";
        else if (styleValue.includes("scaley")) abbreviation += "-y";
        tailwindValue = getClosestValue(scale, styleNumber * 100);
      } else if (styleValue.includes("translate")) {
        abbreviation = styleValue.includes("translatex")
          ? "translate-x"
          : "translate-y";
        if (styleValue.includes("px")) {
          if (styleNumber == 1) tailwindValue = "px";
          styleNumber = styleNumber / 16;
        }
        if (tailwindValue != "px") {
          tailwindValue = getClosestValue(sizes, styleNumber * 4);
        }
        if (styleValue.includes("%")) {
          let translateValue = getClosestValue(
            Object.keys(translate),
            styleNumber
          );
          tailwindValue = translate[translateValue];
        }
      }
    } else if (style === "scroll-snap-type") {
      abbreviation = "snap";
      if (styleValue === "none") tailwindValue = "none";
    } else if (style === "flex-basis") {
      abbreviation = "basis";
      if (styleValue.includes("px")) {
        if (styleNumber == 1) tailwindValue = "px";
        styleNumber = styleNumber / 16;
      }
      if (
        tailwindValue != "px" &&
        !styleValue.includes("%") &&
        validValue(styleValue)
      ) {
        tailwindValue = getClosestValue(sizes, styleNumber * 4);
      }
      if (styleValue === "auto") {
        tailwindValue = "auto";
      }
      if (styleValue.includes("%")) {
        let tailwindDecimal = getClosestValue(
          Object.keys(percentages),
          styleNumber / 100
        );
        tailwindValue = percentages[tailwindDecimal as keyof object];
      }
    } else if (["top", "bottom", "right", "left"].includes(style)) {
      abbreviation = style;
      if (styleValue.includes("px")) {
        if (styleNumber == 1) tailwindValue = "px";
        styleNumber = styleNumber / 16;
      }
      if (
        tailwindValue != "px" &&
        !styleValue.includes("%") &&
        validValue(styleValue)
      ) {
        tailwindValue = getClosestValue(sizes, styleNumber * 4);
      }
      if (styleValue === "auto") {
        tailwindValue = "auto";
      }
      if (styleValue.includes("%")) {
        let tailwindDecimal = getClosestValue(
          Object.keys(percentages),
          styleNumber / 100
        );
        tailwindValue = percentages[tailwindDecimal as keyof object];
      }
    } else if (style.includes("border") && style.includes("width")) {
      abbreviation = "border";
      tailwindValue = getClosestValue(borderValues, styleNumber);
      if (style.includes("top")) abbreviation += "-t";
      if (style.includes("bottom")) abbreviation += "-b";
      if (style.includes("left")) abbreviation += "-l";
      if (style.includes("right")) abbreviation += "-r";
      if (tailwindValue === 1) {
        tailwindValue = abbreviation;
        abbreviation = "";
      }
    } else if (style === "border-radius") {
      if (validValue(styleValue)) {
        abbreviation = "rounded";
        if (styleValue.includes("px")) {
          styleNumber = styleNumber / 16;
        }
        let size = getClosestValue(Object.keys(borderRadius), styleNumber);
        tailwindValue = borderRadius[size];
        if (tailwindValue === "") {
          abbreviation = "";
          tailwindValue = "rounded";
        }
      }
    } else if (style === "max-height") {
      abbreviation = "max-h";
      const maxHeightValues: { [index: string]: any } = {
        "100%": "full",
        "100vh": "screen",
        "min-content": "min",
        "max-content": "max",
        "fit-content": "fit"
      };
      if (styleValue === "1px") {
        tailwindValue = "px";
      } else if (validValue(styleValue)) {
        if (styleValue.includes("px")) {
          styleNumber = styleNumber / 16;
        }
        tailwindValue = getClosestValue(sizes, styleNumber * 4);
      } else if (Object.keys(maxHeightValues).includes(styleValue)) {
        tailwindValue = maxHeightValues[styleValue];
      }
    } else if (style === "max-width") {
      abbreviation = "max-w";
      const maxWidthValues: { [index: string]: any } = {
        "100%": "full",
        "min-content": "min",
        "max-content": "max",
        "fit-content": "fit"
      };
      if (styleValue === "none") tailwindValue = "none";
      else if (validValue(styleValue)) {
        if (styleValue.includes("px")) {
          styleNumber = styleNumber / 16;
        }
        let size = getClosestValue(Object.keys(maxWidth), styleNumber);
        tailwindValue = maxWidth[size];
      } else if (Object.keys(maxWidthValues).includes(styleValue)) {
        tailwindValue = maxWidthValues[styleValue];
      }
    }
    if (style === "filter" || style === "backdrop-filter") {
      //TODO Refactor because there can be multiple filters
      if (styleValue.includes("blur")) {
        if (styleValue.includes("rem")) {
          styleNumber = styleNumber * 16;
        }
        if (validValue(styleValue)) {
          abbreviation = "blur";
          let size = getClosestValue(Object.keys(blur), styleNumber);
          tailwindValue = blur[size];
          if (!tailwindValue) {
            abbreviation = "";
            tailwindValue = "blur";
          }
        }
      } else if (styleValue.includes("brightness")) {
        abbreviation = "brightness";
        tailwindValue = getClosestValue(brightness, styleNumber * 100);
      } else if (styleValue.includes("contrast")) {
        abbreviation = "contrast";
        tailwindValue = getClosestValue(contrast, styleNumber * 100);
      } else if (styleValue.includes("hue-rotate")) {
        abbreviation = "hue-rotate";
        tailwindValue = getClosestValue(hueRotate, styleNumber);
      } else if (styleValue.includes("saturate")) {
        abbreviation = "saturate";
        tailwindValue = getClosestValue(saturate, styleNumber * 100);
      }
      if (
        (style === "backdrop-filter" && abbreviation != "") ||
        styleValue.includes("opacity")
      ) {
        abbreviation = "backdrop-" + abbreviation;
        if (styleValue.includes("opacity")) {
          abbreviation += "opacity";
          tailwindValue = getClosestValue(opacity, styleNumber * 100);
        }
      }
    }
    if (tailwindValue !== "") {
      if (negativeValue) abbreviation = "-" + abbreviation;
      result.push(
        abbreviation ? (abbreviation += "-" + tailwindValue) : tailwindValue
      );
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

export const injectClass = (htmlText: string, attribute: object[]) => {
  htmlText = htmlText.replace(
    "<!-- Edit HTML here -->",
    "<!-- HTML with Tailwind -->"
  );
  attribute.forEach((obj) => {
    for (const [key, value] of Object.entries(obj)) {
      if (key.includes(".")) {
        const regex = new RegExp("\\b" + key.slice(1) + "\\b", "g");
        htmlText = htmlText.replaceAll(regex, value);
      } else {
        let keyString = `<${key}`;
        let replaceString = `${keyString} class="${value}"`;
        htmlText = htmlText.replaceAll(keyString, replaceString);
      }
    }
  });
  return removeExtraClasses(htmlText);
};

const removeExtraClasses = (htmlText: string) => {
  let result: any[] = [];
  let splitText = htmlText.split("\n");
  splitText.forEach((line: string) => {
    let count = (line.match(/class/g) || []).length;
    if (count === 2) {
      result.push(consolidateClasses(line));
    } else {
      result.push(line);
    }
  });
  return result.join("\n");
};

const consolidateClasses = (inputString: string) => {
  // Regular expression to find all class attributes and their values
  let classRegex = /class="([^"]*)"/g;

  // Extract all class attribute values
  let matches: any[] | null = inputString.match(classRegex);

  // Consolidate class names
  let consolidatedClasses: string[] = [];
  if (!matches) return inputString;
  for (let i = 0; i < matches.length; i++) {
    let classes = matches[i].match(/class="([^"]*)"/)[1].split(" ");
    consolidatedClasses = consolidatedClasses.concat(classes);
  }
  // Remove duplicate class names
  consolidatedClasses = Array.from(new Set(consolidatedClasses));

  // Build the new class attribute
  let newClassAttribute = 'class="' + consolidatedClasses.join(" ") + '"';

  // Replace existing class attributes with the new one
  let outputString = inputString.replace(classRegex, "");
  let classCarrot = outputString.indexOf(">");
  let result =
    outputString.slice(0, classCarrot - 1) +
    newClassAttribute +
    outputString.slice(classCarrot);
  return result;
};

export const validValue = (value: string) => {
  if (value.includes("px") || value.includes("rem")) {
    return true;
  }
  return false;
};
