import { convertAttributes } from "./converter";

export const initialHTML = `<html lang="en">
<body>
  <div class="main">
    <h2>Welcome to Tailwind Converter!</h2>
    <p>Edit/paste HTML here and CSS into
      the editor below
    </p>
  </div>
</body>
</html>`;

export const initialCSS = `body {
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

type CSSProperties = {
  [property: string]: string;
};

type CSSJson = {
  [selector: string]: CSSProperties;
};

export const cssToJson = (css: string): { [index: string]: string }[] => {
  const json: CSSJson = {};

  // Remove comments and normalize whitespace
  css = css
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove CSS comments
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim(); // Remove leading/trailing whitespace

  // Process each CSS rule
  const regex = /([^{]+){([^}]+)}/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(css)) !== null) {
    const selector = match[1].trim();
    const style: CSSProperties = {};

    // Process declarations
    const declarations = match[2].split(";");
    declarations.forEach((declaration: string) => {
      const parts = declaration.split(":");
      if (parts.length === 2) {
        const property = parts[0].trim();
        const value = parts[1].trim();

        if (property && value) {
          style[property] = value;
        }
      }
    });

    // Only add non-empty style objects
    if (Object.keys(style).length > 0) {
      json[selector] = style;
    }
  }
  const result = [];
  for (const className in json) {
    const obj: { [index: string]: string } = {};
    obj[className] = convertAttributes(json[className]).join(" ");
    result.push(obj);
  }
  return result;
};

export const getClosestValue = (sizes: (string | number)[], value: number) => {
  return sizes.reduce(
    (prev: number, curr: string | number) => {
      const currNum = typeof curr === "string" ? parseFloat(curr) : curr;
      const prevNum = typeof prev === "string" ? parseFloat(prev) : prev;

      return Math.abs(currNum - value) < Math.abs(prevNum - value)
        ? currNum
        : prevNum;
    },
    typeof sizes[0] === "string" ? parseFloat(sizes[0]) : sizes[0]
  );
};

export const validValue = (value: string) => {
  return value.includes("px") || value.includes("rem") ? true : false;
};

export const injectClass = (htmlText: string, attribute: object[]) => {
  attribute.forEach((obj) => {
    for (const [key, value] of Object.entries(obj)) {
      if (key.includes(".")) {
        const regex = new RegExp("\\b" + key.slice(1) + "\\b", "g");
        htmlText = htmlText.replaceAll(regex, value);
      } else {
        const keyString = `<${key}`;
        const replaceString = `${keyString} class="${value}"`;
        htmlText = htmlText.replaceAll(keyString, replaceString);
      }
    }
  });
  return removeExtraClasses(htmlText);
};

const removeExtraClasses = (htmlText: string) => {
  const result: string[] = [];
  const splitText = htmlText.split("\n");
  splitText.forEach((line: string) => {
    const count = (line.match(/class/g) || []).length;
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
  const classRegex = /class="([^"]*)"/g;

  // Extract all class attribute values
  const matches: string[] | null = inputString.match(classRegex);

  // Consolidate class names
  let consolidatedClasses: string[] = [];
  if (!matches) return inputString;
  for (let i = 0; i < matches.length; i++) {
    const classes = matches[i].match(/class="([^"]*)"/)![1].split(" ");
    consolidatedClasses = consolidatedClasses.concat(classes);
  }
  // Remove duplicate class names
  consolidatedClasses = Array.from(new Set(consolidatedClasses));

  // Build the new class attribute
  const newClassAttribute = 'class="' + consolidatedClasses.join(" ") + '"';

  // Replace existing class attributes with the new one
  const outputString = inputString.replace(classRegex, "");
  const classCarrot = outputString.indexOf(">");
  const result =
    outputString.slice(0, classCarrot - 1) +
    newClassAttribute +
    outputString.slice(classCarrot);
  return result;
};
