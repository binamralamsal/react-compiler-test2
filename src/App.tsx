import { CountriesCards } from "./components/countries-cards";
import { Route, Routes } from "react-router-dom";
import { HeaderControls } from "./components/header-controls";
import { CountryDetails } from "./components/country-details";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeaderControls />
              <CountriesCards />
            </>
          }
        />
        <Route path="/:name" element={<CountryDetails />} />
      </Routes>
    </>
  );
}

export default App;
