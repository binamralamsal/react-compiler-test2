import { ChangeEvent } from "react";
import styles from "./header-controls.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export function HeaderControls() {
  const navigate = useNavigate();
  const location = useLocation();

  const queries = new URLSearchParams(location.search);
  const searchInput = queries.get("search") || "";
  const selectedRegion = queries.get("region") || "all";

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) queries.set("search", event.target.value);
    else queries.delete("search");

    navigate({ pathname: "/", search: queries.toString() });
  };

  function handleRegionChange(event: ChangeEvent<HTMLSelectElement>) {
    if (event.target.value === "all") queries.delete("region");
    else queries.set("region", event.target.value);

    navigate({ pathname: "/", search: queries.toString() });
  }

  return (
    <div className={`container ${styles.controlsContainer}`}>
      <input
        type="text"
        placeholder="Search for a country..."
        defaultValue={searchInput}
        name="search"
        aria-label="Search Countries"
        onChange={handleSearchInputChange}
        className={styles.searchInput}
      />

      <div>
        <select onChange={handleRegionChange} defaultValue={selectedRegion}>
          <option value="all">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
}
