import { createContext } from "react";
import type { Coords } from "../types";

export const CoordsContext = createContext<{
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
  location: string;
  onSetLocation: (location: string) => void;
  mapType: string;
  onSetMapType: (type: string) => void;
}>({
  coords: { lat: 0, lon: 0 },
  onMapClick: () => {
    throw new Error("onMapClick called outside CoordsProvider");
  },
  location: "Barcelona",
  onSetLocation: () => {
    throw new Error("onSetLocation called outside CoordsProvider");
  },
  mapType: "clouds_new",
  onSetMapType: () => {
    throw new Error("onSetMapType called outside CoordsProvider");
  },
});
