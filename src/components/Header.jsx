import React from "react";

export default function Header(props) {
  return (
    <div
      className={`${props.extraStyles} fixed top-0 w-full bg-cardBg p-4 flex justify-between px-10 -500:px-5 items-center header z-20`}
    >
      <h1 className="text-2xl font-bold">Where in the world?</h1>

      {/* Light and dark mode toggler */}
      <div>Dark Mode</div>
    </div>
  );
}
