import type { Weather } from "../schemas/weatherSchema";

type Props = {
  weather: Weather;
};

export default function WeatherIcon({ weather }: Props) {
  return (
    <img
      className="size-8"
      src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
      alt="Weather icon"
      title={weather.description}
    />
  );
}
