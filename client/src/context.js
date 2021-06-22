import React, { useContext, useState, useCallback, useEffect } from "react";
// import Data from "./exampleresponse.json"
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [data,setData] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [orderBy,setOrderBy] = useState(false);
    // const updateData = data.filter((video) => searchValue !=="" ? video.title.toLowerCase().includes(searchValue.toLowerCase()) : video );

    const ascOrder = () => {
        orderBy ? setOrderBy(false) : setOrderBy(true)
    }


    const fetchData = useCallback( async () => {
        if(orderBy){
            const url = `http://localhost:5000/?order=desc`;
            console.log("1");
            try {
                fetch(url)
                .then((response) => response.json())
                .then((data) => setData(data));
            } catch (error) {
                console.log(error);
            }
        }else if(searchValue !==""){
            const url = `http://localhost:5000/search?title=${searchValue}`;
            console.log("3");
            try {
                fetch(url)
                .then((response) => response.json())
                .then((data) => setData(data));
            } catch (error) {
                console.log(error);
            }
        }
        else if(!orderBy) {
            const url = `http://localhost:5000/?order=asc`;
            console.log("2");
            try {
                fetch(url)
                .then((response) => response.json())
                .then((data) => setData(data));
            } catch (error) {
                console.log(error);
            }
        }else{
            const url = `http://localhost:5000/`;
            console.log("4");
            try {
                fetch(url)
                .then((response) => response.json())
                .then((data) => setData(data));
            } catch (error) {
                console.log(error);
            }
        }
    },[orderBy,searchValue]);

    useEffect(()=> {
        fetchData();
    },[fetchData]);


    return (
        <AppContext.Provider value={{
            data,
            setData,
            searchValue,
            setSearchValue,
            ascOrder,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () =>{
    return useContext(AppContext);
};

export { AppContext, AppProvider };
