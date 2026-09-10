export function findFloodZones(
  incidents: any[]
) {
  const zones: any[] = [];

  incidents.forEach((incident) => {
    if (incident.category !== "Flood") return;

    const nearbyReports = incidents.filter(
      (other) => {
        if (other.category !== "Flood")
          return false;

        const latDiff = Math.abs(
          incident.latitude - other.latitude
        );

        const lngDiff = Math.abs(
          incident.longitude - other.longitude
        );

        return (
          latDiff < 0.005 &&
          lngDiff < 0.005
        );
      }
    );

    if (nearbyReports.length >= 5) {
      zones.push({
        title: "Confirmed Flooding Zone",
        latitude: incident.latitude,
        longitude: incident.longitude,
        reports: nearbyReports.length,
      });
    }
  });

  return zones;
}