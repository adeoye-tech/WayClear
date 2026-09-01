import Navbar from "@/components/Navbar";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";



type Props = {
  params: Promise<{
    id: string;
  }>;
};

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

export default async function IncidentDetailsPage({
  params,
}: Props) {
 const { id } = await params;

const docRef = doc(db, "incidents", id);
const docSnap = await getDoc(docRef);

if (!docSnap.exists()) {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold text-white">
          Incident Not Found
        </h1>
      </div>
    </main>
  );
}

const incident: any = {
  id: docSnap.id,
  ...docSnap.data(),
};

  const imageMap: Record<string, string> = {
  Flood: "/images/flood.jpg",
  Traffic: "/images/traffic.jpg",
  Waste: "/images/waste.jpg",
  Electricity: "/images/electricity.jpg",
  Road: "/images/road.jpg",
  Water: "/images/water.jpg",
};

  if (!incident) {
    return (
     <main className="min-h-screen bg-slate-950">
        <Navbar />
        <div className="mx-auto max-w-4xl px-6 py-12">
          <h1 className="text-3xl font-bold">
            Incident Not Found
          </h1>
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
  Last Updated: 20 minutes ago
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
<span className="rounded-full bg-red-100 px-4 py-2 text-sm text-red-700">
  High Impact Area
</span>
<div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
  <h2 className="font-semibold text-green-400">
    Community Advice
  </h2>

  <p className="mt-2 text-green-300">
    Residents are advised to use alternative routes
    and monitor local conditions before travelling.
  </p>
</div>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl">
  <Image
    src={
      imageMap[incident.category] ||
      "/images/flood.jpg"
    }
    alt={incident.title}
    width={1200}
    height={600}
    className="h-96 w-full object-cover"
  />
</div>

          <p className="mt-8 text-lg leading-8 text-slate-300">
            {incident.description}
          </p>

          <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-slate-950/50 p-6">
            <h2 className="font-semibold text-white">
              Community Verification
            </h2>

            <p className="mt-2 text-slate-300">
              {incident.confirmations} users have confirmed
              this report.
            </p>
          </div>
          <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-slate-950/50 p-6">
  <h2 className="font-semibold text-white">
    Community Impact
  </h2>

  <ul className="mt-3 space-y-2 text-slate-300">
    <li>• Traffic delays reported in the area</li>
    <li>• Residents advised to take alternative routes</li>
    <li>• Local businesses may be affected</li>
  </ul>
</div>
        </div>
      </section>
    </main>
  );
}