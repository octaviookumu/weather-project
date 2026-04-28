import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";

export default function DailyForecast() {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });

  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
      {data?.daily?.map((day) => (
        <div key={day.dt} className="flex justify-between">
          <p className="w-9">
            {new Date(day.dt * 1000).toLocaleDateString(undefined, {
              weekday: "short",
            })}
          </p>
          <WeatherIcon weather={day.weather[0]} />
          <p>{Math.round(day.temp.day)}°C</p>
          <p className="text-gray-500/75">{Math.round(day.temp.min)}°C</p>
          <p className="text-gray-500/75">{Math.round(day.temp.max)}°C</p>
        </div>
      ))}
    </Card>
  );
}
