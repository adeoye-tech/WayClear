"use client";

import { useEffect } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function UserLocationTracker() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        await setDoc(
          doc(db, "users", "test-user"),
          {
            latitude: lat,
            longitude: lng,
            notificationsEnabled: true,
            lastUpdated: serverTimestamp(),
          },
          { merge: true }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return null;
}