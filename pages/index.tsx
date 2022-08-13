import type { NextPage } from "next";
import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import { css_beautify, html_beautify } from "js-beautify";
import { injectClass, cssToJson, initialCSS, initialHTML } from "../src/helper";

const syncButtonPosition = {
  left: "calc(50% - 5rem)"
};

const customFontSize = {
  fontSize: "0.65rem"
};

const formatButtonPosition = {
  left: "calc(50% - 11rem)"
};

const Home: NextPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [cssText, setCssText] = useState("");
  const [htmlText, setHtmlText] = useState("");
  const [tailwindText, setTailwindText] = useState("");
  const [copied, setCopied] = useState(false);
  const [synced, setSynced] = useState(false);
  const [tidy, setTidy] = useState(false);
  const copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(tailwindText);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const codepenOriginal = JSON.stringify({
    title: "Original HTML/CSS",
    html: htmlText,
    css: cssText
  });
  const codepenTailwind = JSON.stringify({
    title: "Tailwind version",
    html: tailwindText,
    css_external:
      "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
  });

  const formatHtmlCss = () => {
    setCssText(
      css_beautify(cssText, { indent_size: 2, max_preserve_newlines: 0 })
    );
    setHtmlText(
      html_beautify(htmlText, {
        indent_size: 2,
        extra_liners: [],
        wrap_line_length: 40,
        max_preserve_newlines: 0
      })
    );
  };

  const formatCode = () => {
    setTidy(true);
    formatHtmlCss();
    setTimeout(() => {
      setTidy(false);
    }, 1000);
  };
  const updateTailwind = () => {
    const cssAttributes = cssToJson(
      localStorage.css ? localStorage.css : initialCSS
    );
    let result = localStorage.html ? localStorage.html : initialHTML;
    cssAttributes.forEach((attr) => {
      result = injectClass(result, attr);
    });
    setTailwindText(result);
  };
  const syncButton = () => {
    setSynced(true);
    formatHtmlCss();
    updateTailwind();
    setTimeout(() => {
      setSynced(false);
    }, 1000);
  };
  useEffect(
    () => setCssText(localStorage.css ? localStorage.css : initialCSS),
    []
  );
  useEffect(() => {
    setHtmlText(localStorage.html ? localStorage.html : initialHTML);
    updateTailwind();
  }, []);
  useEffect(() => {
    if (localStorage.darkMode) {
      setDarkMode(JSON.parse(localStorage.darkMode));
    }
  }, []);
  useEffect(() => {
    if (cssText) {
      localStorage.css = cssText;
    }
  }, [cssText]);
  useEffect(() => {
    if (htmlText) {
      localStorage.html = htmlText;
    }
  }, [htmlText]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="w-full h-screen flex-col overflow-hidden dark:bg-gray-800 bg-white">
        <div className="w-screen">
          <div className="flex absolute left-2">
            <input
              type="checkbox"
              className="toggle toggle-md"
              checked={darkMode}
              onChange={() => {
                setDarkMode(!darkMode);
                localStorage.darkMode = !darkMode;
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke={darkMode ? "#f0f6f9" : "#000"}
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </div>
          <div className="flex mt-2 w-1/2 justify-end mb-1">
            <form
              action="https://codepen.io/pen/define"
              method="POST"
              target="_blank"
            >
              <input type="hidden" name="data" value={codepenOriginal} />
              <button
                className="btn btn-sm btn-primary bg-sky-500 hover:bg-sky-400 border-none mr-2 -mt-0.5"
                type="submit"
                title="codepen preview"
                value=""
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="flex right-4 top-2 absolute">
            <form
              action="https://codepen.io/pen/define"
              method="POST"
              target="_blank"
            >
              <input type="hidden" name="data" value={codepenTailwind} />
              <button
                className="btn btn-sm btn-primary bg-sky-500 hover:bg-sky-400 border-none -mt-0.5"
                type="submit"
                title="codepen preview"
                value=""
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </button>
            </form>
            <div>
              <label htmlFor="my-modal-4" className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-4"
                  fill={darkMode ? "#f0f6f9" : "#000"}
                  viewBox="4 4 16 16"
                  stroke={darkMode ? "#282c34" : "#fff"}
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
                fill={darkMode ? "#f0f6f9" : "#000"}
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
        <div className="flex h-screen">
          <div className="w-1/2">
            <CodeMirror
              className="h-1/2 text-base"
              value={htmlText}
              height="100%"
              theme={darkMode ? oneDark : "light"}
              extensions={[html()]}
              onChange={(value) => {
                setHtmlText(value);
              }}
            />
            <CodeMirror
              className="h-1/2 text-base"
              value={cssText}
              height="100%"
              theme={darkMode ? oneDark : "light"}
              extensions={[css()]}
              onChange={(value) => {
                setCssText(value);
              }}
            />
            <div className="absolute bottom-2" style={formatButtonPosition}>
              {tidy ? (
                <button
                  className="btn btn-xs btn-primary bg-sky-500 hover:bg-sky-400 border-none mb-0.5"
                  style={customFontSize}
                >
                  Formatted!
                </button>
              ) : (
                <button
                  className="btn btn-xs btn-primary bg-sky-500 hover:bg-sky-400 border-none"
                  title="format code"
                  onClick={formatCode}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                  Format
                </button>
              )}
            </div>
            <div className="absolute bottom-2" style={syncButtonPosition}>
              {synced ? (
                <button className="btn btn-xs btn-primary bg-sky-500 hover:bg-sky-400 border-none mb-0.5">
                  Synced!
                </button>
              ) : (
                <button
                  className="btn btn-xs btn-primary bg-sky-500 hover:bg-sky-400 border-none"
                  title="convert code"
                  onClick={syncButton}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Sync
                </button>
              )}
            </div>
          </div>
          <div className="w-1/2">
            <CodeMirror
              className="h-full text-base"
              value={tailwindText}
              readOnly={true}
              height="100%"
              theme={darkMode ? oneDark : "light"}
              extensions={[html()]}
            />
            <div className="bottom-2 right-4 absolute">
              {copied ? (
                <button className="btn btn-xs bg-gray-100 text-black hover:bg-gray-200 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 border-none mb-0.5">
                  Copied!
                </button>
              ) : (
                <button
                  className="btn btn-xs bg-gray-100 text-black hover:bg-gray-200 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 border-none "
                  onClick={copyToClipboard}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Copy
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
