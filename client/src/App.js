import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedLogout from "./components/ProtectedLogout";
import ProtectedLogin from "./components/ProtectedLogin";
import Register from "./pages/Register";
import Videos from "./pages/Videos";

export const AppContext = React.createContext();

function App() {
  const apiURL = (process.env.NODE_ENV === "production") ? "" : "http://localhost:3001";

  return (
    <AppContext.Provider value={apiURL}>
      <BrowserRouter>
        <header className="App-header">
          <h1>YouTube Video Manager</h1>
        </header>
        <Routes>
          <Route path="/" element={<ProtectedLogout><Register /></ProtectedLogout>} />
          <Route path="/videos" element={<Videos />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
