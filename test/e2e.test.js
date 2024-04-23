import { html_beautify } from "js-beautify";
import { injectClass, cssToJson, initialHTML, initialCSS } from "../src/helper";

describe("Full path", () => {
  test("test initial html full path", () => {
    const result = html_beautify(
      injectClass(initialHTML, cssToJson(initialCSS))
    );
    const tailwind = `
    <!-- HTML with Tailwind -->
    <html lang="en">
    <body class="m-4 p-4">
      <div class="text-center">
        <h2 class="text-3xl mb-2 text-blue-700">Welcome to Tailwind Converter!</h2>
        <p>Edit/paste HTML here and CSS into
          the editor below
        </p>
      </div>
    </body>
    </html>`;
    expect(result).toEqual(html_beautify(tailwind));
  });
});
