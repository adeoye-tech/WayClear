"use client";
import Link from "next/link";
import { useState } from "react";
import { db } from "@/lib/firebase";
import {
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

type Incident = {
  id: string;
  title: string;
  category: string;
  location: string;
  confidence: string;
  confirmations: number;
  disputes?: number;
  activeUpdates?: number;
  urgency?: string;
  createdAt: any;
};

type IncidentSidebarProps = {
  incidents: Incident[];
};
function getTimeAgo(createdAt: any) {
  if (!createdAt) return "Just now";

  const reportTime =
    createdAt.toDate();

  const minutes = Math.floor(
    (Date.now() - reportTime.getTime()) /
      60000
  );

  if (minutes < 1)
    return "Just now";

  if (minutes < 60)
    return `${minutes} min ago`;

  const hours = Math.floor(
    minutes / 60
  );

  if (hours < 24)
    return `${hours} hr ago`;

  const days = Math.floor(
    hours / 24
  );

  return `${days} day${days > 1 ? "s" : ""} ago`;
}
function getConfidenceStyle(confidence: string) {
  switch (confidence) {
    case "High":
      return "border border-green-500/30 bg-green-500/10 text-green-300";
    case "Medium":
      return "border border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
    case "Low":
      return "border border-red-500/30 bg-red-500/10 text-red-300";
    default:
      return "border border-slate-500/30 bg-slate-500/10 text-slate-300";
  }
}


function getUrgencyStyle(urgency: string) {
  switch (urgency) {
    case "High":
      return "border border-red-500/30 bg-red-500/10 text-red-300";
    case "Medium":
      return "border border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
    case "Low":
      return "border border-green-500/30 bg-green-500/10 text-green-300";
    default:
      return "border border-slate-500/30 bg-slate-500/10 text-slate-300";
  }
}

export default function IncidentSidebar({
  incidents,
}: IncidentSidebarProps) {
    const [message, setMessage] = useState("");
const [processing, setProcessing] = useState<string | null>(null);

const [currentPage, setCurrentPage] = useState(1);
const [searchTerm, setSearchTerm] = useState("");
const [sortBy, setSortBy] = useState("newest");

const reportsPerPage = 5;
const filteredReports = incidents.filter(
  (incident) =>
    incident.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    incident.location
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    incident.category
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
);
const sortedReports = [...filteredReports].sort(
  (a, b) => {
    switch (sortBy) {
      case "confirmed":
        return b.confirmations - a.confirmations;

      case "active":
        return (
          (b.activeUpdates || 0) -
          (a.activeUpdates || 0)
        );

      case "confidence":
        const confidenceRank = {
          High: 3,
          Medium: 2,
          Low: 1,
        };

        return (
          confidenceRank[
            b.confidence as keyof typeof confidenceRank
          ] -
          confidenceRank[
            a.confidence as keyof typeof confidenceRank
          ]
        );

      default:
        return (
          b.createdAt?.seconds -
          a.createdAt?.seconds
        );
    }
  }
);

const totalPages = Math.ceil(
  sortedReports.length / reportsPerPage
);

const startIndex =
  (currentPage - 1) * reportsPerPage;

const currentReports = sortedReports.slice(
  startIndex,
  startIndex + reportsPerPage
);
 async function confirmReport(
  id: string,
  currentConfirmations: number
) {
  if (processing === id) return;

setProcessing(id);
  
  const alreadyConfirmed =
    localStorage.getItem(
      `confirm-${id}`
    );

  if (alreadyConfirmed) {
  setMessage(
    "✓ You already confirmed this report"
  );

  setTimeout(() => {
    setMessage("");
  }, 3000);

  setProcessing(null);

  return;
}

  const newConfirmations =
    currentConfirmations + 1;

  let confidence = "Low";

  if (newConfirmations >= 10) {
    confidence = "High";
  } else if (
    newConfirmations >= 5
  ) {
    confidence = "Medium";
  }

  const incidentRef = doc(
    db,
    "incidents",
    id
  );

 localStorage.setItem(
  `confirm-${id}`,
  "true"
);

await updateDoc(incidentRef, {
  confirmations: increment(1),
});

setProcessing(null);
}

async function disputeReport(
  id: string,
  currentDisputes: number
) {
  const alreadyDisputed =
    localStorage.getItem(
      `dispute-${id}`
    );

  if (alreadyDisputed) {
   setMessage(
  "⚠ You already disputed this report"
);

setTimeout(() => {
  setMessage("");
}, 3000);
    return;
  }

  const incidentRef = doc(
    db,
    "incidents",
    id
  );

  await updateDoc(incidentRef, {
    disputes: currentDisputes + 1,
  });

  localStorage.setItem(
    `dispute-${id}`,
    "true"
  );
}

async function reportStillActive(
  id: string
) {
  const lastUpdate =
    localStorage.getItem(
      `active-${id}`
    );

  if (lastUpdate) {
    const diff =
      Date.now() -
      Number(lastUpdate);

    if (diff < 10 * 60 * 1000) {
      
        
      setMessage(
  "⏱ Please wait 10 minutes before marking this report active again"
);

setTimeout(() => {
  setMessage("");
}, 3000);
      return;
    }
  }

  const incidentRef = doc(
    db,
    "incidents",
    id
  );

  await updateDoc(incidentRef, {
    activeUpdates: increment(1),
  });

  localStorage.setItem(
    `active-${id}`,
    Date.now().toString()
  );

  
}
return (

  
  
  <div className="rounded-3xl border border-cyan-500/20 bg-[#081a3a] p-6 shadow-[0_0_25px_rgba(6,182,212,0.08)]">
  <h2 className="text-3xl font-bold text-white">
    Community Reports
  </h2>
  {message && (
  <div className="mt-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-sm text-cyan-300">
    {message}
  </div>
)}

  <p className="mt-6 text-sm text-slate-400">
   Showing {filteredReports.length} active community reports
  </p>
  <input
  type="text"
  placeholder="Search reports..."
  value={searchTerm}
  onChange={(e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }}
  className="mt-4 w-full rounded-xl border border-cyan-500/20 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
/>
<select
  value={sortBy}
  onChange={(e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  }}
  className="mt-3 w-full rounded-xl border border-cyan-500/20 bg-slate-900 px-4 py-3 text-white"
>
  <option value="newest">
    Newest Reports
  </option>

  <option value="confirmed">
    Most Confirmed
  </option>

  <option value="active">
    Most Active
  </option>

  <option value="confidence">
    Highest Confidence
  </option>
</select>
  


     <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
       {currentReports.map((incident) => (
          
  <Link
  href={`/map/${incident.id}`}
  key={incident.id}
  className="block rounded-2xl border border-cyan-500/20 bg-[#0b2147] p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
>
            
  <h3
className={`text-lg font-semibold ${
    incident.category === "Flood"
      ? "text-blue-600"
      : incident.category === "Traffic"
      ? "text-orange-600"
      : incident.category === "Waste"
      ? "text-green-600"
      : incident.category === "Electricity"
      ? "text-yellow-600"
      : incident.category === "Road"
      ? "text-red-600"
      : "text-cyan-600"
  }`}
>
  {incident.category === "Flood" && " "}
  {incident.category === "Traffic" && " "}
  {incident.category === "Waste" && " "}
  {incident.category === "Electricity" && " "}
  {incident.category === "Road" && " "}
  {incident.category === "Water" && " "}
  {incident.title}
</h3>

            <span className="mt-2 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
              {incident.category}
            </span>

            <p className="mt-2 text-sm text-slate-200">
              {incident.location}
            </p>
            <p className="mt-1 text-xs text-slate-500">
   {getTimeAgo(incident.createdAt)}
</p>
            

            <div className="mt-3 flex flex-wrap gap-2">
  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${getConfidenceStyle(
      incident.confidence
    )}`}
  >
    {incident.confidence} Confidence
  </span>

  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${getUrgencyStyle(
      incident.urgency || "Medium"
    )}`}
  >
    {incident.urgency || "Medium"} Urgency
  </span>
</div>

            
            <div className="mt-4 flex flex-col gap-2 rounded-xl border border-cyan-500/10 bg-slate-950/40 px-4 py-3">

  <span className="font-semibold text-cyan-300">
     {incident.confirmations} confirmations
  </span>

  <span className="font-semibold text-yellow-300">
    🔄 {incident.activeUpdates || 0} active updates
  </span>

  <span className="font-semibold text-red-300">
     {incident.disputes || 0} disputes
  </span>

</div>
           
            {incident.confidence === "High" && (
  <div className="mt-2">
    <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-300">
      ✓ Community Verified
    </span>
  </div>
)}

            <button
  disabled={processing === incident.id}
  onClick={(e) => {
    e.preventDefault();
    confirmReport(
  incident.id,
  incident.confirmations
);
  }}
  className="mt-3 w-full rounded-xl bg-cyan-600 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-cyan-500"
>
  Confirm Report
</button>
<button
  onClick={(e) => {
    e.preventDefault();

    reportStillActive(
      incident.id
    );
  }}
  className="mt-2 w-full rounded-xl border border-yellow-500/40 bg-yellow-500/10 py-2 text-sm font-medium text-yellow-300 transition-all duration-300 hover:bg-yellow-500/20"
>
  🔄 Still Active
</button>
<button
  onClick={(e) => {
    e.preventDefault();

    disputeReport(
      incident.id,
      incident.disputes || 0
    );
  }}
  className="mt-2 w-full rounded-xl border border-red-500/40 bg-red-500/10 py-2 text-sm font-medium text-red-300 transition-all duration-300 hover:bg-red-500/20"
>
  Dispute Report
</button>
          </Link>
        ))}
      </div>
    <div className="mt-8 flex items-center justify-center gap-2">
  <button
    onClick={() =>
      setCurrentPage((prev) =>
        Math.max(prev - 1, 1)
      )
    }
    disabled={currentPage === 1}
    className="rounded-xl border border-cyan-500/20 px-4 py-2 text-white disabled:opacity-50"
  >
    Previous
  </button>

  {Array.from(
    { length: totalPages },
    (_, index) => (
      <button
        key={index + 1}
        onClick={() =>
          setCurrentPage(index + 1)
        }
        className={`rounded-xl px-4 py-2 ${
          currentPage === index + 1
            ? "bg-cyan-600 text-white"
            : "border border-cyan-500/20 text-slate-300"
        }`}
      >
        {index + 1}
      </button>
    )
  )}

  <button
    onClick={() =>
      setCurrentPage((prev) =>
        Math.min(prev + 1, totalPages)
      )
    }
    disabled={currentPage === totalPages}
    className="rounded-xl border border-cyan-500/20 px-4 py-2 text-white disabled:opacity-50"
  >
    Next
  </button>
</div>
    </div>
);
}

