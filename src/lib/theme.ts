import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function useIsDarkMode(): boolean {
  const { theme, systemTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const resolvedTheme = theme === 'system' ? systemTheme : theme;
    setIsDarkMode(resolvedTheme === 'dark');
  }, [theme, systemTheme]);

  return isDarkMode;
}
