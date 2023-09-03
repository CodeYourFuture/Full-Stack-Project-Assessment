import AllVideoDisplay from "./AllVideoDisplay.js";
import Header from "./Header.js";
import Search from "./Search.js";
import { useState } from "react";


function App() {
  const [inputValue, setInputValue] = useState('');

  // Define a function to update the shared state
  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <div>
    <Header />
    <Search inputValue={inputValue} onInputChange={handleInputChange}/>
    <AllVideoDisplay inputValue={inputValue}  />
    </div>
    
  );
}

export default App;
