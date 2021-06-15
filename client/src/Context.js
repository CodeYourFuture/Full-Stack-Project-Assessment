import React, { useContext, useState } from "react";
import Data from "./exampleresponse.json"
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    console.log(Data);
    const [data, setData] = useState(Data);
    return (
        <AppContext.Provider value={
            {
                data,
                setData
            }

        }>
            {children}
        </AppContext.Provider>
    );
};
export const useGlobalContext = () => {
    return useContext(AppContext);
};
export { AppContext, AppProvider };