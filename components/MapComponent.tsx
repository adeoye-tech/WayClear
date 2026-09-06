"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Incident = {
  id: number;
  title: string;
  category: string;
  location: string;
  latitude: number;
  longitude: number;
  confidence: string;
  confirmations: number;
};

type MapComponentProps = {
  incidents: Incident[];
};
function FitBounds({
  incidents,
}: {
  incidents: Incident[];
}) {
  const map = useMap();

  useEffect(() => {
    if (incidents.length === 0) return;

    const bounds = incidents.map((incident) => [
      incident.latitude,
      incident.longitude,
    ]) as [number, number][];

    map.fitBounds(bounds, {
      padding: [50, 50],
    });
  }, [incidents, map]);

  return null;
}

export default function MapComponent({
  incidents,
}: MapComponentProps) {
  return (
    <MapContainer
      center={[7.3775, 3.947]}
      zoom={12}
      preferCanvas={true}
      className="h-175 w-full rounded-2xl shadow-sm"
    >
      <FitBounds incidents={incidents} />
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

              {incidents
  .filter(
    (incident) =>
      incident.latitude &&
      incident.longitude
  )
  .map((incident) => {
    console.log(
      incident.title,
      incident.latitude,
      incident.longitude
    );

    return (
      <Marker
        key={incident.id}
        position={[
          incident.latitude,
          incident.longitude,
        ]}
        icon={customIcon}
      >
        <Popup>
          <div>
            <h3 className="font-bold">
              {incident.title}
            </h3>
            <p>{incident.location}</p>
            <p>
              Confidence: {incident.confidence}
            </p>
            <p>
              {incident.confirmations} confirmations
            </p>
          </div>
        </Popup>
      </Marker>
    );
  })}
    </MapContainer>
  );
}