import React, { useContext } from "react";
import Data from "./exampleresponse.json"
const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    console.log(Data);
    return (
        <AppContext.Provider value="hello">
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () =>{
    return useContext(AppContext);
};

export { AppContext, AppProvider };
