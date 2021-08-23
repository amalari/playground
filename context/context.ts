import React from "react";

export const AuthStateContext = React.createContext(null);
export const AuthDispatchContext = React.createContext(null);
export const staff = { id: "0", name: "Staff", email: "staff@gmail.com" };

export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
}

export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }

  return context;
}
