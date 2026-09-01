"use client";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import Navbar from "@/components/Navbar";


const locations = {
  Oyo: [
    "Mokola",
    "Dugbe",
    "Bodija",
    "Challenge",
    "Ring Road",
    "Ojoo",
    "Agodi Gate",
    "Iwo Road",
    "Eleyele",
    "University of Ibadan",
  ],

  Lagos: [
    "Ikeja",
    "Alausa",
    "Ojota",
    "Maryland",
    "Yaba",
    "Surulere",
    "Lekki Phase 1",
    "Victoria Island",
    "Ikorodu",
    "Oshodi",
  ],

  Ogun: [
    "Panseke",
    "Kuto",
    "Ibara",
    "Lafenwa",
    "Camp",
    "Adatan",
    "Oke-Ilewo",
    "Asero",
    "Ita Eko",
    "Olomore",
  ],

  Osun: [
    "Oja Oba",
    "Alekuwodo",
    "Old Garage",
    "Station Road",
    "Oke Baale",
    "Testing Ground",
    "Ring Road Osogbo",
    "Ayetoro",
    "Ogo Oluwa",
    "Powerline",
  ],

  Ondo: [
    "Alagbaka",
    "FUTA South Gate",
    "Oba Adesida",
    "Arakale",
    "Hospital Road",
    "Oke Aro",
    "Ijoka",
    "Shagari Village",
    "Fanibi",
    "Aule",
  ],
};
const areaCoordinates: Record<
  string,
  { lat: number; lng: number }
> = {
  // Oyo
  Mokola: { lat: 7.4016, lng: 3.9082 },
  Dugbe: { lat: 7.3775, lng: 3.8789 },
  Bodija: { lat: 7.4374, lng: 3.8984 },
  Challenge: { lat: 7.3510, lng: 3.8902 },
  "Ring Road": { lat: 7.3657, lng: 3.8968 },
  Ojoo: { lat: 7.4526, lng: 3.8995 },
  "Agodi Gate": { lat: 7.3965, lng: 3.9010 },
  "Iwo Road": { lat: 7.4108, lng: 3.9470 },
  Eleyele: { lat: 7.4401, lng: 3.8577 },
  "University of Ibadan": { lat: 7.4432, lng: 3.9006 },

  // Lagos
  Ikeja: { lat: 6.6018, lng: 3.3515 },
  Alausa: { lat: 6.6218, lng: 3.3575 },
  Ojota: { lat: 6.5836, lng: 3.3869 },
  Maryland: { lat: 6.5731, lng: 3.3677 },
  Yaba: { lat: 6.5095, lng: 3.3711 },
  Surulere: { lat: 6.4969, lng: 3.3581 },
  "Lekki Phase 1": { lat: 6.4478, lng: 3.4726 },
  "Victoria Island": { lat: 6.4281, lng: 3.4219 },
  Ikorodu: { lat: 6.6194, lng: 3.5105 },
  Oshodi: { lat: 6.5535, lng: 3.3431 },

  // Ogun
  Panseke: { lat: 7.1475, lng: 3.3483 },
  Kuto: { lat: 7.1558, lng: 3.3531 },
  Ibara: { lat: 7.1701, lng: 3.3425 },
  Lafenwa: { lat: 7.1804, lng: 3.3612 },
  Camp: { lat: 7.1638, lng: 3.3677 },
  Adatan: { lat: 7.1399, lng: 3.3348 },
  "Oke-Ilewo": { lat: 7.1529, lng: 3.3416 },
  Asero: { lat: 7.1585, lng: 3.3314 },
  "Ita Eko": { lat: 7.1462, lng: 3.3554 },
  Olomore: { lat: 7.1764, lng: 3.3742 },

  // Osun
  "Oja Oba": { lat: 7.7715, lng: 4.5560 },
  Alekuwodo: { lat: 7.7838, lng: 4.5713 },
  "Old Garage": { lat: 7.7654, lng: 4.5618 },
  "Station Road": { lat: 7.7607, lng: 4.5572 },
  "Oke Baale": { lat: 7.7815, lng: 4.5485 },
  "Testing Ground": { lat: 7.7888, lng: 4.5762 },
  "Ring Road Osogbo": { lat: 7.7746, lng: 4.5881 },
  Ayetoro: { lat: 7.7575, lng: 4.5697 },
  "Ogo Oluwa": { lat: 7.7792, lng: 4.5521 },
  Powerline: { lat: 7.7863, lng: 4.5648 },

  // Ondo
  Alagbaka: { lat: 7.2524, lng: 5.2106 },
  "FUTA South Gate": { lat: 7.2981, lng: 5.1456 },
  "Oba Adesida": { lat: 7.2508, lng: 5.1954 },
  Arakale: { lat: 7.2417, lng: 5.2005 },
  "Hospital Road": { lat: 7.2459, lng: 5.2143 },
  "Oke Aro": { lat: 7.2611, lng: 5.1892 },
  Ijoka: { lat: 7.2694, lng: 5.2218 },
  "Shagari Village": { lat: 7.2831, lng: 5.1757 },
  Fanibi: { lat: 7.2576, lng: 5.2051 },
  Aule: { lat: 7.2728, lng: 5.2347 },
};



