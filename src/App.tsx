import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { css_beautify, html_beautify } from "js-beautify";
import { initialHTML, initialCSS } from "./util/helper";
import { cssToJson } from "./util/helper";
import { injectClass } from "./util/helper";
import { Header } from "./components/header";
import { Copy, Undo } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Toaster } from "sonner";

function App() {
  const [htmlText, setHtmlText] = useState("");
  const [cssText, setCssText] = useState("");
  const [tailwindText, setTailwindText] = useState("");
  const firstSync = useRef(false);
  const maxHeight = {
    maxHeight: "calc(100% - 5.25rem)"
  };
  const copyToClipboard = () => {
    toast("Copied to clipboard!", {
      duration: 2000
    });
    navigator.clipboard.writeText(tailwindText);
  };

  const reset = () => {
    setHtmlText(initialHTML);
    setCssText(initialCSS);
  };

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

  const getNewHtml = (html: string, css: string) => {
    setCssText(css_beautify(css, { indent_size: 2, max_preserve_newlines: 0 }));
    const cssAttributes = cssToJson(css);
    return html_beautify(
      injectClass(
        html.replace(/=(?:')([^']+)'/g, '="$1"'), // converts single quotes to double
        cssAttributes
      ),
      {
        indent_size: 2,
        extra_liners: [],
        wrap_line_length: 70,
        max_preserve_newlines: 0
      }
    );
  };

  const convertToTailwind = () => {
    setTailwindText(getNewHtml(htmlText, cssText));
    toast("Converted to Tailwind!", {
      duration: 2000
    });
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
      setTailwindText(getNewHtml(htmlText, cssText));
      firstSync.current = true;
    }
  }, [htmlText, cssText]);

  useEffect(() => {
    if (cssText) {
      localStorage.setItem("css", cssText);
    }
  }, [cssText]);
  useEffect(() => {
    if (htmlText) {
      localStorage.setItem("html", htmlText);
    }
  }, [htmlText]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen">
        <Header />
        <ResizablePanelGroup
          direction="horizontal"
          className="h-40 border"
          style={maxHeight}
        >
          <ResizablePanel className="min-w-60">
            <ResizablePanelGroup direction="vertical">
              <div className="flex justify-between">
                <h2 className="p-4 text-lg font-medium">HTML</h2>
                <div className="flex">
                  <Button
                    onClick={() => reset()}
                    variant="outline"
                    size="icon"
                    className="mr-4 mt-3.5 cursor-pointer px-5"
                  >
                    <Undo />
                  </Button>
                  <form
                    action="https://codepen.io/pen/define"
                    method="POST"
                    target="_blank"
                  >
                    <input type="hidden" name="data" value={codepenOriginal} />
                    <Button
                      variant="outline"
                      type="submit"
                      title="codepen preview"
                      value=""
                      className="mr-4 mt-3.5 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                        <line x1="12" x2="12" y1="22" y2="15.5" />
                        <polyline points="22 8.5 12 15.5 2 8.5" />
                        <polyline points="2 15.5 12 8.5 22 15.5" />
                        <line x1="12" x2="12" y1="2" y2="8.5" />
                      </svg>
                    </Button>
                  </form>
                </div>
              </div>
              <ResizablePanel className="min-h-40">
                <CodeMirror
                  aria-label="html input"
                  className="relative h-full text-sm dark:hidden"
                  value={htmlText}
                  height="100%"
                  extensions={[html()]}
                  onChange={(value) => {
                    setHtmlText(value);
                  }}
                />
                <CodeMirror
                  aria-label="html input"
                  className="h-full text-sm"
                  theme={oneDark}
                  value={htmlText}
                  height="100%"
                  extensions={[html()]}
                  onChange={(value) => {
                    setHtmlText(value);
                  }}
                />
              </ResizablePanel>
              <ResizableHandle />
              <h2 className="p-4 text-lg font-medium">CSS</h2>
              <ResizablePanel className="min-h-40">
                <CodeMirror
                  aria-label="css input"
                  className="relative h-full text-sm dark:hidden"
                  value={cssText}
                  height="100%"
                  extensions={[css()]}
                  onChange={(value) => {
                    setCssText(value);
                  }}
                />
                <CodeMirror
                  aria-label="css input"
                  className="h-full text-sm"
                  theme={oneDark}
                  value={cssText}
                  height="100%"
                  extensions={[css()]}
                  onChange={(value) => {
                    setCssText(value);
                  }}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle className="" />
          <ResizablePanel className="h-screen min-w-80">
            <div className="flex justify-between">
              <div className="flex">
                <h2 className="p-4 text-lg font-medium">Tailwind</h2>
                <Button
                  onClick={() => copyToClipboard()}
                  variant="ghost"
                  size="icon"
                  className="mt-3 -ml-3 cursor-pointer dark:hover:bg-gray-700"
                >
                  <Copy />
                </Button>
              </div>
              <div className="flex">
                <form
                  action="https://codepen.io/pen/define"
                  method="POST"
                  target="_blank"
                >
                  <input type="hidden" name="data" value={codepenTailwind} />
                  <Button
                    variant="outline"
                    type="submit"
                    title="codepen preview"
                    value=""
                    className="mr-4 mt-3.5 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                      <line x1="12" x2="12" y1="22" y2="15.5" />
                      <polyline points="22 8.5 12 15.5 2 8.5" />
                      <polyline points="2 15.5 12 8.5 22 15.5" />
                      <line x1="12" x2="12" y1="2" y2="8.5" />
                    </svg>
                  </Button>
                </form>
                <Button
                  variant="outline"
                  onClick={convertToTailwind}
                  className="mr-4 mt-3.5 cursor-pointer"
                >
                  Convert
                </Button>
              </div>
            </div>
            <CodeMirror
              aria-label="tailwind html"
              className="relative h-full text-sm dark:hidden"
              value={tailwindText}
              readOnly={true}
              height="100%"
              extensions={[html()]}
            />
            <CodeMirror
              aria-label="tailwind html"
              className="h-full text-sm"
              theme={oneDark}
              value={tailwindText}
              readOnly={true}
              height="100%"
              extensions={[html()]}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: "var(--toast-bg)",
              color: "var(--toast-text)",
              borderColor: "var(--toast-border)",
              width: "250px"
            }
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
