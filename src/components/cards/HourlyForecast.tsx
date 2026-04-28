import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";

export default function HourlyForecast() {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });

  return (
    <Card
      title="Hourly Forecast (48 Hours)"
      childrenClassName="flex gap-6 overflow-x-scroll"
    >
      {data?.hourly?.map((hour) => (
        <div key={hour.dt} className="flex flex-col gap-2 items-center p-2">
          <p className="whitespace-nowrap">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <WeatherIcon weather={hour.weather[0]} />
          <p>{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </Card>
  );
}
