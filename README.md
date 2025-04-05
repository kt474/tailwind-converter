# Tailwind Converter

The goal of this project is to take plain HTML/CSS and convert it to a
single HTML file with [Tailwind](https://tailwindcss.com/) classes. Tracking supported
Tailwind classes [here](SupportedClasses.md).

**Note: This project is a work in progress. There may be bugs or incomplete features.**

It's also important to keep in mind that converting an existing project to use Tailwind CSS often involves more than just replacing classes. It may be best to restructure your HTML and/or adjust your design to fit the utility-first paradigm and match the available utility classes. Manual conversion would provide more control over the process and likely ensure a better end result.

## Run Locally

Clone the repo, install the dependencies and run:

```bash
npm run dev
# or
yarn dev
```

Running [tests](test)

```bash
npm test
```

## TODO

- Better test coverage - test entire app and prevent crashes from invalid text
- Handle multiple css filter classes
- Support active states (hover, focus)
- Support css nesting instead of just top level css classes
