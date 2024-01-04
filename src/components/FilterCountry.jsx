import React, { useEffect, useState } from "react";

const regionArr = ["Africa", "America", "Asia", "Europe", "Oceania"];

export default function FilterCountry(props) {
  const [mainText, setMainText] = useState("Filter by Region");
  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle(!toggle);
  }
  return (
    <div
      className={`fixed -750:relative -750:right-0 right-10 gap-2 flex flex-col min-w-[150px] rounded-md text-sm z-20 shadow-md`}
    >
      <div
        onClick={handleToggle}
        className="dark:bg-cardBg bg-lightCardBg p-4 cursor-pointer flex justify-center items-center gap-3"
      >
        <p>{mainText}</p>

        <i
          className={` ${
            toggle ? "active" : "fa-bounce"
          } fa-solid fa-angle-down `}
        ></i>
      </div>

      <div
        className={`dark:bg-cardBg bg-lightCardBg shadow-xl rounded-md py-4 flex flex-col gap-1 filter-drop absolute min-h-[180px] w-full top-[60px] ${
          toggle ? "" : "active"
        }`}
      >
        {regionArr.map((region, idx) => {
          return (
            <p
              className="cursor-pointer px-2 py-2 hover:bg-mainBg bg-lightCardBg dark:bg-cardBg"
              key={idx}
              onClick={(e) => {
                props.getRegion(e);
                setMainText(e.target.textContent);
                handleToggle();
                document.querySelector(".search-box").value = "";
              }}
            >
              {region}
            </p>
          );
        })}

        {mainText !== "Filter by Region" && (
          <p
            onClick={(e) => {
              handleToggle();
              setMainText("Filter by Region");
              props.getRegion(e);
              document.querySelector(".search-box").value = "";
            }}
            className="cursor-pointer px-2 py-2 hover:bg-mainBg bg-cardBg text-[red] shadow-md"
          >
            Clear filters
          </p>
        )}
      </div>
    </div>
  );
}
