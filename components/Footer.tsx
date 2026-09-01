export default function Footer() {
  return (
    <footer className="border-t border-cyan-900/40 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">

          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold text-white">
              <span>🗺️</span>
              <span>WayClear</span>
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Community-powered intelligence platform helping people
              stay informed about real-world conditions before they
              travel.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">
              Quick Links
            </h4>

            <div className="space-y-3">
              <a
                href="/"
                className="block text-slate-400 transition hover:text-cyan-400"
              >
                Home
              </a>

              <a
                href="/map"
                className="block text-slate-400 transition hover:text-cyan-400"
              >
                Explore Map
              </a>

              <a
                href="/report"
                className="block text-slate-400 transition hover:text-cyan-400"
              >
                Report Issue
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">
              Platform Features
            </h4>

            <div className="space-y-3 text-slate-400">
              <p>✓ Real-Time Reports</p>
              <p>✓ Community Verification</p>
              <p>✓ Live Incident Mapping</p>
              <p>✓ Confidence Scoring</p>
            </div>
          </div>

        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center">
          <p className="text-sm text-slate-500">
            © 2026 WayClear • Built by Adeoye
          </p>
        </div>
      </div>
    </footer>
  );
}