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
import Link from "next/link";

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
  floodZones: any[];
  selectedIncidentId?: string | null;
};
function FixMapSize() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [map]);

  return null;
}
function FitBounds({
  incidents,
}: {
  incidents: Incident[];
}) {
  const map = useMap();

  useEffect(() => {
  if (incidents.length === 0) return;

  const timer = setTimeout(() => {
    const bounds = incidents.map((incident) => [
      incident.latitude,
      incident.longitude,
    ]) as [number, number][];

    map.fitBounds(bounds, {
      padding: [50, 50],
    });
  }, 300);

  return () => clearTimeout(timer);
}, [incidents, map]);
  return null;
}
function FocusIncident({
  incidents,
  selectedIncidentId,
}: {
  incidents: Incident[];
  selectedIncidentId?: string | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedIncidentId) return;

    const incident = incidents.find(
      (item: any) => item.id === selectedIncidentId
    );

    if (!incident) return;

    map.flyTo(
      [incident.latitude, incident.longitude],
      16,
      {
        duration: 2,
      }
    );
  }, [incidents, selectedIncidentId, map]);

  return null;
}

export default function MapComponent({
  incidents,
  floodZones,
  selectedIncidentId,
}: MapComponentProps) {
  return (
   <MapContainer
  center={[7.3775, 3.947]}
  zoom={12}
  preferCanvas={true}
  className="h-175 w-full rounded-2xl shadow-sm"
>
    <FixMapSize />
      <FitBounds incidents={incidents} />
      <FocusIncident
  incidents={incidents}
  selectedIncidentId={selectedIncidentId}
/>
     <TileLayer
  attribution="&copy; OpenStreetMap contributors"
  url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
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
  <div className="space-y-2">
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

    <Link
  href={`/map/${incident.id}`}
  className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30"
>
  View Details 
</Link>
  </div>
</Popup>
      </Marker>
    );
  })}
  {floodZones.map((zone, index) => (
  <Marker
    key={`zone-${index}`}
    position={[
      zone.latitude,
      zone.longitude,
    ]}
    icon={customIcon}
  >
    <Popup>
      <div className="space-y-2">
        <h3 className="font-bold text-red-600">
          🚨 Confirmed Flooding Zone
        </h3>

        <p>
          {zone.reports} flood reports detected
        </p>

        <p>
          Multiple users reported flooding
          in this area.
        </p>
      </div>
    </Popup>
  </Marker>
))}
    </MapContainer>
  );
}