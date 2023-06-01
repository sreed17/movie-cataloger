import { createContext, useLayoutEffect, useState } from "react";

export type Themes = "dark" | "light" | "auto";

interface ThemeContextType {
  theme?: Themes;
  setTheme?: (t: React.SetStateAction<Themes | undefined>) => void;
}

/** CONTEXT */
const initialValue: ThemeContextType = {
  theme: undefined,
  setTheme: undefined,
};

export const ThemeContext = createContext<ThemeContextType>(initialValue);

export default ThemeContext;

/** PROVIDER */

type PropType = {
  children: React.ReactNode | JSX.Element | React.ReactElement;
};

export function ThemeProvider({ children }: PropType) {
  const [theme, setTheme] = useState<ThemeContextType["theme"]>(
    initialValue.theme
  );
  /** Side effects */

  // Initiate the theme
  useLayoutEffect(() => {
    if (!theme) {
      const inLocalStorage = "theme" in window.localStorage;

      if (inLocalStorage) {
        const is_dark = window.localStorage.theme === "dark";
        if (is_dark) setTheme("dark");
        else setTheme("light");
      } else {
        setTheme("auto");
      }
    }
  }, []);

  // side effects of theme state change
  useLayoutEffect(() => {
    if (theme) {
      setThemeLocalStorage(theme);
      renderTheme(theme);
    }
  }, [theme]);

  /** context object */
  const theme_context: ThemeContextType = {
    theme,
    setTheme: (t: React.SetStateAction<Themes | undefined>) => {
      return setTheme(t);
    },
  };

  return (
    <ThemeContext.Provider value={theme_context}>
      {children}
    </ThemeContext.Provider>
  );
}

/** HELPERS */
function setThemeLocalStorage(t: Themes) {
  const key = "theme";
  if (t === "auto") {
    if (key in window.localStorage) window.localStorage.removeItem(key);
  } else window.localStorage.setItem(key, t);
}

function renderTheme(t: Themes) {
  const darkPrefered = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const is_dark_if_auto = t === "auto" && darkPrefered;
  const isDark = is_dark_if_auto || t === "dark";
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
