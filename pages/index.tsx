import type { NextPage } from "next";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import { injectClass } from "../src/helper";

const Home: NextPage = () => {
  const initialCSS = `/* Edit CSS here */ \nbody {\n  margin: 1rem;  \n  padding: 1rem; \n  font-size: 1rem; \n}`;
  const initialHTML = `<!-- Edit HTML here --> \n<html lang="">\n  <body>\n  </body>\n</html>`;
  const [cssText, setCssText] = useState(initialCSS);
  const [htmlText, setHtmlText] = useState(initialHTML);
  const result = injectClass(htmlText, "body", ["margin", "padding", "border"]);
  return (
    <div className="flex">
      <div className="w-1/2 h-screen">
        <CodeMirror
          className="h-1/2 text-base"
          value={htmlText}
          height="100%"
          theme={oneDark}
          extensions={[html()]}
          onChange={(value) => {
            setHtmlText(value);
          }}
        />
        <CodeMirror
          className="h-1/2 text-base"
          value={cssText}
          height="100%"
          theme={oneDark}
          extensions={[css()]}
          onChange={(value) => {
            setCssText(value);
          }}
        />
      </div>
      <div className="w-1/2">
        <CodeMirror
          className="h-screen text-base"
          value={result}
          readOnly={true}
          height="100%"
          theme={oneDark}
          extensions={[html()]}
        />
      </div>
    </div>
  );
};

export default Home;
