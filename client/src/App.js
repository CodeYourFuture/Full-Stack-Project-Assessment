import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Home from './components/Home';
import FormDisabled from './components/FormDisabled';

function App() {
  // const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<Home />} />
          <Route path='videos' element={<FormDisabled />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;