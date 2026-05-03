import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import { CoordsContext } from "../context/map-context";
import { useContext, useEffect } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY;

export default function Map() {
  const {
    coords: { lat, lon },
    mapType,
  } = useContext(CoordsContext);

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      style={{ width: "100%", height: "100%" }}
    >
      <MapClick lat={lat} lon={lon} />
      <MapTileLayer />
      <TileLayer
        opacity={0.7}
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

function MapTileLayer() {
  const map = useMap();

  useEffect(() => {
    const tileLayer = new MaptilerLayer({
      style: "basic-dark",
      apiKey: MAPTILER_KEY,
    });
    tileLayer.addTo(map);

    // have cleanup when working with libraries that manipulate the DOM directly
    return () => {
      map.removeLayer(tileLayer);
    };
  }, [map]);

  return null;
}
