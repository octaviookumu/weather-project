import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import { CoordsContext } from "../../context/map-context";
import { useContext } from "react";

export default function HourlyForecast() {
  const { coords } = useContext(CoordsContext);
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card
      title="Hourly Forecast (48 Hours)"
      childrenClassName="flex gap-6 overflow-x-scroll "
    >
      {data?.hourly?.map((hour) => (
        <div key={hour.dt} className="flex flex-col gap-2 items-center p-2 2xl:justify-between">
          <p className="whitespace-nowrap 2xl:scale-110">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <WeatherIcon imgClassName="2xl:size-10" weather={hour.weather[0]} />
          <p className="2xl:scale-110" >{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </Card>
  );
}
