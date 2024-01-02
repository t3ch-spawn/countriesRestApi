import React, { useState } from "react";

export default function (props) {
  const [hasLoaded, setHasLoaded] = useState(null);

  function handleImgLoading(e) {
    console.log(e.target.alt);
    console.log(e.target.src);
    if (e.target.src) {
      setHasLoaded(true);
    }
  }

  function handleError() {}
  return (
    <div className="flex flex-col items-center gap-4 max-w-[280px] w-[80%] border-white border-2 ">
      <img
        onLoad={handleImgLoading}
        className={`${hasLoaded ? "block" : "hidden"} max-h-[150px]`}
        src={props.flag}
        alt="no image to show"
        onError={handleError}
      />
      <div className={`${hasLoaded ? "hidden" : "flex"} loader`}></div>

      {/* div containig details of the country */}
      <div className="flex flex-col gap-2 p-8">
        <h2>{props.name}</h2>
        <p>Population: {props.population}</p>
        <p>Region: {props.region}</p>
        <p>Capital: {props.capital}</p>
      </div>
    </div>
  );
}
