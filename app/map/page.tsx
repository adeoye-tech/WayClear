"use client";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import FilterBar from "@/components/FilterBar";
import { findFloodZones } from "@/lib/zones";

import dynamic from "next/dynamic";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";

const MapComponent = dynamic(
  () => import("@/components/MapComponent"),
  {
    ssr: false,
  }
);

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");
    const [incidents, setIncidents] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const searchParams = useSearchParams();
    const incidentId = searchParams.get("incident");


    useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "incidents"),
    (snapshot) => {
      const data = snapshot.docs
  .map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  .filter(
  (incident: any) =>
    incident.expiresAt &&
    incident.expiresAt.toDate() > new Date()
)
  
  .sort(
    (a: any, b: any) =>
      b.createdAt?.toDate().getTime() -
      a.createdAt?.toDate().getTime()
  );

      setIncidents(data);
    }
  );

  return () => unsubscribe();
}, []);

const totalReports = incidents.length;

const totalVerifications =
  incidents.reduce(
    (sum, incident) =>
      sum + incident.confirmations,
    0
  );

const totalCommunities =
  new Set(
    incidents.map(
      (incident) => incident.location
    )
  ).size;

const highConfidenceReports =
  incidents.filter(
    (incident) =>
      incident.confidence === "High"
  ).length;

  const filteredIncidents = incidents.filter(
  (incident) => {
    const matchesCategory =
      selectedCategory === "All" ||
      incident.category === selectedCategory;
      

    const matchesSearch =
      incident.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      incident.location
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
        

    return matchesCategory && matchesSearch;
  }
);
const floodZones =
  findFloodZones(filteredIncidents);
const selectedIncident = incidents.find(
  (incident) => incident.id === incidentId
);
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-10">
        {selectedIncident && (
  <div className="mb-6 rounded-2xl border border-yellow-500 bg-yellow-500/10 p-4">
    <p className="font-semibold text-yellow-300">
      Nearby Incident Alert
    </p>

    <p className="mt-2 text-white">
      {selectedIncident.title}
    </p>

    <p className="text-slate-300">
      {selectedIncident.location}
    </p>
  </div>
)}
        <h1 className="text-5xl font-bold text-white">
  WayClear
</h1>

<p className="mt-4 max-w-3xl text-lg text-slate-300">
  Real-time reports from communities across Ibadan.
  See flooding, traffic, power outages, waste issues,
  and other local conditions before travelling.
</p>
<div className="mt-8 rounded-3xl bg-linear-to-r from-cyan-600 via-blue-700 to-slate-900 p-8 text-white shadow-2xl border border-cyan-500/20">
  <p  className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
    Live Community Intelligence
  </p>

  <h2  className="mt-2 text-3xl font-bold tracking-tight">
    Stay Ahead of Local Disruptions
  </h2>

  <p className="mt-3 max-w-2xl text-green-50">
    Monitor real-time incidents, verify reports,
    and make informed travel decisions across
    Nigerian communities.
  </p>
</div>

<div className="mt-8">
  <input
    type="text"
    placeholder=" Search incidents, locations or communities..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="w-full rounded-2xl border border-cyan-500/20 bg-[#081a3a] px-5 py-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
  />
</div>
        <div className="mt-4 rounded-xl border border-cyan-800 bg-slate-900 p-4 text-sm text-cyan-300">
  Reports gain credibility through community confirmations. The more
  confirmations a report receives, the higher its confidence level.
</div>

<div className="mt-8 grid gap-4 md:grid-cols-4">
  <div className="rounded-2xl border border-cyan-900/40 bg-slate-900/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-cyan-500/20">
    <p className="text-sm text-slate-500">
       Active Reports
    </p>

    <h3 className="mt-2 text-3xl font-bold text-cyan-300">
      {totalReports}
    </h3>
  </div>

  <div className="rounded-2xl border border-cyan-900/40 bg-slate-900/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-cyan-500/20">
    <p className="text-sm text-slate-500">
   Verifications
    </p>

    <h3 className="mt-2 text-3xl font-bold text-cyan-300">
      {totalVerifications}
    </h3>
  </div>

  <div className="rounded-2xl border border-cyan-900/40 bg-slate-900/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-cyan-500/20">
    <p className="text-sm text-slate-500">
       Communities
    </p>

    <h3 className="mt-2 text-3xl font-bold text-cyan-300">
      {totalCommunities}
    </h3>
  </div>

  <div className="rounded-2xl border border-cyan-900/40 bg-slate-900/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-cyan-500/20">
    <p className="text-sm text-slate-500">
       High Confidence
    </p>

    <h3 className="mt-2 text-3xl font-bold text-cyan-300">
      {highConfidenceReports}
    </h3>
  </div>
</div>

        <div className="mt-8 rounded-3xl border border-cyan-500/20 bg-[#081a3a] p-8 shadow-[0_0_25px_rgba(6,182,212,0.08)]">
  <div className="mb-6 flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold text-white">
        Filter Reports
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Browse incidents by category
      </p>
    </div>

    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
      {filteredIncidents.length} Reports
    </span>
  </div>

  <FilterBar
    selected={selectedCategory}
    onSelect={setSelectedCategory}
  />
</div>

       <div className="mt-8">
  <div className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-[#081a3a] shadow-[0_0_30px_rgba(6,182,212,0.08)]">
    <div className="border-b border-cyan-500/20 px-6 py-4">
      <h2 className="text-2xl font-bold text-white">
        Live Incident Map
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Community reported incidents across Nigeria
      </p>
    </div>
    <div className="mb-4 flex justify-end">
  <a
    href="/incidents"
    className="rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-500"
  >
    View All Reports
  </a>
</div>

   <MapComponent
  incidents={filteredIncidents}
  floodZones={floodZones}
  selectedIncidentId={incidentId}
/>
  </div>
</div>
      </section>
      <div className="mt-16">
  <Footer />
</div>
    </main>
  );
}