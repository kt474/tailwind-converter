import type { NextPage } from "next";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";

const Home: NextPage = () => {
  const initialCode = `body {\n  margin: 1rem;  \n  padding: 1rem; \n  font-size: 1rem; \n}`;
  const [code, setCode] = useState(initialCode);
  return (
    <div className="flex">
      <CodeMirror
        className="w-1/2 h-screen"
        value={code}
        height="100%"
        theme={oneDark}
        extensions={[css()]}
        onChange={(value) => {
          setCode(value);
        }}
      />
      <div className="w-1/2 m-4">
        <p>Right container</p>
        <p>{code}</p>
      </div>
    </div>
  );
};

export default Home;
