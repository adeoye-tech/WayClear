import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main  className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
            <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-24">
  <div className="text-center">
    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
      Community Powered
    </span>
    

    <h1 className="mt-6  text-white text-6xl font-extrabold tracking-tight ">
      Know Before You Go
    </h1>

    <p className="mx-auto max-w-3xl text-xl text-slate-300">
    
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


<section className="mx-auto max-w-6xl px-6 pb-20">
  <div className="grid gap-6 md:grid-cols-3">
    <div className="rounded-3xl border border-cyan-900/30 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500">
      <h3 className="text-4xl font-bold text-cyan-300">
        8
      </h3>
      <p className="mt-2 text-slate-600">
        Active Reports
      </p>
    </div>

    <div className="rounded-3xl border border-cyan-900/30 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500">
      <h3 className="text-4xl font-bold text-cyan-300">
        124
      </h3>
      <p className="mt-2 text-slate-600">
        Community Verifications
      </p>
    </div>

    <div className="rounded-3xl border border-cyan-900/30 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500">
      <h3 className="text-4xl font-bold text-cyan-300">
        6
      </h3>
      <p className="mt-2 text-slate-600">
        Communities Covered
      </p>
    </div>
  </div>
</section>

      

      <section className="bg-slate-950 py-24">
  <div className="mx-auto max-w-7xl px-6">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-4xl font-bold text-white">
       Why Communities Trust WayClear
      </h2>

      <p className="mt-4 text-lg text-slate-300">
        People often know where they are going but have no idea what the
        situation is like when they get there.
      </p>
    </div>

    <div className="mt-16 grid gap-8 md:grid-cols-3">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:border-cyan-500 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-white">
          Unexpected Flooding
        </h3>

        <p className="mt-3 text-slate-600">
          Roads that were accessible yesterday may be flooded today, causing
          delays, wasted transport costs and frustration.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:border-cyan-500 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-white">
          Community Issues
        </h3>

        <p className="mt-3 text-slate-600">
          Waste buildup, water shortages and electricity problems often go
          unnoticed until people arrive at the location.
        </p>
      </div>
      
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:border-cyan-500 hover:shadow-xl">
        <h3 className="text-xl font-semibold text-white">
          Lack of Local Information
        </h3>

        <p className="mt-3 text-slate-600">
          Existing maps show where places are, but they rarely show what is
          currently happening there.
        </p>
      </div>
    </div>

    <div className="mt-16 rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-700 to-slate-900 p-10 text-white shadow-2xl">
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

    

<section className="bg-slate-950 py-24">
  <div className="mx-auto max-w-7xl px-6">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-4xl font-bold text-white">
        How Community Intelligence Works
      </h2>

      <p className="mt-4 text-lg text-slate-300">
        A simple community-driven process that helps people stay informed
        about real-world conditions around them.
      </p>
    </div>

    <div className="mt-16 grid gap-8 md:grid-cols-3">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700">
          1
        </div>

        <h3 className="text-xl font-semibold text-slate-900">
          Report
        </h3>

        <p className="mt-3 text-slate-600">
          Users report issues such as flooding, bad roads, waste problems,
          water shortages, electricity issues or traffic incidents.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700">
          2
        </div>

        <h3 className="text-xl font-semibold text-slate-900">
          Verify
        </h3>

        <p className="mt-3 text-slate-600">
          Other community members can confirm or dispute reports, helping
          improve the reliability of the information shown on the map.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700">
          3
        </div>

        <h3 className="text-xl font-semibold text-slate-900">
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

<section className="mx-auto max-w-6xl px-6 pb-24">
  <h2 className="mb-8 text-center text-3xl font-bold text-white">
    🔥 Trending Incidents
  </h2>

  <div className="grid gap-6 md:grid-cols-3">
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-xl">
      <h3 className="font-semibold text-white">
        Traffic Gridlock
      </h3>

      <p className="mt-2 text-slate-300">
        Iwo Road, Ibadan
      </p>

      <p className="mt-4 font-semibold text-cyan-300">
        31 confirmations
      </p>
    </div>

    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-xl">
      <h3 className="font-semibold text-white">
        Flooding
      </h3>

      <p className="mt-2 text-slate-300">
        Mokola, Ibadan
      </p>

      <p className="mt-4 font-semibold text-cyan-300">
        27 confirmations
      </p>
    </div>

    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-xl">
      <h3 className="font-semibold text-white">
        Road Construction
      </h3>

      <p className="mt-2 text-slate-300">
        UI Road, Ibadan
      </p>

      <p className="mt-4 font-semibold text-cyan-300">
        25 confirmations
      </p>
    </div>
  </div>
