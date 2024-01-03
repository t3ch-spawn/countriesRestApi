import React, { useState } from "react";

export default function (props) {
  const [hasLoaded, setHasLoaded] = useState(null);

  function handleImgLoading(e) {
    if (e.target.src) {
      setHasLoaded(true);
    }
  }

  function handleError() {}
  return (
    <div className="flex flex-col items-start  max-w-[280px] w-[80%] bg-cardBg shadow-xl rounded-md cursor-pointer overflow-hidden">
      <img
        onLoad={handleImgLoading}
        className={`${hasLoaded ? "block" : "hidden"} max-h-[150px] w-full`}
        src={props.flag}
        alt={props.alt}
        onError={handleError}
      />
      <div className={`${hasLoaded ? "hidden" : "flex"} loader`}></div>

      {/* div containig details of the country */}
      <div className="flex flex-col gap-2 p-8">
        <h2 className="text-2xl font-bold">{props.name}</h2>
        <p>Population: {props.population}</p>
        <p>Region: {props.region}</p>
        <p>Capital: {props.capital}</p>
      </div>
    </div>
  );
}
