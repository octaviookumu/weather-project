import { GeocodeSchema } from "./schemas/geoCodeSchema";
import { OneCallWeatherSchema } from "./schemas/weatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}`,
  );
  const data = await res.json();
  return OneCallWeatherSchema.parse(data);
}

export async function getGetCode(location: string) {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`,
  );
  const data = await res.json();
  return GeocodeSchema.parse(data);
}
