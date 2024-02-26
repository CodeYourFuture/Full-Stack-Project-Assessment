import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import DisplayVideos from "./DisplayVideos";
import NewVivdeo from "./NewVideo";
// import Home from "./Home";
// import { supabase } from "./lib/supabaseClient.js";

function App() {
  const [refreshVideos, setRefreshVideos] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <div className="App">
      <Header toggleForm={toggleForm} />
      <NewVivdeo
        showForm={showForm}
        toggleForm={toggleForm}
        setRefreshVideos={setRefreshVideos}
      />
      <DisplayVideos
        setRefreshVideos={setRefreshVideos}
        refreshVideos={refreshVideos}
      />
    </div>
  );
}
// function App() {
//   const [user, setUser] = useState(null);

//   const login = async () => {
//     try {
//       const { user, error } = await supabase.auth.signInWithOAuth({
//         provider: "github",
//       });

//       if (error) {
//         // Handle login error gracefully (e.g., display error message)
//         console.error("Login error:", error);
//         return; // Prevent code execution beyond this point to avoid unintended actions
//       }

//       console.log("Login successful:", user);
//       // Perform actions after successful login (e.g., redirect to dashboard)
//     } catch (error) {
//       // Handle other potential errors during the login process
//       console.error("Unexpected error:", error);
//     }
//   };
//   useEffect(() => {
//     async function fetchData() {
//       const session = await supabase.auth.setSession;
//       setUser(session?.user);
//       console.log(session);
//     }
//     fetchData();
//   }, []);

//   return (
//     <div className="App">
//       {user ? <h1>Authenticated</h1> : <button onClick={login}>Login</button>}
//     </div>
//   );
// }

export default App;
