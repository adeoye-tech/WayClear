"use client";

import Navbar from "@/components/Navbar";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

function  getUrgencyStyle(
  urgency: string | undefined
)  {
  switch (urgency) {
  case "High":
    return "bg-red-100 text-red-700";

  case "Medium":
    return "bg-orange-100 text-orange-700";

  case "Low":
    return "bg-green-100 text-green-700";

  default:
    return "bg-slate-100 text-slate-700";
}
}


 export default function IncidentDetailsPage() {
  const { id } = useParams();
  const [incident, setIncident] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
    const [traffic, setTraffic] = useState<any>(null);
    const weatherCategories = [
  "Flooding",
  "Heavy Rain",
  "Storm",
];

const trafficCategories = [
  "Road Blockage",
  "Traffic Accident",
  "Road Damage",
];
  useEffect(() => {
  async function fetchIncident() {
    if (!id) return;

    const docRef = doc(db, "incidents", id as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setIncident({
        id: docSnap.id,
        ...docSnap.data(),
      });
    }
  }

  fetchIncident();
}, [id]);
useEffect(() => {
  async function fetchWeather() {
    if (
      !incident?.latitude ||
      !incident?.longitude
    )

    
      return;

    try {
      const response = await fetch(
        `/api/weather?lat=${incident.latitude}&lon=${incident.longitude}`
      );

      const data = await response.json();
      console.log("Weather Data:", data);

      setWeather(data);
    } catch (error) {
      console.log(
        "Weather fetch failed",
        error
      );
    }
  }

  fetchWeather();
}, [incident]);
useEffect(() => {
  async function fetchTraffic() {
    if (!incident?.latitude || !incident?.longitude) return;

    try {
      const response = await fetch(
        `/api/traffic?lat=${incident.latitude}&lon=${incident.longitude}`
      );

      const data = await response.json();

      console.log("Traffic Data:", data);

      setTraffic(data.flowSegmentData);
    } catch (error) {
      console.log("Traffic fetch failed", error);
    }
  }

  fetchTraffic();
}, [incident]);
const showWeatherCard =
  incident?.category === "Flood";

const showTrafficCard =
  incident?.category === "Flood" ||
   incident?.category === "Road" ||
  incident?.category === "Traffic" ||
  incident?.category === "Road Blockage" ||
  incident?.category === "Road Damage" ||
  incident?.category === "Traffic Accident";
 
    

   if (!incident) {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold text-white">
          Loading...
        </h1>
      </div>
    </main>
  );
}

