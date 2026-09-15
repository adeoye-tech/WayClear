"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IncidentSidebar from "@/components/IncidentSidebar";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<any[]>([]);

  console.log('incidents',incidents)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "incidents"),
      (snapshot) => {
        const data = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
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

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-5xl font-bold text-white">
          Live Incident Feed
        </h1>

        <p className="mt-4 text-slate-300">
          Browse community reports from across Nigeria.
        </p>

        <div className="mt-8">
          <IncidentSidebar incidents={incidents} />
        </div>
      </section>

      <Footer />
    </main>
  );
}