import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Home from "./components/Home";
import Header from "./components/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import CountryDetails from "./components/CountryDetails";
import PreLoader from "./components/PreLoader";
import { AnimatePresence } from "framer-motion";

export const Context = React.createContext();

function App() {
  const [theme, setTheme] = useState("dark");

  const location = useLocation();
  return (
    <div className="flex flex-col justify-center items-center w-full h-full text-lightText dark:text-white bg-lightBg dark:bg-mainBg min-h-[100vh] font-nunito">
      {/* <PreLoader /> */}
      <AnimatePresence mode="wait">
        <Context.Provider value={[theme, setTheme]}>
          <Routes location={location} key={location.pathname}>
            <Route index element={<Home />} />
            <Route path="/countries/:code" element={<CountryDetails />} />
          </Routes>
        </Context.Provider>
      </AnimatePresence>
    </div>
  );
}

export default App;
