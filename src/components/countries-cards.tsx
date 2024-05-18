import { useState, useEffect, useTransition } from "react";
import styles from "./countries-cards.module.css";
import { Country } from "../types";
import { Link, useLocation } from "react-router-dom";
import { Loader } from "./loader";

export function CountriesCards() {
  const location = useLocation();
  const queries = new URLSearchParams(location.search);

  const region = queries.get("region") || "";
  const searchInput = queries.get("search") || "";

  const [countries, setCountries] = useState<Country[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const countries = (await fetch(
        "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,",
      ).then((res) => res.json())) as Country[];

      setCountries(countries);
    });
  }, []);

  if (isPending) return <Loader />;

  const filteredCountries = countries?.filter((country) => {
    const isCountryPartOfRegion = region ? country.region === region : true;
    const isCountryPartOfSearchQuery = searchInput
      ? country.name.official
          .toLowerCase()
          .search(searchInput.toLowerCase()) !== -1
      : true;

    return isCountryPartOfRegion && isCountryPartOfSearchQuery;
  });

  return (
    <div className={`container ${styles.countriesCards}`}>
      {filteredCountries.map((country) => (
        <CountryCard country={country} key={country.name.common} />
      ))}
    </div>
  );
}

function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      to={`/${country.name.official.toLowerCase()}`}
      className={styles.countryCard}
    >
      <img src={country.flags.svg} alt={country.flags.alt} />
      <div className={styles.countryInfo}>
        <p className={styles.countryTitle}>{country.name.official}</p>
        <div>
          <p>
            <span className={styles.infoTopic}>Population:</span>{" "}
            {country.population.toLocaleString()}
          </p>
          <p>
            <span className={styles.infoTopic}>Region:</span> {country.region}
          </p>
          <p>
            <span className={styles.infoTopic}>Capital:</span>{" "}
            {country.capital[0]}
          </p>
        </div>
      </div>
    </Link>
  );
}
