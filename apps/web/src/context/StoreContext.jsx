import React, { createContext } from "react";

export const StoreContext = createContext();

export const StoreProvider = ({ children, value }) => {
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
