"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  SiteContent,
  defaultSiteContent,
  THEMES,
  CONTENT_STORAGE_KEY,
  THEME_STORAGE_KEY,
} from "./content";

interface ContentContextType {
  content: SiteContent;
  theme: string;
  updateContent: (newContent: SiteContent) => void;
  updateTheme: (themeName: string) => void;
  resetContent: () => void;
  isLoaded: boolean;
}

const ContentContext = createContext<ContentContextType>({
  content: defaultSiteContent,
  theme: "charcoal-orange",
  updateContent: () => {},
  updateTheme: () => {},
  resetContent: () => {},
  isLoaded: false,
});

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [theme, setThemeState] = useState<string>("charcoal-orange");
  const [isLoaded, setIsLoaded] = useState(false);

  const applyThemeVars = (themeKey: string) => {
    const selected = THEMES[themeKey] || THEMES["charcoal-orange"];
    const root = document.documentElement;
    Object.entries(selected.vars).forEach(([k, v]) => {
      root.style.setProperty(k, v);
    });
  };

  useEffect(() => {
    try {
      const storedContent = localStorage.getItem(CONTENT_STORAGE_KEY);
      if (storedContent) {
        setContent(JSON.parse(storedContent));
      } else {
        localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(defaultSiteContent));
      }
    } catch {
      setContent(defaultSiteContent);
    }

    try {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "charcoal-orange";
      setThemeState(storedTheme);
      applyThemeVars(storedTheme);
    } catch {
      applyThemeVars("charcoal-orange");
    }

    setIsLoaded(true);
  }, []);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    try {
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.error("Failed to save content", e);
    }
  };

  const updateTheme = (themeName: string) => {
    setThemeState(themeName);
    applyThemeVars(themeName);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeName);
    } catch (e) {
      console.error("Failed to save theme", e);
    }
  };

  const resetContent = () => {
    setContent(defaultSiteContent);
    try {
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(defaultSiteContent));
    } catch (e) {
      console.error("Failed to reset content", e);
    }
    updateTheme(defaultSiteContent.theme);
  };

  return (
    <ContentContext.Provider
      value={{ content, theme, updateContent, updateTheme, resetContent, isLoaded }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
