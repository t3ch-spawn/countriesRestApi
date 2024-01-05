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
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const fireInput = useStateMachineInput(rive, "dark-light", "toggle");
  const isLight = useStateMachineInput(rive, "dark-light", "isLight");
  function ToggleTheme() {
    isLight.value = !isLight.value;
    // fireInput.fire();
    setTheme(theme === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    if (isLight && theme == "light" && isLight.value == false) {
      isLight.value = true;
    }
  }, [fireInput, rive, isLight]);

  return (
    <button
      onClick={ToggleTheme}
      className=" w-full max-w-[180px]  h-[50px] flex items-center relative"
    >
      <RiveComponent className="w-[400%] h-[350%] mr-[50px]" />
      <p className="font-bold absolute right-[0px] top-[30px] translate-y-[-50%] mr-2">
        {theme === "dark" ? "Dark mode" : "Light mode"}
      </p>
    </button>
  );
}
