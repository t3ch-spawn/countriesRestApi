import React from "react";
import Theme from "./Theme";

export default function Header(props) {
  return (
    <div
      className={`${props.extraStyles} fixed top-0 w-full bg-lightCardBg dark:bg-cardBg p-4 flex justify-between px-10 -500:px-5 -400:px-2 items-center header z-20 shadow-md`}
    >
      <h1 className="text-2xl font-bold -500:text-lg text-center">Where the world?</h1>

      {/* Light and dark mode toggler */}
      <Theme/>
    </div>
  );
}
