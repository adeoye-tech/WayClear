"use client";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";

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
    //const coordinates =
 // areaCoordinates[area] || {
    
    const docRef = await addDoc(
  collection(db, "incidents"),
  {
    title,
    category,
    description,
    urgency,
    confidence: "Low",
    confirmations: 1,
    disputes: 0,
    activeUpdates: 0,
    latitude,
    longitude,
    location: `${area}, ${stateName}`,
    createdAt: new Date(),
  }
);
    localStorage.setItem(
  `confirm-${docRef.id}`,
  "true"
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
    <main className="min-h-screen bg-linear-to-b from-slate-900 via-slate-950 to-blue-950">
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

  <input
    type="text"
    value={stateName}
    onChange={(e) =>
      setStateName(e.target.value)
    }
    placeholder="e.g Oyo"
    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
  />
</div>

         <div>
  <label className="mb-2 mt-4 block font-medium text-slate-200">
    Area / Landmark
  </label>

  <input
    type="text"
    value={area}
    onChange={(e) => setArea(e.target.value)}
    placeholder="e.g Mokola, Challenge, Bodija"
    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
  />
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