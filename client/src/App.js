import "./App.css";

import Main from "./components/Main";
import Selection from "./components/Selection";

function App() {
  return (
    <>
      <header>
        <h1>Video recommendation</h1>
      </header>
      <Selection></Selection>
      <Main></Main>
    </>
  );
}

export default App;
