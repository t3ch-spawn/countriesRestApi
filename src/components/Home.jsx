import { useState, useEffect } from "react";
import Country_card from "./Country_card";
import axios from "axios";

export default function Home() {
  const [allCountries, setAllCountries] = useState(null);

  const [countriesArray, setCountriesArray] = useState([]);

  // This UseEffect fetches the countries from the api
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/independent?status=true")
      .then((res) => {
        setAllCountries(res.data);
        // console.log(res.data);
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
              flag={country.coatOfArms.png}
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
      axios
        .get(`https://restcountries.com/v3.1/name/${searchedCountry}`)
        .then((res) => {
          console.log(res.data);
          setAllCountries(res.data);
        })
        .catch((err) => {
          console.log(err);
          setAllCountries("not found");
          console.log(allCountries);
        });
    }
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center p-[40px] flex-wrap w-full ">
      {/* Input text box that filters throught the countries */}
      <input type="text" onInput={searchCountries} />
      {/* Div that contains the list of all the countries */}
      <div className="flex gap-20 justify-center items-center flex-wrap w-full font-nunito">
        {(<p>loading</p> && countriesArray) || <p>Country not found</p>}
      </div>
    </div>
  );
}
