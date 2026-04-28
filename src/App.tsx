import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./types";
import { CoordsContext } from "./context/map-context";

function App() {
  const [coords, setCoords] = useState<Coords>({
    lat: 10,
    lon: 25,
  });

  const onMapClick = (lat: number, lon: number) => {
    console.log("Map clicked at:", lat, lon);
    setCoords({ lat, lon });
  };

  return (
    <CoordsContext.Provider value={{ coords, onMapClick }}>
      <div className="flex flex-col gap-8">
        <Map />
        <CurrentWeather />
        <HourlyForecast />
        <DailyForecast />
        <AdditionalInfo />
      </div>
    </CoordsContext.Provider>
  );
}

export default App;
