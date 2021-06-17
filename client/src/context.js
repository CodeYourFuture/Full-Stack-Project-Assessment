import React, { useContext, useState } from "react";
import Data from "./exampleresponse.json"
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [data,setData] = useState(Data)
    const [searchValue, setSearchValue] = useState("")

    const updateData = data.filter((video) => searchValue !=="" ? video.title.toLowerCase().includes(searchValue.toLowerCase()) : video );
    return (
        <AppContext.Provider value={{
            data,
            setData,
            searchValue,
            setSearchValue,
            updateData
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () =>{
    return useContext(AppContext);
};

export { AppContext, AppProvider };
