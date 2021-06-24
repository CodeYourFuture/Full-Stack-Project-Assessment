import React, { useContext, useState, useEffect } from "react";
// import Data from "./exampleresponse.json"
const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState("")
    useEffect(() => {
        fetch(
            `http://localhost:5000/videos`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, []);
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