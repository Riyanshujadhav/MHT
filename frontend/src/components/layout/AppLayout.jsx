import clsx from "clsx";
import { Activity, LogOut, Pill, Stethoscope, UserRound } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navConfig = {
  PATIENT: [
    { to: "/patient/dashboard", label: "Home" },
    { to: "/patient/history", label: "History" },
    { to: "/patient/prescriptions", label: "Prescriptions" },
    { to: "/patient/appointments", label: "Appointments" },
  ],
  DOCTOR: [
    { to: "/doctor/dashboard", label: "Home" },
    { to: "/doctor/patients", label: "Patients" },
    { to: "/doctor/prescriptions", label: "Prescriptions" },
    { to: "/doctor/appointments", label: "Appointments" },
  ],
};

export function AppLayout() {
  const { session, logout } = useAuth();
  const user = session?.profile;
  const items = navConfig[session?.role] ?? [];

  return (
    <div className="min-h-screen bg-noir text-white">
      <header className="sticky top-0 z-20 border-b border-white/6 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to={items[0]?.to ?? "/login"} className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald to-emerald/60 text-black shadow-emerald">
              <Activity size={24} />
            </div>
            <div>
              <div className="text-3xl font-extrabold tracking-tight">MHT</div>
              <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Pulse
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-3 lg:flex">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    "rounded-2xl px-5 py-3 text-sm font-semibold transition",
                    isActive
                      ? "border border-emerald/40 bg-emerald/14 text-emerald shadow-emerald"
                      : "text-zinc-400 hover:bg-white/[0.04] hover:text-white",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-2 sm:flex">
              <img
                src={user?.avatarUrl}
                alt={user?.fullName}
                className="h-11 w-11 rounded-full object-cover ring-1 ring-emerald/40"
              />
              <div className="text-right">
                <div className="font-semibold text-white">{user?.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {session?.role === "DOCTOR" ? user?.specialization : user?.id}
                </div>
              </div>
              {session?.role === "DOCTOR" ? (
                <Stethoscope className="text-emerald" size={18} />
              ) : (
                <UserRound className="text-emerald" size={18} />
              )}
            </div>

            <button
              type="button"
              onClick={logout}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] text-zinc-300 transition hover:border-emerald/35 hover:text-emerald"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>

      <div className="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-2xl border border-white/8 bg-black/80 p-2 backdrop-blur lg:hidden">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                "rounded-xl px-3 py-2 text-xs font-semibold",
                isActive ? "bg-emerald/14 text-emerald" : "text-zinc-400",
              )
            }
          >
            {item.label === "Prescriptions" ? <Pill size={16} /> : item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
