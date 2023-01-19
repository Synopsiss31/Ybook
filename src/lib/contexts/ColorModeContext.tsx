import { createTheme, ThemeProvider } from "@mui/material";
import { useState, createContext, useEffect, useMemo, useContext } from "react";

const ColorModeContext = createContext({
  colorMode: "light",
  toggleColorMode: () => {
    return;
  },
});

const ColorModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    // get color mode from local storage
    const localColorMode = localStorage.getItem("colorMode") as
      | "light"
      | "dark";
    if (localColorMode) {
      setColorMode(localColorMode);
    } else {
      // set from system preference
      const systemColorMode = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setColorMode(systemColorMode);
    }
  }, [setColorMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
        },
      }),
    [colorMode]
  );

  const toggleColorMode = useMemo(
    () => () => {
      setColorMode((prev) => (prev === "light" ? "dark" : "light"));
      // set color mode in local storage
      return;
    },
    [setColorMode]
  );

  useEffect(() => {
    localStorage.setItem("colorMode", colorMode);
  }, [colorMode]);

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const useColorMode = () => {
  // throw if used outside of provider
  const context = useContext(ColorModeContext);
  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
};

const withColorMode = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: any) => {
    return (
      <ColorModeProvider>
        <Component {...props} />
      </ColorModeProvider>
    );
  };
};


export { ColorModeProvider, useColorMode, withColorMode };
