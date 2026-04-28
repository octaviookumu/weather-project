import { createContext } from "react";
import type { Coords } from "../types";

export const CoordsContext = createContext<{
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
}>({
  coords: { lat: 0, lon: 0 },
  onMapClick: () => {
    throw new Error("onMapClick called outside CoordsProvider");
  },
});
