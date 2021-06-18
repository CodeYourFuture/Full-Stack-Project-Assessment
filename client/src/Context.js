import React, { useContext, useState } from "react";
import Data from "./exampleresponse.json"
const AppContext = React.createContext();
const AppProvider = ({ children }) => {

    const [data, setData] = useState(Data);
    const [keyword, setKeyword] = useState("")
    return (
        <AppContext.Provider value={
            {
                data,
                setData,
                keyword,
                setKeyword
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