export default function ReportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
const [category, setCategory] = useState("Flood");
const [urgency, setUrgency] = useState("Medium");
const [stateName, setStateName] = useState("Oyo");
const [area, setArea] = useState(""); 
const [latitude, setLatitude] = useState(0);
const [longitude, setLongitude] = useState(0);
const [description, setDescription] = useState("");
const [loading, setLoading] = useState(false);

useEffect(() => {
  console.log("Getting location...");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);

      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    },
    (error) => {
      console.log("Location error:", error);
    }
  );
}, []);

async function handleSubmit(
  e: React.FormEvent
) {
  e.preventDefault();
  if (!latitude || !longitude) {
  alert("Please allow location access");
  return;
}
  if (!area) {
  alert("Please select an area");
  return;
}

  try {
    setLoading(true);
    const coordinates =
  areaCoordinates[area] || {
    lat: 7.3775,
    lng: 3.947,
  };

    await addDoc(
      collection(db, "incidents"),
      {
        title,
        category,
               description,
        urgency,
        confidence: "Low",
        confirmations: 1,
        disputes: 0,
        latitude: coordinates.lat,
         longitude: coordinates.lng,
        location: `${area}, ${stateName}`,
       createdAt: new Date(),
      }
    );

    setSubmitted(true);
  } catch (error) {
    console.error(error);
    alert("Failed to submit report");
  } finally {
    setLoading(false);
  }
}

 

    return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 py-12">
       <h1  className="text-5xl font-bold text-white">
  Report a Community Issue
</h1>

<p className="mt-4 max-w-2xl text-lg text-slate-300">
  Help others stay informed by reporting flooding,
  traffic, waste issues, power outages, and other
  local conditions in your area.
</p>

        
       

    <div className="mt-8 grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-cyan-900/40 bg-slate-900 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500">
        <h3 className="font-semibold text-white">
          Report
        </h3>

        <p className="mt-2 text-sm text-slate-300">
          Submit local issues happening around you.
        </p>
      </div>

      <div className="rounded-xl border border-cyan-900/40 bg-slate-900 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500">
        <h3 className="font-semibold text-white">
          Verify
        </h3>

        <p className="mt-2 text-sm text-slate-300">
          Community confirmations improve accuracy.
        </p>
      </div>

      <div  className="rounded-xl border border-cyan-900/40 bg-slate-900 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500">
        <h3 className="font-semibold text-white">
          Inform
        </h3>

        <p className="mt-2 text-sm text-slate-300">
          Help residents make better travel decisions.
        </p>
      </div>
    </div>
 
)

        <form
  onSubmit={handleSubmit}
  className="mt-10 space-y-6 rounded-3xl border border-cyan-900/40 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-sm"
>
        
          <div>
            <label className="mb-2 block font-medium text-slate-200">
              Issue Title
            </label>

            <input
  type="text"
  placeholder="Flooding at Mokola"
  value={title}
  onChange={(e) =>
    setTitle(e.target.value)
  }
  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none transition-all focus:border-cyan-500"
/>
          </div>

          <div>
            <label className="mb-2 block font-medium text-slate-200">
              Category
            </label>

            <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
   className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-cyan-500"
>
              <option value="Flood" className="bg-slate-900 text-white">Flood</option>
              <option value="Road" className="bg-slate-900 text-white">Road</option>
              <option value="Waste" className="bg-slate-900 text-white">Waste</option>
              <option value="Electricity" className="bg-slate-900 text-white">Electricity</option>
            </select>

          </div>
          <div>
  <label className="mb-2 block font-medium text-slate-200">
    Urgency Level
  </label>

  <select
    value={urgency}
    onChange={(e) => setUrgency(e.target.value)}
    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none focus:border-cyan-500"
  >
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
  </select>
</div>

          <div>
  <label className="mb-2 block font-medium text-slate-200">
    State
  </label>

  <select
    value={stateName}
    onChange={(e) => {
      setStateName(e.target.value);
      setArea("");
    }}
    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
  >
    {Object.keys(locations).map((state) => (
      <option key={state} value={state}>
        {state}
      </option>
    ))}
  </select>
</div>

<div>
  <label className="mb-2 mt-4 block font-medium text-slate-200">
    Area / Landmark
  </label>

  <select
    value={area}
    onChange={(e) => setArea(e.target.value)}
    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
  >
    <option value="">Select Area</option>

    {locations[
      stateName as keyof typeof locations
    ].map((place) => (
      <option key={place} value={place}>
        {place}
      </option>
    ))}
  </select>
</div>
         

          <div>
            <label className="mb-2 block font-medium text-slate-200">
              Description
            </label>

            <textarea
  rows={5}
  placeholder="Describe what is happening..."
  value={description}
  onChange={(e) =>
    setDescription(e.target.value)
  }
  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none transition-all focus:border-cyan-500"
/>
          </div>
          <div>
  <label className="mb-2 block font-medium text-slate-200">
    Upload Photo Evidence
  </label>

  <input
  type="file"
  accept="image/*"
  capture="environment"
  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
/>
</div>

         <button
  type="submit"
  disabled={loading}
  className="cursor-pointer rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Submitting..." : "Submit Report"}
</button>
         {submitted && (
  <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-green-300">
    ✅ Report submitted successfully.
  </div>
)}
            
        </form>
      </section>
      <Footer />
    </main>
  );
}