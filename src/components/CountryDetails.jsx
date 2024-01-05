import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { Link } from "react-router-dom";
import Transition from "../Transition";

function CountryDetails() {
  const { code } = useParams();
  const [hasFetched, setHasFetched] = useState(false);
  const [countryDeets, setCountryDeets] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [urlArr, setUrlArr] = useState([]);

  const [hasLoaded, setHasLoaded] = useState(null);

  function handleImgLoading(e) {
    if (e.target.src) {
      setHasLoaded(true);
    }
  }

  useEffect(() => {
    setHasFetched(false);
    axios.get(`https://restcountries.com/v3.1/alpha/${code}`).then((res) => {
      setCountryDeets(res.data[0]);
      setHasFetched(true);

      //   Fetching names of border countries
      res.data[0].borders?.forEach((border, i, array) => {
        axios
          .get(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((country) => {
            if (borderCountries.length >= array.length) return;

            // This array gets the names of the borders that'll show on the screen
            setBorderCountries((prevArr) => {
              return Array.from(
                new Set([...prevArr, country.data[0].name.common])
              );
            });

            // This array gets the code for each individual border
            setUrlArr((prevArr) => {
              return Array.from(new Set([...prevArr, country.data[0].cca2]));
            });
          });
      });
    });
  }, []);

  function objectToArr(object) {
    return Object.values(object).flatMap((value) => [value]);
  }

  return (
    <div className="w-full pb-[50px]">
      <Header extraStyles="!fixed" />
      {countryDeets && (
        <div
          className={`${
            hasFetched ? "opacity-1" : "opacity-0"
          } duration-300 -750:mt-[100px]`}
        >
          <div className="flex flex-col items-start px-20 -1000:px-8">
            {/* Back button */}
            <Link
              to={"/"}
              className="dark:bg-cardBg bg-lightCardBg px-4 py-1 w-fit mb-16 flex justify-center items-center gap-2  shadow-md"
            >
              <i className="fa-solid fa-arrow-left fa-beat-fade"></i>
              <p>Back</p>
            </Link>

            {/* Div that has the countries image and main details */}
            <div className="flex justify-between items-center w-full gap-6 -1000:flex-col">
              <div className="relative max-w-[500px] w-[100%]">
                <img
                  className={`${
                    hasLoaded ? "block" : "hidden"
                  } max-w-[500px] w-[100%]`}
                  src={countryDeets.flags.svg}
                  alt=""
                  onLoad={handleImgLoading}
                />

                <div
                  className={`${
                    hasLoaded ? "hidden" : "flex"
                  } loader top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]`}
                ></div>
              </div>
              <div className=" w-full max-w-[500px]">
                <h1 className="text-3xl font-bold mb-8 -550:text-center">
                  {countryDeets.name.common}
                </h1>

                {/* Div which contains 2 divs that have the main details of the country */}
                <div className="flex w-full gap-2 justify-between main-details-container text-lightText dark:text-subWords -550:text-center -550:flex-col">
                  <div className="flex flex-col gap-2">
                    <p>
                      <span> Native Name</span>:
                      {` ${
                        objectToArr(countryDeets.name.nativeName)[0].common
                      }`}
                    </p>
                    <p>
                      <span>Population</span>:{" "}
                      {countryDeets.population.toLocaleString()}
                    </p>
                    <p>
                      <span>Region</span>: {countryDeets.region}
                    </p>
                    <p>
                      <span>Sub Region</span>: {countryDeets.subregion}
                    </p>
                    <p>
                      <span>Capital</span>: {countryDeets.capital.join(",")}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p>
                      <span>Top Level Domain</span>: {countryDeets.tld}
                    </p>
                    <p>
                      <span>Currencies</span>:{" "}
                      {objectToArr(countryDeets.currencies)[0].name}
                    </p>
                    <p>
                      <span>Languages</span>:{" "}
                      {objectToArr(countryDeets.languages).join(", ")}
                    </p>
                  </div>
                </div>

                {/* Div for border countries */}
                <div className="flex gap-3  flex-wrap justify-center items-center mt-[50px]">
                  Border Countries:
                  {borderCountries.length > 0
                    ? borderCountries.map((border, idx) => {
                        return (
                          <Link
                            to={`/countries/${urlArr[idx]}`}
                            className="dark:bg-cardBg bg-lightCardBg shadow-md px-4 py-1 rounded-sm"
                            key={idx}
                          >
                            {border}
                          </Link>
                        );
                      })
                    : " No Borders"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`${
          hasFetched ? "hidden" : "active"
        } loader-big fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]`}
      ></div>
    </div>
  );
}

export default Transition(CountryDetails);
