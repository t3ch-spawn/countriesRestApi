import { useState, useEffect } from "react";
import Country_card from "./Country_card";
import axios from "axios";
import FilterCountry from "./FilterCountry";
import Header from "./Header";

export default function Home() {
  const [allCountries, setAllCountries] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [countriesArray, setCountriesArray] = useState([]);
  const [region, setRegion] = useState("");

  // This UseEffect fetches the countries from the api
  useEffect(() => {
    setHasFetched(true);
    axios
      .get("https://restcountries.com/v3.1/independent?status=true")
      .then((res) => {
        setAllCountries(res.data);
        setHasFetched(true);
      });
  }, []);

  // This useEffect updates the countries Array once the data has been fetched
  useEffect(() => {
    if (allCountries != "not found" && allCountries != null) {
      setCountriesArray((prevArr) => {
        return allCountries.slice(0, 20).map((country, idx) => {
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
          console.log(res.data);
          setAllCountries(res.data);
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
      return;
    }
    setHasFetched(false);
    setRegion(searchedRegion);
    axios
      .get(`https://restcountries.com/v3.1/region/${searchedRegion}`)
      .then((res) => {
        setAllCountries(res.data);
        setHasFetched(true);
      })
      .catch((err) => {
        console.log(err);
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
          className="w-full h-fit max-w-[500px] p-3 bg-cardBg"
        />

        <FilterCountry getRegion={handleRegion} />
      </div>

      {/* Div that contains the list of all the countries */}
      <div
        className={`${
          hasFetched ? "flex" : "hidden"
        } gap-20 justify-center items-center flex-wrap w-full font-nunito`}
      >
        {(<p>loading</p> && countriesArray) || <p>Country not found</p>}
      </div>

      <div className={`${hasFetched ? "hidden" : "block"} loader-big`}></div>
    </div>
  );
}
