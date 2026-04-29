import { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CoordsContext } from "@/context/map-context";

export default function MapTypeDropdown() {
  const { mapType, onSetMapType } = useContext(CoordsContext);

  return (
    <Select value={mapType} onValueChange={onSetMapType}>
      <SelectTrigger className="w-full xs:w-45">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        {types.map((type) => (
          <SelectItem key={type} value={type} className="capitalize">
            {type.split("_")[0]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const types: string[] = [
  "clouds_new",
  "precipitation_new",
  "pressure_new",
  "wind_new",
  "temp_new",
];
