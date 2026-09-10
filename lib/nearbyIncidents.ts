import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { isNearby } from "./distance";

export async function getNearbyIncidents(
  userLat: number,
  userLng: number
) {
  const snapshot = await getDocs(collection(db, "incidents"));

  const nearbyIncidents = snapshot.docs
  .map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  .filter((incident: any) => {
    if (
      incident.expiresAt &&
      incident.expiresAt.toDate() < new Date()
    ) {
      return false;
    }

    return isNearby(
      userLat,
      userLng,
      incident.latitude,
      incident.longitude,
      5
    );
  });

  return nearbyIncidents;
}