</section>
<section className="mx-auto max-w-6xl px-6 pb-24">
 <h2 className="mb-8 text-center text-3xl font-bold text-white">
    Recent Activity
  </h2>

  <div  className="rounded-3xl border border-cyan-900/30 bg-slate-900/40 p-8 backdrop-blur-sm">
   <div className="space-y-4 text-slate-300">
       <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
  ✅ Flooding report confirmed by 3 users
</div>
     <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
     ⚠️ New traffic incident reported at Dugbe
     </div> 
      <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
      🔌 Power outage reported at Bodija
      </div>
      <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
      🗑️ Waste issue updated at Ring Road
      </div>
    </div>
  </div>
</section>

<section className="mx-auto max-w-6xl px-6 pb-24">
  <h2 className="mb-8 text-center text-3xl font-bold text-white">
    Community Statistics
  </h2>

  <div className="grid gap-6 md:grid-cols-4">
    <div className="rounded-2xl border border-cyan-900/40 bg-slate-900 p-6 shadow-lg">
      <p className="text-sm text-slate-400">
        Flood Reports
      </p>

      <h3 className="mt-2 text-3xl font-bold text-blue-600">
        4
      </h3>
    </div>

    <div className="rounded-2xl border border-cyan-900/40 bg-slate-900 p-6 shadow-lg">
      <p className="text-sm text-slate-400">
        Traffic Reports
      </p>

      <h3 className="mt-2 text-3xl font-bold text-orange-600">
        4
      </h3>
    </div>

    <div className="rounded-2xl border border-cyan-900/40 bg-slate-900 p-6 shadow-lg">
      <p className="text-sm text-slate-400">
        Waste Reports
      </p>

      <h3 className="mt-2 text-3xl font-bold text-green-600">
        3
      </h3>
    </div>

    <div className="rounded-2xl border border-cyan-900/40 bg-slate-900 p-6 shadow-lg">
      <p className="text-sm text-slate-400">
        Verified Reports
      </p>

      <h3 className="mt-2 text-3xl font-bold text-purple-600">
        124
      </h3>
    </div>
  </div>
</section>

<section className="bg-slate-950 py-24">
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
      <div className="rounded-2xl border border-red-500/30 bg-slate-900 p-6">
        <h3 className="text-xl font-semibold text-red-700">
          Flooding
        </h3>

        <p className="mt-3 text-slate-300">
          Reports of flooded roads, blocked drainage systems and areas
          affected by heavy rainfall.
        </p>
      </div>

      <div className="rounded-2xl border border-red-500/30 bg-slate-900 p-6">
        <h3 className="text-xl font-semibold text-orange-700">
          Bad Roads
        </h3>

        <p className="mt-3 text-slate-300">
          Potholes, damaged roads and routes that may affect movement.
        </p>
      </div>

      <div className="rounded-2xl border border-red-500/30 bg-slate-900 p-6">
        <h3 className="text-xl font-semibold text-yellow-700">
          Electricity Issues
        </h3>

        <p className="mt-3 text-slate-300">
          Power outages and electrical disruptions affecting communities.
        </p>
      </div>

      <div className="rounded-2xl border border-red-500/30 bg-slate-900 p-6">
        <h3 className="text-xl font-semibold text-blue-700">
          Water Shortages
        </h3>

        <p className="mt-3 text-slate-300">
          Areas experiencing limited access to water or supply interruptions.
        </p>
      </div>

      <div className="rounded-2xl border border-red-500/30 bg-slate-900 p-6">
        <h3 className="text-xl font-semibold text-amber-700">
          Waste Issues
        </h3>

        <p className="mt-3 text-slate-300">
          Uncollected waste, overflowing bins and sanitation concerns.
        </p>
      </div>

      <div className="rounded-2xl border border-red-500/30 bg-slate-900 p-6">
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

<section className="border-t border-cyan-900/40 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 py-24">
  <div className="mx-auto max-w-4xl px-6 text-center">
    <h2 className="text-5xl font-bold text-white">
      Help Communities Stay Informed
    </h2>

    <p className="mt-6 text-lg text-slate-300">
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
    </div>
  </div>
</section>
<Footer />
    </main>
  );
}