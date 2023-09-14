# Tailwind Converter

The goal of this project is to take plain HTML/CSS and convert it to a
single HTML file with [Tailwind](https://tailwindcss.com/) classes. Tracking supported
Tailwind classes [here](SupportedClasses.md).

Note: this is a work in progress and not well tested - most css classes are not yet supported.

## Run Locally

Clone the repo, install the dependencies and run:

```bash
npm run dev
# or
yarn dev
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## TODO

- Better test coverage - test entire app and prevent crashes from invalid text
- Handle multiple css filter classes
- Support active states (hover, focus)
- Support css nesting instead of just top level css classes
