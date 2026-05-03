import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import { useContext } from "react";
import { CoordsContext } from "../../context/map-context";

export default function CurrentWeather() {
  const { coords } = useContext(CoordsContext);
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });
  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center gap-6 2xl:justify-between"
      className="md:pb-11"
    >
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-center text-6xl font-semibold">
          {Math.round(data.current.temp)}°C
        </h2>
        <WeatherIcon weather={data.current.weather[0]} imgClassName="size-14" />
        <h3 className="text-xl capitalize">
          {data.current.weather[0].description}
        </h3>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-center text-xl">Local Time:</p>
        <h3 className="text-4xl font-semibold">
          {new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: data.timezone,
          }).format(new Date(data.current.dt * 1000))}
        </h3>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Feels like</p>
          <p>{Math.round(data.current.feels_like)}°C</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Humidity</p>
          <p>{data.current.humidity}%</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Wind</p>
          <p>{data.current.wind_speed} mph</p>
        </div>
      </div>
    </Card>
  );
}
