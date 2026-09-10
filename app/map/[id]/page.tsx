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
{incident.imageUrl && (
  <div className="mt-8">
    <h2 className="mb-4 text-xl font-semibold text-white">
      Photo Evidence
    </h2>

    <div className="overflow-hidden rounded-2xl border border-cyan-500/20">
      <Image
        src={incident.imageUrl}
        alt="Incident Evidence"
        width={1200}
        height={700}
        className="w-full object-cover"
      />
    </div>
  </div>
)}



          <p className="mt-8 text-lg leading-8 text-slate-300">
            {incident.description}
          </p>

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