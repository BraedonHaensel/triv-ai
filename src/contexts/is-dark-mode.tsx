import { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const IsDarkModeContext = createContext<boolean>(false);

export function IsDarkModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, systemTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const resolvedTheme = theme === 'system' ? systemTheme : theme;
    setIsDarkMode(resolvedTheme === 'dark');
  }, [theme, systemTheme]);

  return (
    <IsDarkModeContext.Provider value={isDarkMode}>
      {children}
    </IsDarkModeContext.Provider>
  );
}

export function useIsDarkMode(): boolean {
  return useContext(IsDarkModeContext);
}
