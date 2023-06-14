import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedLogout from "./components/ProtectedLogout";
import ProtectedLogin from "./components/ProtectedLogin";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Videos from "./pages/Videos";

export const AppContext = React.createContext();

function App() {
  const apiURL = (process.env.NODE_ENV === "production") ? "" : "http://localhost:3001";

  return (
    <AppContext.Provider value={apiURL}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ProtectedLogout><Register /></ProtectedLogout>} />
          <Route path="/login" element={<ProtectedLogout><Login /></ProtectedLogout>} />
          <Route path="/videos" element={<Videos />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
