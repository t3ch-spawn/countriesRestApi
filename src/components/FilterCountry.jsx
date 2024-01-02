import React from "react";

const regionArr = ["Africa", "America", "Asia", "Europe", "Oceania"];

export default function FilterCountry(props) {
  return (
    <div>
      <div>Filter by Region</div>

      <div>
        {regionArr.map((region, idx) => {
          return (
            <p
                className="cursor-pointer"
              key={idx}
              onClick={(e) => {
                props.getRegion(e);
              }}
            >
              {region}
            </p>
          );
        })}
      </div>
    </div>
  );
}
