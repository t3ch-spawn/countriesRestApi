import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Home from "./components/Home";
import Header from "./components/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import CountryDetails from "./components/CountryDetails";
import PreLoader from "./components/PreLoader";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";

export const Context = React.createContext();

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {
      console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  const [theme, setTheme] = useState("dark");

  const location = useLocation();
  return (
    <div className="flex flex-col justify-center items-center w-full h-full text-lightText dark:text-white bg-lightBg dark:bg-mainBg min-h-[100vh] font-nunito">
      <PreLoader />
      <Context.Provider value={[theme, setTheme]}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route index element={<Home />} />
            <Route path="/countries/:code" element={<CountryDetails />} />
          </Routes>
        </AnimatePresence>
      </Context.Provider>
    </div>
  );
}

export default App;
