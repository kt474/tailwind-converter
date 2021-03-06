export const mainDict: any = {
  "aspect-ratio": {
    auto: "aspect-auto",
    "1/1": "aspect-square",
    "16/9": "aspect-video"
  },
  "box-sizing": {
    "border-box": "box-border",
    "content-box": "box-content"
  },
  float: {
    right: "float-right",
    left: "float-left",
    none: "float-none"
  },
  clear: {
    left: "clear-left",
    right: "clear-right",
    both: "clear-both",
    none: "clear-none"
  },
  isolation: {
    isolate: "isolate",
    auto: "isolation-auto"
  },
  "object-fit": {
    contain: "object-contain",
    cover: "object-cover",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down"
  },
  "object-position": {
    bottom: "object-bottom",
    center: "object-position",
    left: "object-left",
    "left bottom": "object-left-bottom",
    "left top": "object-left-top",
    right: "object-right",
    "right bottom": "object-right-bottom",
    "right top": "object-right-top",
    top: "object-top"
  },
  overflow: {
    auto: "overflow-auto",
    hidden: "overflow-hidden",
    clip: "overflow-clip",
    visible: "overflow-visible",
    scroll: "overflow-scroll"
  },
  "overflow-x": {
    auto: "overflow-x-auto",
    hidden: "overflow-x-hidden",
    clip: "overflow-x-clip",
    visible: "overflow-x-visible",
    scroll: "overflow-x-scroll"
  },
  "overflow-y": {
    auto: "overflow-y-auto",
    hidden: "overflow-y-hidden",
    clip: "overflow-y-clip",
    visible: "overflow-y-visible",
    scroll: "overflow-y-scroll"
  },
  "overscroll-behavior": {
    auto: "overscroll-auto",
    contain: "overscroll-contain",
    none: "overscroll-none"
  },
  "overscroll-behavior-x": {
    auto: "overscroll-x-auto",
    contain: "overscroll-x-contain",
    none: "overscroll-x-none"
  },
  "overscroll-behavior-y": {
    auto: "overscroll-y-auto",
    contain: "overscroll-y-contain",
    none: "overscroll-y-none"
  },
  visibility: {
    visible: "visible",
    hidden: "invisible"
  },
  "flex-direction": {
    row: "flex-row",
    "row-reverse": "flex-row-reverse",
    column: "flex-col",
    "column-reverse": "flex-col-reverse"
  },
  "flex-wrap": {
    wrap: "flex-wrap",
    "wrap-reverse": "flex-wrap-reverse",
    nowrap: "flex-nowrap"
  },
  "flex-grow": {
    1: "grow",
    0: "grow-0"
  },
  "flex-shrink": {
    1: "shrink",
    0: "shrink-0"
  },
  "justify-content": {
    "flex-start": "justify-start",
    "flex-end": "justify-end",
    center: "justify-center",
    "space-between": "justify-between",
    "space-around": "justify-around",
    "space-evenly": "justify-evenly"
  },
  "justify-items": {
    start: "justify-items-start",
    end: "justify-items-end",
    center: "justify-items-center",
    stretch: "justify-items-stretch"
  },
  "justify-self": {
    auto: "justify-self-auto",
    start: "justify-self-start",
    end: "justify-self-end",
    center: "justify-self-center",
    stretch: "justify-self-stretch"
  },
  "align-content": {
    center: "content-center",
    "flex-start": "content-start",
    "flex-end": "content-end",
    "space-between": "content-between",
    "space-around": "content-around",
    "space-evenly": "content-evenly"
  },
  "align-items": {
    "flex-start": "items-start",
    "flex-end": "items-end",
    center: "items-center",
    baseline: "items-baseline",
    stretch: "items-stretch"
  },
  "align-self": {
    auto: "self-auto",
    "flex-start": "self-start",
    "flex-end": "self-end",
    center: "self-center",
    stretch: "self-stretch",
    baseline: "self-baseline"
  },
  "place-content": {
    center: "place-content-center",
    start: "place-content-start",
    end: "place-content-end",
    "space-between": "place-content-between",
    "space-around": "place-content-around",
    "space-evenly": "place-content-evenly",
    stretch: "place-content-stretch"
  },
  "place-items": {
    start: "place-items-start",
    end: "place-items-end",
    center: "place-items-center",
    stretch: "place-items-stretch"
  },
  "place-self": {
    auto: "place-self-auto",
    start: "place-self-start",
    end: "place-self-end",
    center: "place-self-center",
    stretch: "place-self-stretch"
  }
};

export const sizes = [
  0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24,
  28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96
];
export const percentages = {
  0.0833: "1/12",
  0.166: "1/6",
  0.2: "1/5",
  0.25: "1/4",
  0.33: "1/3",
  0.4: "2/5",
  0.416: "5/12",
  0.5: "1/2",
  0.583: "7/12",
  0.6: "3/5",
  0.66: "2/3",
  0.75: "3/4",
  0.833: "5/6",
  0.8: "4/5",
  0.916: "11/12",
  1: "full"
};
export const spacingCustom = {
  "100vh": "screen",
  "min-content": "min",
  "max-content": "max",
  "fit-content": "fit",
  auto: "auto"
};
export const spacing = [
  "padding",
  "padding-left",
  "padding-right",
  "padding-top",
  "padding-bottom",
  "margin",
  "margin-left",
  "margin-right",
  "margin-top",
  "margin-bottom",
  "width",
  "height"
];
export const fontSize = {
  0.75: "xs",
  0.875: "sm",
  1: "base",
  1.125: "lg",
  1.25: "xl",
  1.5: "2xl",
  1.875: "3xl",
  2.25: "4xl",
  3: "5xl",
  3.75: "6xl",
  4.5: "7xl",
  6: "8xl",
  8: "9xl"
};
export const fontWeight = {
  100: "thin",
  200: "extralight",
  300: "light",
  400: "normal",
  500: "medium",
  600: "semibold",
  700: "bold",
  800: "extrabold",
  900: "black"
};
//
// const directions = {
//   left: "l",
//   right: "r",
//   bottom: "b",
//   top: "t"
// };
// export const masterStyles = {
//   padding: {}
// };
