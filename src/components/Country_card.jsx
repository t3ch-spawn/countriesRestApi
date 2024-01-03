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
    <div className="flex flex-col items-start  max-w-[250px] w-[200%] bg-cardBg shadow-xl rounded-md cursor-pointer overflow-hidden relative">
      <img
        onLoad={handleImgLoading}
        className={`${hasLoaded ? "block" : "hidden"} max-h-[150px] w-full`}
        src={props.flag}
        alt={props.alt}
        onError={handleError}
      />
      <div
        className={`${
          hasLoaded ? "hidden" : "flex"
        } loader absolute left-[50%] translate-x-[-50%]`}
      ></div>

      {/* div containig details of the country */}
      <div className="flex flex-col gap-2 p-8 text-subWords card-details-container">
        <h2 className="text-2xl font-bold text-white">{props.name}</h2>
        <p>
          <span>Population</span>: {props.population.toLocaleString()}
        </p>
        <p>
          <span>Region</span>: {props.region}
        </p>
        <p>
          <span>Capital</span>: {props.capital}
        </p>
      </div>

      <p className="text-sm absolute bottom-1 right-3 opacity-50">
        click for info.
      </p>
    </div>
  );
}
