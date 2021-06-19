import React, { useContext, useState, useCallback, useEffect } from "react";
// import Data from "./exampleresponse.json"
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [data,setData] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const updateData = data.filter((video) => searchValue !=="" ? video.title.toLowerCase().includes(searchValue.toLowerCase()) : video );
    const fetchData = useCallback( async () => {
    
            const url = `http://localhost:5000/`;
            try {
                fetch(url)
                .then((response) => response.json())
                .then((data) => setData(data));
            } catch (error) {
                console.log(error);
            }
    },[]);

    useEffect(()=> {
        fetchData();
    },[fetchData]);
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
