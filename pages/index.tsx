import type { NextPage } from "next";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import {
  injectClass,
  cssToJson,
  initialCSS,
  initialHTML,
  initialTailwind
} from "../src/helper";

const Home: NextPage = () => {
  const [cssText, setCssText] = useState(initialCSS);
  const [htmlText, setHtmlText] = useState(initialHTML);
  const cssAttributes = cssToJson(cssText);
  const [tailwindText, setTailwindText] = useState(initialTailwind);
  function updateTailwind() {
    let result = htmlText;
    cssAttributes.forEach((attr) => {
      result = injectClass(result, attr);
    });
    setTailwindText(result);
  }

  return (
    <>
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
            value={tailwindText}
            readOnly={true}
            height="100%"
            theme={oneDark}
            extensions={[html()]}
          />
        </div>
      </div>
      <div className="absolute bottom-6 right-6">
        <button className="btn btn-md btn-primary" onClick={updateTailwind}>
          Sync
        </button>
      </div>
    </>
  );
};

export default Home;
