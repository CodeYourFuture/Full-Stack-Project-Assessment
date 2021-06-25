import React, { useContext, useState, useEffect } from "react";
// import Data from "./exampleresponse.json"
const AppContext = React.createContext();


const AppProvider = ({ children }) => {

    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState("")
    console.log("final", data)
    const [asc, setAsc] = useState(false)

    function handleClick() {
        if (asc) {
            const toggleData = data.sort((a, b) => a.rating - b.rating)
            setData(toggleData)
            console.log("1", data)
            setAsc(false)

        } else {
            const toggleData2 = data.sort((a, b) => b.rating - a.rating)
            setData(toggleData2)
            console.log("2", data)
            setAsc(true)

        }

    }

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
                setKeyword,
                // handleClick
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