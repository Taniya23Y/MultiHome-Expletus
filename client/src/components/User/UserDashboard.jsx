import Sidebar from "./Sidebar";
import PropertyCard from "../UI/PropertyCard";
import Button from "../UI/Button";
import { useGetDashboardOverviewQuery } from "../../redux/features/properties/propertiesApi";

export default function UserDashboard() {
  const { data = {}, isLoading } = useGetDashboardOverviewQuery();

  const stats = data.stats || {
    saved: 4,
    buyApplications: 2,
    rentApplications: 1,
    upcomingVisits: 2,
  };

  const recentProperties = data.recentProperties || [];
  const recommendedRentals = data.recommendedRentals || [];

  return (
    <div className="min-h-screen bg-[#E8F3FF] flex">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-black">
              Welcome back, John 👋
            </h1>
            <p className="text-sm text-black/60">
              Find homes to buy or rent, manage your visits and applications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              className="border border-sky-300 rounded-lg px-3 py-2 w-72 bg-white shadow-sm"
              placeholder="Search properties..."
            />
            <Button className="bg-sky-600 hover:bg-sky-700 text-white">
              Quick Actions
            </Button>
          </div>
        </header>

        {/* STATS CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            ["Saved Homes", stats.saved],
            ["Active Buy Applications", stats.buyApplications],
            ["Active Rental Applications", stats.rentApplications],
            ["Upcoming Visits", stats.upcomingVisits],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-white p-4 rounded-2xl shadow-lg shadow-sky-100"
            >
              <p className="text-sm text-black/60">{label}</p>
              <p className="text-2xl font-bold text-sky-700">{value}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-medium mb-3 text-black">
              Recently Viewed
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isLoading ? (
                <div>Loading...</div>
              ) : recentProperties.length ? (
                recentProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))
              ) : (
                <div className="p-6 bg-white rounded-2xl shadow-md">
                  No recently viewed properties.
                </div>
              )}
            </div>

            {/* TIMELINE */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3 text-black">
                Activity Timeline
              </h3>

              <div className="bg-white rounded-2xl p-4 shadow-md">
                <ul className="space-y-3 text-sm text-black/70">
                  <li>⭐ You saved "Sunny 2BHK in Andheri" • 2 days ago</li>
                  <li>
                    📅 Visit confirmed for "Lakeview Apartment" • Nov 26, 2025
                  </li>
                  <li>
                    📨 Offer sent to seller for "Garden Villa" • Nov 18, 2025
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <aside className="space-y-4">
            {/* RENTAL SUGGESTIONS */}
            <div className="bg-white p-4 rounded-2xl shadow-lg shadow-sky-100">
              <h3 className="font-medium mb-2 text-black">
                Recommended Rentals
              </h3>

              <div className="space-y-3">
                {recommendedRentals.length ? (
                  recommendedRentals.map((r) => (
                    <div
                      key={r.id}
                      className="p-3 border border-sky-200 rounded-lg bg-[#F6FAFF]"
                    >
                      <div className="text-sm font-semibold text-black">
                        {r.title}
                      </div>
                      <div className="text-xs text-black/60">{r.location}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-black/60">
                    No recommendations yet.
                  </div>
                )}
              </div>
            </div>

            {/* SUPPORT BOX */}
            <div className="bg-white p-4 rounded-2xl shadow-lg shadow-sky-100">
              <h3 className="font-medium mb-2 text-black">Support</h3>

              <p className="text-sm text-black/60 mb-3">
                Need help? Contact support or chat with an agent.
              </p>

              <div className="flex gap-2">
                <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                  Help Center
                </Button>
                <Button className="bg-black hover:bg-gray-900 text-white">
                  Chat
                </Button>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
