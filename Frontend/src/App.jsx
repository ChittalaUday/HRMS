import { useState, useEffect } from "react";
import "./App.css";
import Login from "./pages/login";

function App() {
  const [data, setData] = useState({});

  return (
    <>
      <Login></Login>
    </>
  );
}

export default App;
