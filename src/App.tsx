import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { Suspense, useState } from "react";
import type { Coords } from "./types";
import { CoordsContext } from "./context/map-context";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import { useQuery } from "@tanstack/react-query";
import { getGetCode } from "./api";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import MapLegend from "./components/MapLegend";
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton";
import DailySkeleton from "./components/skeletons/DailySkeleton";
import AdditionalInfoSkeleton from "./components/skeletons/AdditionalInfoSkeleton";
import HourlySkeleton from "./components/skeletons/HourlySkeleton";
import SidePanel from "./components/SidePanel";
import Hamburger from "/src/assets/hamburger.svg?react";

function App() {
  const [coordinates, setCoords] = useState<Coords>({
    lat: 10,
    lon: 25,
  });
  const [location, setLocation] = useState<string>("Barcelona");
  const [mapType, setMapType] = useState<string>("clouds_new");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(true);

  const { data: geocodeData } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGetCode(location),
    enabled: location !== "custom",
  });

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
    setLocation("custom");
  };

  const coords =
    location === "custom"
      ? coordinates
      : { lat: geocodeData?.[0].lat ?? 0, lon: geocodeData?.[0].lon ?? 0 };

  const onSetLocation = (location: string) => {
    setLocation(location);
  };

  const onSetMapType = (type: string) => {
    setMapType(type);
  };

  return (
    <CoordsContext.Provider
      value={{
        coords,
        onMapClick,
        location,
        onSetLocation,
        mapType,
        onSetMapType,
      }}
    >
      <>
        <div className="flex flex-col gap-8">
          <div className="flex gap-8">
            <div className="flex gap-4">
              <h1 className="text-2xl font-semibold">Location: </h1>
              <LocationDropdown />
            </div>
            <div className="flex gap-4">
              <h1 className="text-2xl font-semibold">Map Type: </h1>
              <MapTypeDropdown />
            </div>
            <button onClick={() => setIsSidePanelOpen(true)}>
              <Hamburger className="size-8 invert ml-auto" />
            </button>
          </div>
          <div className="relative">
            <Map />
            <MapLegend mapType={mapType} />
          </div>
          <Suspense fallback={<CurrentSkeleton />}>
            <CurrentWeather />
          </Suspense>
          <Suspense fallback={<HourlySkeleton />}>
            <HourlyForecast />
          </Suspense>
          <Suspense fallback={<DailySkeleton />}>
            <DailyForecast />
          </Suspense>
          <Suspense fallback={<AdditionalInfoSkeleton />}>
            <AdditionalInfo />
          </Suspense>
        </div>
        <SidePanel
          isSidePanelOpen={isSidePanelOpen}
          setIsSidePanelOpen={setIsSidePanelOpen}
        />
      </>
    </CoordsContext.Provider>
  );
}

export default App;
