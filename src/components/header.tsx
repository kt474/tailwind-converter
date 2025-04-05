import { Moon, Sun, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

export function Header() {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="mb-4 border-b">
      <div className="flex items-center justify-between h-16 px-4">
        <h1 className="text-lg font-semibold sm:text-xl">
          HTML/CSS to Tailwind Converter
        </h1>
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer dark:hover:bg-gray-700"
              >
                <Settings />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>About</DialogTitle>
                <DialogDescription className="text-base text-gray-800 dark:text-gray-200">
                  This web app takes plain HTML/CSS and converts it into a
                  single HTML file with tailwind classes. Documentation
                  regarding currently supported classes can be found&nbsp;
                  <a
                    href="https://github.com/kt474/tailwind-converter/blob/main/SupportedClasses.md"
                    className="font-medium underline underline-offset-4"
                    target="_blank"
                  >
                    here
                  </a>
                  .
                </DialogDescription>
                <DialogTitle className="mt-4">Note</DialogTitle>
                <DialogDescription className="text-base font-bold text-gray-800 dark:text-gray-200">
                  *This project is a work in progress. There may be bugs or
                  incomplete features*
                </DialogDescription>
                <DialogDescription className="text-base text-gray-800 dark:text-gray-200">
                  Keep in mind that converting an existing project to use
                  Tailwind CSS often involves more than just replacing classes.
                  It may be best to restructure your HTML and/or adjust your
                  design to match the available utility classes.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer dark:hover:bg-gray-700"
          >
            <a
              aria-label="github page"
              href="https://github.com/kt474/tailwind-converter"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </Button>
          <Button
            onClick={() => toggle()}
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="cursor-pointer dark:hover:bg-gray-700"
          >
            <Sun className="w-5 h-5 scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute w-5 h-5 scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </header>
  );
}
