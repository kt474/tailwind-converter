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
  test("test multiple classes", () => {
    const html = `<!-- Edit HTML here -->
    <html lang="en">
    <body>
      <div class="main">
        <h2>Welcome to Tailwind Converter!</h2>
        <p class="test test2 test3">Edit/paste HTML here and CSS into
          the editor below
        </p>
        <p>text</p>
      </div>
    </body>
    </html>`;
    const css = `/* Edit CSS here */
    body {
      margin: 1rem;
      padding: 1rem;
    }
    
    .main {
      text-align: center;
    }
    
    p {
      background-color: purple;
    }

    .test2 {
      font-weight: 600;
    }
    
    .test {
      font-size: 3rem;
    }`;
    const tailwind = `<!-- HTML with Tailwind -->
    <html lang="en">
    <body class="m-4 p-4">
      <div class="text-center">
        <h2>Welcome to Tailwind Converter!</h2>
        <p class="bg-fuchsia-800 text-5xl font-semibold test3">Edit/paste HTML here and CSS into
          the editor below
        </p>
        <p class="bg-fuchsia-800">text</p>
      </div>
    </body>
    </html>`;
    expect(html_beautify(tailwind)).toEqual(
      html_beautify(injectClass(html, cssToJson(css)))
    );
  });
});
