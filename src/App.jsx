import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Home from "./components/Home";

function App() {
  return (
    <div className="flex justify-center items-center w-full font-nunito">
      <Home />
    </div>
  );
}

export default App;
