import React, { useState } from "react";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const[user, setUser] = useState({})

    return (
        <AppContext.Provider
          value={{
              user,
              setUser
          }}
        >
          {children}
        </AppContext.Provider>
      );
    }