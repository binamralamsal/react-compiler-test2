import { Link, useParams } from "react-router-dom";
import styles from "./country-details.module.css";
import { useEffect, useState } from "react";
import { Country } from "../types";

export function CountryDetails() {
  const params = useParams();

  const [country, setCountry] = useState<Country>();

  useEffect(() => {
    async function fetchCountry() {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${params.name}?fullText=true&fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`,
      );
      const data = await response.json();

      setCountry(data[0]);
    }

    fetchCountry();
  }, []);

  return (
    <div className={`container ${styles.countryDetailsContainer}`}>
      <Link to="/" className={styles.backBtn}>
        Back
      </Link>

      {country && (
        <div className={styles.detailsContainer}>
          <img
            src={country.flags.svg}
            alt={country.flags.alt}
            className={styles.flag}
          />
          <div>
            <p className={styles.countryTitle}>{country.name.official}</p>

            <div className={styles.infoContainer}>
              <div style={{ marginBottom: "30px" }}>
                <p>
                  <span className={styles.infoTopic}>Native Names:</span>{" "}
                  {Object.keys(country.name.nativeName)
                    .map((key) => country.name.nativeName[key].common)
                    .join(", ")}
                </p>
                <p>
                  <span className={styles.infoTopic}>Population: </span>
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <span className={styles.infoTopic}>Region:</span>{" "}
                  {country.region}
                </p>
                <p>
                  <span className={styles.infoTopic}>Sub Region:</span>{" "}
                  {country.subregion}
                </p>
                <p>
                  <span className={styles.infoTopic}>Capital:</span>{" "}
                  {country.capital}
                </p>
              </div>

              <div>
                <p>
                  <span className={styles.infoTopic}>Top Level Domain: </span>
                  {country.tld[0]}
                </p>
                <p>
                  <span className={styles.infoTopic}>Currencies: </span>
                  {Object.keys(country.currencies)
                    .map((key) => country.currencies[key].name)
                    .join(", ")}
                </p>
                <p>
                  <span className={styles.infoTopic}>Languages: </span>
                  {Object.keys(country.languages)
                    .map((key) => country.languages[key])
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
