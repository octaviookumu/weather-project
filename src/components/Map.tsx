import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { CoordsContext } from "../context/map-context";
import { useContext } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function Map() {
  const {
    coords: { lat, lon },
    mapType,
  } = useContext(CoordsContext);

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      style={{ height: "500px", width: "1000px" }}
    >
      <MapClick lat={lat} lon={lon} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
      />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
}

// in order to directly reference the map container
function MapClick({ lat, lon }: { lat: number; lon: number }) {
  const { onMapClick } = useContext(CoordsContext);
  const map = useMap();
  map.panTo([lat, lon]); // any time coordinates change, pan the map to the new location

  // called when clicking on the map
  map.on("click", (e) => {
    const { lat, lng } = e.latlng;

    onMapClick(lat, lng);
  });

  return null;
}
