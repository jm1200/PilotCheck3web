import React, { createContext, useContext, useState } from "react";

interface AppState {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  FFOD: boolean;
  setFFOD: React.Dispatch<React.SetStateAction<boolean>>;
}

export const defaultAppState: AppState = {
  theme: "dark",
  setTheme: () => {},
  FFOD: true,
  setFFOD: () => {},
};

const AppStateContext = createContext(defaultAppState);

export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }: { children: any }) => {
  const [theme, setTheme] = useState(defaultAppState.theme);
  const [FFOD, setFFOD] = useState(defaultAppState.FFOD);

  const value = {
    theme,
    setTheme,
    FFOD,
    setFFOD,
  };
  console.log("AppStateProvider.tsx 31 value:", value);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};
