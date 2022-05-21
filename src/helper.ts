import { trim } from "lodash";
//@ts-ignore
import { toJSON } from "cssjson";

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

export const cssToJson = (plainText: string) => {
  const cssJson = toJSON(trim(plainText));
  let result = [];
  for (const className in cssJson.children) {
    let obj: { [index: string]: any } = {};
    obj[className] = cssJson.children[className].attributes;
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
  let tailwindString = "";
  let styles = Object.entries(value).flat().join(" ");
  tailwindString += styles;
  if (key.includes(".")) {
    let firstIndex = htmlText.indexOf(key.slice(1));
    return (
      htmlText.slice(0, firstIndex) +
      tailwindString +
      `"` +
      htmlText.slice(firstIndex + key.length)
    );
  } else {
    let firstIndex = htmlText.indexOf(key);
    return (
      htmlText.slice(0, firstIndex + key.length) +
      ` class="` +
      tailwindString +
      `"` +
      htmlText.slice(firstIndex + key.length)
    );
  }
};
