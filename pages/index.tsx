import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
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

const resetButtonPosition = {
  left: "calc(50% - 16rem)"
};

const maxHeight = {
  maxHeight: "calc(50% - 1.25rem)"
};

const updateTailwind = (html: string, css: string) => {
  const cssAttributes = cssToJson(localStorage.css ? localStorage.css : css);
  let result = localStorage.html ? localStorage.html : html;
  return html_beautify(
    injectClass(result.replace(/=(?:')([^']+)'/g, '="$1"'), cssAttributes),
    {
      indent_size: 2,
      extra_liners: [],
      wrap_line_length: 70,
      max_preserve_newlines: 0
    }
  );
};

const Home: NextPage = () => {
  const [alert, setAlert] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [cssText, setCssText] = useState("");
  const [htmlText, setHtmlText] = useState("");
  const [tailwindText, setTailwindText] = useState("");
  const [copied, setCopied] = useState(false);
  const [synced, setSynced] = useState(false);
  const [tidy, setTidy] = useState(false);

  useEffect(() => {
    if (!localStorage.alert) {
      setAlert(true);
      const timer = setTimeout(() => {
        setAlert(false);
        localStorage.setItem("alert", "true");
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, []);
  const copyToClipboard = () => {
    setCopied(true);
    navigator.clipboard.writeText(tailwindText);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const firstSync = useRef(false);
  const codepenOriginal = JSON.stringify({
    title: "Original HTML/CSS",
    html: htmlText,
    css: cssText
  });
  const codepenTailwind = JSON.stringify({
    title: "Tailwind version",
    html: tailwindText,
    head: '<script src="https://cdn.tailwindcss.com"></script>'
  });

  const formatHtmlCss = () => {
    setCssText(
      css_beautify(cssText, { indent_size: 2, max_preserve_newlines: 0 })
    );
    setHtmlText(
      html_beautify(htmlText.replace(/=(?:')([^']+)'/g, '="$1"'), {
        indent_size: 2,
        extra_liners: [],
        wrap_line_length: 70,
        max_preserve_newlines: 0
      })
    );
  };

  const resetButton = () => {
    setCssText(initialCSS);
    setHtmlText(initialHTML);
  };

  const formatCode = () => {
    setTidy(true);
    formatHtmlCss();
    setTimeout(() => {
      setTidy(false);
    }, 1000);
  };
  const syncButton = () => {
    setSynced(true);
    formatHtmlCss();
    setTailwindText(updateTailwind(htmlText, cssText));
    setTimeout(() => {
      setSynced(false);
    }, 1000);
  };
  useEffect(
    () => setCssText(localStorage.css ? localStorage.css : initialCSS),
    []
  );
  useEffect(
    () => setHtmlText(localStorage.html ? localStorage.html : initialHTML),
    []
  );
  useEffect(() => {
    if (!firstSync.current && htmlText && cssText) {
      setTailwindText(updateTailwind(htmlText, cssText));
      firstSync.current = true;
    }
  }, [htmlText, cssText]);
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
      <div className="relative h-screen w-full flex-col overflow-hidden bg-slate-200 dark:bg-zinc-800">
        <div className="w-screen">
          <div className="absolute left-2 flex">
            {darkMode ? (
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  localStorage.darkMode = !darkMode;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#fff"
                  className="ml-2 h-6 w-6 hover:stroke-slate-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  localStorage.darkMode = !darkMode;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-6 w-6 hover:stroke-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#000"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="mb-1 mt-2 flex w-1/2 justify-end">
            <div
              className="tooltip tooltip-bottom z-50 mr-3"
              data-tip="Codepen preview"
            >
              <form
                action="https://codepen.io/pen/define"
                method="POST"
                target="_blank"
              >
                <input type="hidden" name="data" value={codepenOriginal} />
                <button type="submit" title="codepen preview" value="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    fill={darkMode ? "#000" : "#f0f6f9"}
                    stroke={darkMode ? "#f0f6f9" : "#000"}
                    className="h-6 w-6 hover:stroke-slate-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          <div className="absolute right-4 top-2 flex">
            <div
              className="tooltip tooltip-bottom z-50 mr-6"
              data-tip="Codepen preview"
            >
              <form
                action="https://codepen.io/pen/define"
                method="POST"
                target="_blank"
              >
                <input type="hidden" name="data" value={codepenTailwind} />
                <button type="submit" title="codepen preview" value="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    fill={darkMode ? "#000" : "#f0f6f9"}
                    stroke={darkMode ? "#f0f6f9" : "#000"}
                    className="h-6 w-6 hover:stroke-slate-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </button>
              </form>
            </div>
            <div className="tooltip tooltip-bottom z-50 mr-6" data-tip="About">
              <div>
                <label htmlFor="my-modal-4" className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    fill={darkMode ? "#000" : "#f0f6f9"}
                    stroke={darkMode ? "#f0f6f9" : "#000"}
                    className="h-6 w-6 hover:stroke-slate-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </label>

                <input
                  type="checkbox"
                  id="my-modal-4"
                  className="modal-toggle"
                />
                <label
                  htmlFor="my-modal-4"
                  className="modal cursor-pointer text-left"
                >
                  <label className="modal-box relative bg-white text-black dark:bg-zinc-700 dark:text-gray-200">
                    <label
                      htmlFor="my-modal-4"
                      className="btn btn-circle btn-sm absolute right-2 top-2 border-none bg-gray-700 dark:bg-gray-900"
                    >
                      ✕
                    </label>
                    <h3 className="text-lg font-bold">About</h3>
                    <p className="mt-4 text-gray-900 dark:text-gray-300">
                      This web app takes plain HTML/CSS and converts it into a
                      single HTML file with tailwind classes (version 3.4.1).
                      Documentation regarding currently supported classes can be
                      found&nbsp;
                      <a
                        href="https://github.com/kt474/tailwind-converter/blob/main/SupportedClasses.md"
                        className="text-blue-500 dark:text-blue-400"
                        target="_blank"
                        rel="noreferrer"
                      >
                        here
                      </a>
                      .
                    </p>
                    <h3 className="mb-2 mt-4 text-lg font-bold">Note:</h3>
                    <h4 className="mb-2 font-bold">
                      *This project is a work in progress. There may be bugs or
                      incomplete features*
                    </h4>
                    <p className="text-gray-900 dark:text-gray-300">
                      It&apos;s also important to keep in mind that converting
                      an existing project to use Tailwind CSS often involves
                      more than just replacing classes. It may be best to
                      restructure your HTML and/or adjust your design to match
                      the available utility classes. Manual conversion would
                      provide more control over the process and likely ensure a
                      better end result.
                    </p>
                  </label>
                </label>
              </div>
            </div>
            <div className="tooltip tooltip-bottom z-50" data-tip="Github">
              <a
                aria-label="github page"
                href="https://github.com/kt474/tailwind-converter"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill={darkMode ? "#f0f6f9" : "#000"}
                  className="bi bi-github -mr-1 mt-0.5 hover:fill-slate-400"
                  strokeWidth={1.5}
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="flex h-screen">
          <div className="w-1/2">
            <CodeMirror
              aria-label="html input"
              className={`h-1/2 text-base ${!darkMode ? "text-slate-700" : ""}`}
              value={htmlText}
              height="100%"
              theme={darkMode ? oneDark : "light"}
              extensions={[html()]}
              style={maxHeight}
              onChange={(value) => {
                setHtmlText(value);
              }}
            />
            <CodeMirror
              aria-label="css input"
              className={`h-1/2 text-base ${!darkMode ? "text-slate-700" : ""}`}
              value={cssText}
              height="100%"
              style={maxHeight}
              theme={darkMode ? oneDark : "light"}
              extensions={[css()]}
              onChange={(value) => {
                setCssText(value);
              }}
            />
            <div
              className="fixed bottom-2 ml-24 sm:-ml-1 md:absolute"
              style={resetButtonPosition}
            >
              <button
                className="btn btn-xs mb-0.5 border-none bg-slate-300 text-black hover:bg-slate-400 
                dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                onClick={resetButton}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mr-1 h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                  />
                </svg>
                Reset
              </button>
            </div>
            <div
              className="fixed bottom-2 hidden sm:block md:absolute"
              style={formatButtonPosition}
            >
              {tidy ? (
                <button
                  className="btn btn-xs mb-0.5 border-none bg-slate-300 text-black hover:bg-slate-400 
                  dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                  style={customFontSize}
                >
                  Formatted!
                </button>
              ) : (
                <button
                  className="btn btn-xs border-none bg-slate-300 text-black hover:bg-slate-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                  title="format code"
                  onClick={formatCode}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-4 w-4"
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
            <div
              className="fixed bottom-2 md:absolute"
              style={syncButtonPosition}
            >
              {synced ? (
                <button
                  className="btn btn-xs mb-0.5 border-none bg-slate-300 text-black hover:bg-slate-400 
                dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                >
                  Synced!
                </button>
              ) : (
                <button
                  className="btn btn-xs border-none bg-slate-300 text-black hover:bg-slate-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                  title="convert code"
                  onClick={syncButton}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-4 w-4"
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
              aria-label="tailwind html"
              className={`h-full text-base ${
                !darkMode ? "text-slate-700" : ""
              }`}
              value={tailwindText}
              readOnly={true}
              height="100%"
              theme={darkMode ? oneDark : "light"}
              extensions={[html()]}
            />
            <div className="fixed bottom-2 right-4 md:absolute">
              {copied ? (
                <button className="btn btn-xs mb-0.5 border-none bg-slate-300 text-black hover:bg-slate-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500">
                  Copied!
                </button>
              ) : (
                <button
                  className="btn btn-xs border-none bg-slate-300 text-black hover:bg-slate-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 "
                  onClick={copyToClipboard}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 h-4 w-4"
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
      {alert && (
        <div
          role="alert"
          className="alert alert-warning absolute bottom-0 right-0 mb-3 mr-3 max-w-2xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>
            This project is a work in progress. There may be bugs or incomplete
            features.
          </span>
        </div>
      )}
    </div>
  );
};

export default Home;
