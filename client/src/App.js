import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./component/Nav";
import Home from "./component/Home";
import Videos from "./component/Videos";
import CreateNewVideo from "./component/CreateNewVideo";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import FooterComponent from "./component/FooterComponent";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/videos' element={<Videos />}/>
          <Route path='/create' element={<CreateNewVideo />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signUp' element={<SignUp />}/>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;