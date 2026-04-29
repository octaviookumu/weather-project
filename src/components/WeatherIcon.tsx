import clsx from "clsx";
import type { Weather } from "../schemas/weatherSchema";

type Props = {
  weather: Weather;
  imgClassName?: string;
};

export default function WeatherIcon({ weather, imgClassName }: Props) {
  return (
    <img
      className={clsx("size-8", imgClassName)}
      src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
      alt="Weather icon"
      title={weather.description}
    />
  );
}
