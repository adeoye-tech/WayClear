"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect,  useState  } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getFCMToken } from "@/lib/messaging";
import { getNearbyIncidents } from "@/lib/nearbyIncidents";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";

export default function Home() {
  const [nearbyAlerts, setNearbyAlerts] = useState<any[]>([]);
  const [incidents, setIncidents] = useState<any[]>([]);
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
  useEffect(() => {
  async function registerUser() {
    try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") return;

      const token = await getFCMToken();
console.log("FCM Token:", token);
      if (!token) return;

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
const nearby = await getNearbyIncidents(
  position.coords.latitude,
  position.coords.longitude
);

console.log("Nearby Incidents:", nearby);
setNearbyAlerts(nearby);

          await setDoc(
            doc(db, "users", token),
            {
              token,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              notificationsEnabled: true,
              lastUpdated: new Date(),
            }
          );

          console.log("User registered");
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  registerUser();
}, []);
const totalReports = incidents.length;

const totalVerifications = incidents.reduce(
  (sum, incident) =>
    sum + (incident.confirmations || 0),
  0
);

const totalCommunities = new Set(
  incidents.map(
    (incident) => incident.location
  )
).size;
const trendingIncidents = [...incidents]
  .sort(
    (a: any, b: any) =>
      (b.confirmations || 0) -
      (a.confirmations || 0)
  )
  .slice(0, 3);
  const recentActivities = incidents
  .slice(0, 4);
  const floodReports = incidents.filter(
  (incident) => incident.category === "Flood"
).length;

const trafficReports = incidents.filter(
  (incident) => incident.category === "Traffic"
).length;

const wasteReports = incidents.filter(
  (incident) => incident.category === "Waste"
).length;

const verifiedReports = incidents.filter(
  (incident) => incident.confidence === "High"
).length;

  return (
    <main  className="min-h-screen bg-linear-to-r from-slate-200 via-slate-400 to-blue-300">
            <Navbar />
            {nearbyAlerts.length > 0 && (
  <div className="mx-auto max-w-6xl px-6 pt-6">
    <div className="rounded-xl border border-yellow-500 bg-yellow-500/10 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
  <p className="font-semibold text-yellow-600">
     {nearbyAlerts[0]?.title} reported near {nearbyAlerts[0]?.location}
  </p>

 <a
  href={`/map?incident=${nearbyAlerts[0]?.id}`}
  className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-yellow-400"
>
  View on Map
</a>
</div>
    </div>
  </div>
)}

      <section className="mx-auto max-w-6xl px-6 py-24">
  <div className="text-center">
    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
      Community Powered
    </span>
    

    <h1 className="mt-6  text-white text-2xl md:text-6xl font-extrabold tracking-tight ">
      Know Before You Go
    </h1>

    <p className="mx-auto max-w-3xl text-sm md:text-xl text-slate-600">
    
      See real-time reports about flooding,
      traffic, power outages, waste issues,
      and other local conditions before
      leaving home.
    </p>

    <div className="mt-8 flex justify-center gap-4">
      <a
        href="/map"
        className="rounded-xl hover:scale-105 transition-all duration-300 bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
      >
        Explore Map
      </a>

      <a
        href="/report"
        className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700"
      >
        Report Issue
      </a>
    </div>
  </div>
</section>


<section className="mx-auto md:max-w-6xl px-6">
  <div className="grid gap-6 px-6 md:grid-cols-3">
    <div className="rounded-3xl border border-cyan-900/30 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500">
      <h3 className="text-4xl font-bold text-cyan-300">
       {totalReports}
      </h3>
      <p className="mt-2 text-white">
        Active Reports
      </p>
    </div>

    <div className="rounded-3xl border border-cyan-900/30 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500">
      <h3 className="text-4xl font-bold text-cyan-300">
        {totalVerifications}
      </h3>
      <p className="mt-2 text-white">
        Community Verifications
      </p>
    </div>

    <div className="rounded-3xl border border-cyan-900/30 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500">
      <h3 className="text-4xl font-bold text-cyan-300">
       {totalCommunities}
      </h3>
      <p className="mt-2 text-white">
        Communities Covered
      </p>
    </div>
  </div>
</section>

      

      <section className="px-6 mt-10">
  <div className="mx-auto max-w-7xl px-6">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-4xl font-bold text-white">
       Why Communities Trust WayClear
      </h2>

      <p className="mt-4 text-lg text-gray-600">
        People often know where they are going but have no idea what the
        situation is like when they get there.
      </p>
    </div>

    <div className="mt-16 grid gap-8 md:grid-cols-3">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:border-cyan-500 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-white">
          Unexpected Flooding
        </h3>

        <p className="mt-3 text-white">
          Roads that were accessible yesterday may be flooded today, causing
          delays, wasted transport costs and frustration.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:border-cyan-500 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-white">
          Community Issues
        </h3>

        <p className="mt-3 text-white">
          Waste buildup, water shortages and electricity problems often go
          unnoticed until people arrive at the location.
        </p>
      </div>
      
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:border-cyan-500 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-white">
          Lack of Local Information
        </h3>

        <p className="mt-3 text-white">
          Existing maps show where places are, but they rarely show what is
          currently happening there.
        </p>
      </div>
    </div>

    <div className="my-16 rounded-3xl bg-linear-to-r from-slate-800 p-10 text-white shadow-2xl">
      <h3 className="text-3xl font-bold">
        Our Solution
      </h3>

      <p className="mt-4 max-w-3xl text-lg text-green-50">
       WayClear allows communities to share and verify local
        conditions in real time. Users can report incidents, confirm reports
        and help others make informed decisions before travelling.
      </p>
    </div>
  </div>
</section>

    

<section className="px-6">
  <div className="mx-auto max-w-7xl px-6">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-4xl font-bold text-white">
        How Community Intelligence Works
      </h2>

      <p className="mt-4 text-lg text-gray-600">
        A simple community-driven process that helps people stay informed
        about real-world conditions around them.
      </p>
    </div>

    <div className="mt-16 grid gap-8 md:grid-cols-3">
      <div className="rounded-3xl border border-slate-800 bg-slate-300 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700">
          1
        </div>

        <h3 className="text-xl font-semibold text-white">
          Report
        </h3>

        <p className="mt-3 text-slate-600">
          Users report issues such as flooding, bad roads, waste problems,
          water shortages, electricity issues or traffic incidents.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-300 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700">
          2
        </div>

        <h3 className="text-xl font-semibold text-white">
          Verify
        </h3>

        <p className="mt-3 text-slate-600">
          Other community members can confirm or dispute reports, helping
          improve the reliability of the information shown on the map.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-300 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700">
          3
        </div>

        <h3 className="text-xl font-semibold text-white">
          Explore
        </h3>

        <p className="mt-3 text-slate-600">
          People can view active incidents, confidence levels and recent
          updates before deciding where to travel or what action to take.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="mx-auto max-w-6xl px-6 my-15 ">
  <h2 className="mb-8 text-center text-3xl font-bold text-white">
     Trending Incidents
  </h2>
 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-6">

  
  {trendingIncidents.length > 0 ? (
  trendingIncidents.map((incident) => (
 <Link
  href={`/map/${incident.id}`}
  key={incident.id}
  className="block min-h-55 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-xl"
>
      <h3 className="text-xl font-semibold text-white">
        {incident.title}
      </h3>

      <p  className="mt-3 text-slate-300 -wrap-break-words">
        {incident.location}
      </p>

      <p className="mt-4 font-semibold text-cyan-300">
        {incident.confirmations || 0} confirmations
      </p>
      <p className="mt-4 text-sm font-medium text-cyan-400">
  View details →
</p>
    </Link>
  ))
) : (
  <p className="text-slate-400">
    No trending incidents available.
  </p>
)}
    
  
</div>
 
</section>
<section className="mx-auto max-w-6xl px-6 my-15">
 <h2 className="mb-8 text-center text-3xl font-bold text-white">
    Recent Activity
  </h2>

  <div  className=" bg-slate-900 p-8 backdrop-blur-sm">
   <div className="space-y-4 text-slate-300">
       {recentActivities.map((incident) => (
  <div
    key={incident.id}
    className="rounded-xl border border-green-500/20 bg-green-500/10 p-4"
  >
    New {incident.category} incident reported at{" "}
    {incident.location}
  </div>
))}
    </div>
  </div>
</section>

<section className="mx-auto max-w-6xl px-6 my-15">
  <h2 className="mb-8 text-center text-3xl font-bold text-white">
    Community Statistics
  </h2>

  <div className="grid gap-6 md:grid-cols-4">
    <div className="max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center  bg-slate-900 p-6 shadow-lg">
      <p className="text-sm text-slate-400">
        Flood Reports
      </p>

      <h3 className="mt-2 text-3xl font-bold text-blue-600">
        {floodReports}
      </h3>
    </div>

    <div className="max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center  bg-slate-900 p-6 shadow-lg">

      <p className="text-sm text-slate-400">
        Traffic Reports
      </p>

      <h3 className="mt-2 text-3xl font-bold text-orange-600">
        {trafficReports}
      </h3>
    </div>

        <div className="max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center  bg-slate-900 p-6 shadow-lg">

      <p className="text-sm text-slate-400">
        Waste Reports
      </p>

      <h3 className="mt-2 text-3xl font-bold text-green-600">
       {wasteReports}
      </h3>
    </div>

        <div className="max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center  bg-slate-900 p-6 shadow-lg">

      <p className="text-sm text-slate-400">
        Verified Reports
      </p>

      <h3 className="mt-2 text-3xl font-bold text-purple-600">
        124
      </h3>
    </div>
  </div>
</section>

<section className="bg-black my-15 py-10">
  <div className="mx-auto max-w-7xl px-6">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-4xl font-bold text-white">
        What Can Be Reported?
      </h2>

      <p className="mt-4 text-lg text-slate-300">
        Track important community issues and stay informed before making
        decisions about where to go.
      </p>
    </div>

    <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className=" bg-slate-900 p-6">
        <h3 className="text-xl font-semibold text-red-700">
          Flooding
        </h3>

        <p className="mt-3 text-slate-300">
          Reports of flooded roads, blocked drainage systems and areas
          affected by heavy rainfall.
        </p>
      </div>

      <div className=" bg-slate-900 p-6">
        <h3 className="text-xl font-semibold text-orange-700">
          Bad Roads
        </h3>

        <p className="mt-3 text-slate-300">
          Potholes, damaged roads and routes that may affect movement.
        </p>
      </div>

      <div className=" bg-slate-900 p-6">
        <h3 className="text-xl font-semibold text-yellow-700">
          Electricity Issues
        </h3>

        <p className="mt-3 text-slate-300">
          Power outages and electrical disruptions affecting communities.
        </p>
      </div>

      <div className=" bg-slate-900 p-6">
        <h3 className="text-xl font-semibold text-blue-700">
          Water Shortages
        </h3>

        <p className="mt-3 text-slate-300">
          Areas experiencing limited access to water or supply interruptions.
        </p>
      </div>

      <div className=" bg-slate-900 p-6">
        <h3 className="text-xl font-semibold text-amber-700">
          Waste Issues
        </h3>

        <p className="mt-3 text-slate-300">
          Uncollected waste, overflowing bins and sanitation concerns.
        </p>
      </div>

      <div className=" bg-slate-900 p-6">
        <h3 className="text-xl font-semibold text-purple-700">
          Traffic
        </h3>

        <p className="mt-3 text-slate-300">
          Road congestion, accidents and other movement-related incidents.
        </p>
      </div>
    </div>
  </div>
</section>

<section className=" px-6 my-15">
  <div className="mx-auto max-w-4xl px-6 text-center">
    <h2 className="text-5xl font-bold text-slate-900">
      Help Communities Stay Informed
    </h2>

    <p className="mt-6 text-lg text-gray-600">
      Join a growing network of people sharing real-world information that
      helps others make smarter decisions before they travel.
    </p>

    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
      <a
        href="/map"
        className="rounded-xl hover:scale-105 transition-all duration-300 bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
      >
        Explore the Map
      </a>

      <a
        href="/report"
        className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-white hover:border-green-500"
      >
        Report an Issue
      </a>
      <a href="/reports">
  <button
     className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-white hover:border-green-500"
      >      
    View Reports
  </button>
</a>
    </div>
  </div>
</section>
<Footer />
    </main>
  );
}