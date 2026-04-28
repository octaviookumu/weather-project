import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { CoordsContext } from "../context/map-context";
import { useContext } from "react";

export default function Map() {
  const {
    coords: { lat, lon },
  } = useContext(CoordsContext);

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      style={{ height: "500px", width: "700px" }}
    >
      <MapClick />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
}

// in order to directly reference the map container
function MapClick() {
  const { onMapClick } = useContext(CoordsContext);
  const map = useMap();

  // called when clicking on the map
  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    map.panTo([lat, lng]);
    onMapClick(lat, lng);
  });

  return null;
}