if (
  incident.expiresAt &&
  incident.expiresAt.toDate() < new Date()
) {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-white">
          Report Expired
        </h1>
        

        <p className="mt-4 text-slate-300">
          This incident report is no longer active.
        </p>
        

        <Link
          href="/map"
          className="mt-8 inline-block rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white"
        >
          Back to Map
        </Link>
      </div>
    </main>
  );
}

  return (
   <main className="min-h-screen bg-slate-950">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-12">
       <Link
  href="/map"
  className="inline-flex items-center rounded-xl border border-cyan-500/20 bg-slate-900 px-4 py-2 text-cyan-300 transition hover:border-cyan-400 hover:text-cyan-200"
>
          ← Back to Map
        </Link>

        <div className="mt-6 rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 shadow-[0_0_30px_rgba(6,182,212,0.08)] backdrop-blur-sm">
          <h1 className="text-4xl font-bold text-white">
            {incident.title}
          </h1>
          

         <p className="mt-4 text-lg text-slate-300">
            {incident.location}
          </p>
          <p className="mt-2 text-sm text-slate-400">
  Reported on{" "}
  {incident.createdAt?.toDate().toLocaleString()}
</p>
          
          <p className="mt-2 text-sm text-slate-400">
  Report ID: NRM-{incident.id}
</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
              {incident.category}
            </span>

            <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
              {incident.confidence} Confidence
            </span>
            <div className="flex flex-wrap gap-3">
            

<span
  className={`rounded-full px-4 py-2 text-sm font-semibold ${getUrgencyStyle(
    incident.urgency || "Medium"
  )}`}
>
  {incident.urgency || "Medium"} Urgency
</span>

  <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
          Active Report
</span>
{incident.confidence === "High" && (
  <span className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-700">
    ✓ Community Verified
  </span>
)}
</div>


          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-cyan-500/20">
  <iframe
    src={`https://maps.google.com/maps?q=${incident.latitude},${incident.longitude}&z=15&output=embed`}
    width="100%"
    height="400"
    loading="lazy"
    className="border-0"
  />
</div>



          <p className="mt-8 text-lg leading-8 text-slate-300">
            {incident.description}
          </p>
         
        {weather && showWeatherCard && (
  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-slate-950/50 p-6">
    <h2 className="mb-4 text-xl font-semibold text-white">
      Live Weather
    </h2>

    <div className="space-y-2 text-slate-300">
      <p>
        Condition: {weather.weather?.[0]?.main}
      </p>

      <p>
        Description: {weather.weather?.[0]?.description}
      </p>

      <p>
        Temperature: {Math.round(weather.main?.temp)}°C
      </p>

      <p>
        Humidity: {weather.main?.humidity}%
      </p>

      <p>
        Wind Speed: {weather.wind?.speed} m/s
      </p>
    </div>
  </div>
)}


   {weather && incident && showWeatherCard && (
    <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-slate-950/50 p-6">
  <h2 className="mb-4 text-xl font-semibold text-cyan-300">
    Weather Impact Assessment
  </h2>

  {weather.weather?.[0]?.main === "Rain" && (
    <p className="text-yellow-300">
      Rainfall detected. Flooding and slower traffic movement may occur in this area.
    </p>
  )}

  {weather.weather?.[0]?.main === "Thunderstorm" && (
    <p className="text-red-300">
      Thunderstorm detected. Visibility may be reduced and road conditions could be hazardous.
    </p>
  )}

  {weather.weather?.[0]?.main === "Clouds" && (
    <p className="text-slate-300">
      Overcast conditions detected. No major weather-related impact currently observed.
    </p>
  )}

  {weather.weather?.[0]?.main === "Clear" && (
    <p className="text-green-300">
      Clear weather conditions. No significant weather-related impact detected.
    </p>
  )}

  {weather.weather?.[0]?.main === "Mist" && (
    <p className="text-orange-300">
      Mist detected. Drivers should exercise caution due to reduced visibility.
    </p>
  )}

  {weather.weather?.[0]?.main === "Fog" && (
    <p className="text-orange-300">
      Fog detected. Visibility may be significantly reduced for road users.
    </p>
  )}
</div>
   )}

  
 {traffic && showTrafficCard && (
    
  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-slate-950/50 p-6">
    <h2 className="mb-4 text-xl font-semibold text-white">
      Live Traffic
    </h2>

    <div className="space-y-2 text-slate-300">
      <p>
        Current Speed: {traffic.currentSpeed} km/h
      </p>

      <p>
        Free Flow Speed: {traffic.freeFlowSpeed} km/h
      </p>

      <p>
        Current Travel Time: {traffic.currentTravelTime} sec
      </p>

      <p>
        Free Flow Travel Time: {traffic.freeFlowTravelTime} sec
      </p>

      <p>
        Road Closure: {traffic.roadClosure ? "Yes" : "No"}
      </p>
    </div>
  </div>
)}
{traffic && showTrafficCard && (
  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-slate-950/50 p-6">
    <h2 className="mb-4 text-xl font-semibold text-cyan-300">
      Traffic Impact Assessment
    </h2>

    {traffic.roadClosure ? (
      <p className="text-red-300">
        Road closure detected. Avoid this route and use alternative roads.
      </p>
    ) : traffic.currentSpeed < traffic.freeFlowSpeed * 0.5 ? (
      <p className="text-red-300">
        Severe traffic congestion detected. Expect significant delays.
      </p>
    ) : traffic.currentSpeed < traffic.freeFlowSpeed * 0.8 ? (
      <p className="text-yellow-300">
        Moderate traffic detected. Travel times may be longer than normal.
      </p>
    ) : (
      <p className="text-green-300">
        Traffic flow is normal. No significant delays detected.
      </p>
    )}
  </div>
)}
{incident.videoUrl && (
  <div className="mt-8">
    <h2 className="mb-4 text-xl font-semibold text-white">
      Video Evidence
    </h2>

    
    <video
  controls
  preload="metadata"
  className="w-full rounded-2xl border border-cyan-500/20"
>
      <source
        src={incident.videoUrl}
        type="video/mp4"
      />
    </video>
  </div>
)}
 
          <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-slate-950/50 p-6">
            <h2 className="font-semibold text-white">
              Community Verification
            </h2>

           <div className="mt-3 space-y-2 text-slate-300">
  <p>
     {incident.confirmations} confirmations
  </p>

  <p>
   {incident.activeUpdates || 0} active updates
  </p>

  <p>
   {incident.disputes || 0} disputes
  </p>
</div>
          </div>
         
        </div>
      </section>
    </main>
  );
}