import { useState, useEffect } from "react";
import Country_card from "./Country_card";
import axios, { all } from "axios";
import FilterCountry from "./FilterCountry";
import Header from "./Header";

export default function Home() {
  const [allCountries, setAllCountries] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [countriesArray, setCountriesArray] = useState([]);
  const [region, setRegion] = useState("");

  // This function fetches the countries from the api
  function getCountries() {
    axios
      .get("https://restcountries.com/v3.1/independent?status=true")
      .then((res) => {
        setAllCountries(res.data.slice(0, 50));
        setHasFetched(true);
      });
  }

  // This calls the function that gets the countries
  useEffect(() => {
    setHasFetched(true);
    getCountries();
  }, []);

  // This useEffect updates the countries Array once the data has been fetched
  useEffect(() => {
    if (allCountries != "not found" && allCountries != null) {
      setCountriesArray((prevArr) => {
        return allCountries.map((country, idx) => {
          return (
            <Country_card
              key={idx}
              name={country.name.common}
              population={country.population}
              region={country.continents.join(", ")}
              capital={country.capital}
              flag={country.flags.png}
              alt={country.flags.alt}
            />
          );
        });
      });
    } else if (allCountries == "not found") {
      setCountriesArray(null);
    }
  }, [allCountries]);

  function searchCountries(e) {
    let searchedCountry = e.target.value.trim();

    if (searchedCountry) {
      // setHasFetched(false);
      axios
        .get(`https://restcountries.com/v3.1/name/${searchedCountry}`)
        .then((res) => {
          // console.log(res.data);
          setAllCountries(res.data);

          // This is an extra filter by region on the countries Array, so that a country that's not in a region will not be found when
          // that region is selected
          if (region != "") {
            setAllCountries(
              res.data.filter((country) => {
                return country.region.includes(region);
              })
            );
          }

          // console.log(allCountries);
          setHasFetched(true);
        })
        .catch((err) => {
          console.log(err);
          setAllCountries("not found");
          setHasFetched(true);
        });
    }
  }

  function handleRegion(e) {
    let searchedRegion = e.target.textContent;
    if (searchedRegion == "Clear filters") {
      setRegion("");
      getCountries();
      return;
    }
    setHasFetched(false);
    setRegion(searchedRegion);
    axios
      .get(`https://restcountries.com/v3.1/region/${searchedRegion}`)
      .then((res) => {
        setAllCountries(res.data);
        // console.log(res.data)
        setHasFetched(true);
      })
      .catch((err) => {
        // console.log(err);
        setAllCountries("not found");
        setHasFetched(true);
      });
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center p-[40px] flex-wrap w-full">
      {/* Div which houses the search box and filter dropdown */}
      <div className="w-full flex justify-between items-center -750:flex-col -750:items-start -750:gap-4">
        {/* Input text box that filters throught the countries */}
        <input
          type="text"
          onInput={searchCountries}
          placeholder={`Search for a country ${
            region ? `in ${region}...` : "..."
          }`}
          className="w-full h-fit max-w-[500px] p-3 bg-cardBg search-box"
        />

        <FilterCountry getRegion={handleRegion} />
      </div>

      {/* Div that contains the list of all the countries */}
      <div
        className={`${
          hasFetched ? "flex" : "hidden"
        } gap-20 justify-center items-center flex-wrap w-full font-nunito`}
      >
        {countriesArray && countriesArray.length > 0 ? (
          countriesArray
        ) : (
          <p className="text-3xl">Country not found</p>
        )}
      </div>

      <div className={`${hasFetched ? "hidden" : "block"} loader-big`}></div>
    </div>
  );
}
