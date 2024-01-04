import React, { useContext, useEffect, useState } from "react";
import Rive from "@rive-app/react-canvas";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { Context } from "../App";

export default function Theme() {
  const [theme, setTheme] = useContext(Context);
  const { rive, RiveComponent } = useRive({
    src: "/lightDark.riv",
    stateMachines: "dark-light",
    autoplay: true,
    onStateChange: (e) => {
        console.log(e)
    },
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const fireInput = useStateMachineInput(rive, "dark-light", "toggle");
  function ToggleTheme() {
    fireInput.fire();
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <button
      onClick={ToggleTheme}
      className=" w-full max-w-[180px]  h-[50px] flex items-center relative"
    >
      <RiveComponent className="w-[400%] h-[350%] mr-[20px]" />
      <p className="font-bold absolute right-[-20px] top-[30px] translate-y-[-50%] mr-2">
        {theme === "dark" ? "Dark mode" : "Light mode" }
      </p>
    </button>
  );
}
