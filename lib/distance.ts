import { getDistance } from "geolib";

export function isNearby(
  userLat: number,
  userLng: number,
  incidentLat: number,
  incidentLng: number,
  radiusKm = 5
) {
  const distance = getDistance(
    {
      latitude: userLat,
      longitude: userLng,
    },
    {
      latitude: incidentLat,
      longitude: incidentLng,
    }
  );

  return distance <= radiusKm * 1000;
}