import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import Intro from "./components/Intro";
import NavBar from "./components/NavBar";
import About from "./components/about";
import "./App.css";
import Projects from "./components/Projects";
import Credits from "./components/Credits";



function App() {
  const [count, setCount] = useState(0);

  return (<div className="App"><NavBar /><div id="content"><Intro /><About /><Projects /><Credits /></div></div>);
}

export default App;
