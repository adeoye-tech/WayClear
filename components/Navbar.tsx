export default function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
  href="/"
  className="flex items-center gap-2 text-xl font-bold text-white"
>
  
  <span>WayClear</span>
</a>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="/"
            className="text-sm font-medium text-slate-200 transition hover:text-green-400"
          >
            Home
          </a>

          <a
            href="/map"
            className="text-sm font-medium text-slate-200 transition hover:text-green-400"
          >
            Explore Map
          </a>

          <a
            href="/report"
           className="rounded-lg bg-linear-to-r from-green-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Report an Issue
          </a>
          <a 
          href="/incidents"
             className="rounded-lg bg-linear-to-r from-green-600 to-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            

        Reports
</a>
        </div>
      </div>
    </nav>
  );
}