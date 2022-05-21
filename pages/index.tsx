import type { NextPage } from "next";
import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import { injectClass, cssToJson, initialCSS, initialHTML } from "../src/helper";

const Home: NextPage = () => {
  const [cssText, setCssText] = useState(initialCSS);
  const [htmlText, setHtmlText] = useState(initialHTML);
  const cssAttributes = cssToJson(cssText);
  const [tailwindText, setTailwindText] = useState("");
  const updateTailwind = () => {
    let result = htmlText;
    cssAttributes.forEach((attr) => {
      result = injectClass(result, attr);
    });
    setTailwindText(result);
  };

  useEffect(() => {
    updateTailwind();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex">
        <div className="w-1/2 h-screen relative">
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
          <div className="absolute bottom-4 right-4">
            <button className="btn btn-sm btn-info" onClick={updateTailwind}>
              Sync
            </button>
          </div>
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
        <div className="absolute bottom-4 right-4 flex justify-between">
          <div>
            <label htmlFor="my-modal-4" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-4"
                fill="#f0f6f9"
                viewBox="4 4 16 16"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </label>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
              <label className="modal-box relative" htmlFor="">
                <label
                  htmlFor="my-modal-4"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <h3 className="text-lg font-bold">Modal Title</h3>
              </label>
            </label>
          </div>
          <a
            href="https://github.com/kt474/tailwind-converter"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#f0f6f9"
              className="bi bi-github"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
