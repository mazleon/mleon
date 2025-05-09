import React, { createContext, useContext, useEffect, useState } from "react";

// Define the theme type
type Theme = "dark" | "light";

// Context interface
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component that wraps your app and makes theme object available to any child component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // State to hold the current theme mode
  const [theme, setTheme] = useState<Theme>("dark");

  // Function to set theme in localStorage and update state
  const setThemeAndStore = (newTheme: Theme) => {
    // Update state
    setTheme(newTheme);
    // Store in localStorage
    localStorage.setItem("theme", newTheme);
    // Update the document class for Tailwind
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    // Check system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setThemeAndStore(savedTheme);
    } else {
      setThemeAndStore(prefersDark ? "dark" : "light");
    }

    // Apply the theme class immediately on component mount
    const currentTheme = savedTheme || (prefersDark ? "dark" : "light");
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      // Only update if there's no localStorage preference
      if (!localStorage.getItem("theme")) {
        setThemeAndStore(mediaQuery.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => {
    return {
      theme,
      setTheme: setThemeAndStore,
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
