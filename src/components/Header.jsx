import React from "react";

export default function Header(props) {
  return (
    <div
      className={`${props.extraStyles} sticky top-0 w-full bg-cardBg p-4 flex justify-between header z-20`}
    >
      <h1>Where in the world?</h1>

      {/* Light and dark mode toggler */}
      <div>Dark Mode</div>
    </div>
  );
}