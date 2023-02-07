import { createTheme, ThemeProvider } from '@mui/material';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const ColorModeContext = createContext({
  colorMode: 'light',
  toggleColorMode: () => {},
});

const ColorModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      // get color mode from local storage
      const localColorMode = localStorage.getItem('colorMode') as
        | 'light'
        | 'dark'
        | null;
      if (localColorMode) {
        setColorMode(localColorMode);
      } else {
        // set from system preference
        const systemColorMode = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches
          ? 'dark'
          : 'light';
        setColorMode(systemColorMode);
      }
    } else {
      isMounted.current = true;
    }
  }, [setColorMode]);

  const theme = useMemo(
    () =>
      createTheme({
        // if light : set white to #F7F7F7
        // if light : primary.main to 2863b0
        palette: {
          mode: colorMode,

          ...(colorMode === 'light' && {
            background: {
              default: '#F7F7F7',
              paper: '#F8F8F8',
            },
            primary: {
              main: '#2863b0',
            },
          }),
          ...(colorMode === 'dark' && {
            background: {
              default: '#1F1F1F',
              paper: '#1A1A1A',
            },
            primary: {
              main: '#2863b0',
            },
          }),
        },
        components: {
          // Box color override
          MuiTypography: {
            styleOverrides: {
              root: {
                color: colorMode === 'light' ? '#1A1A1A' : '#F7F7F7',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                userSelect: 'none',
                borderRadius: 12,
                ...(colorMode === 'light' && {
                  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
                }),
                ...(colorMode === 'dark' && {
                  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
                }),
              },
            },
          },
        },
      }),
    [colorMode]
  );

  const toggleColorMode = useMemo(
    () => () => {
      setColorMode((prev) => (prev === 'light' ? 'dark' : 'light'));
      // set color mode in local storage
      localStorage.setItem(
        'colorMode',
        colorMode === 'light' ? 'dark' : 'light'
      );
    },
    [colorMode]
  );

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
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
};

export { ColorModeProvider, useColorMode };
