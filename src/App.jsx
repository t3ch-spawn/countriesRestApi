import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Home from "./components/Home";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import CountryDetails from "./components/CountryDetails";
import PreLoader from "./components/PreLoader";

function App() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full text-white bg-mainBg min-h-[100vh] font-nunito">
      <PreLoader/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries/:code" element={<CountryDetails />} />
      </Routes>
    </div>
  );
}

export default App;
