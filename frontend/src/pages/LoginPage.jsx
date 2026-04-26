import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { Activity, LoaderCircle, Stethoscope, UserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { quickAccess } from "../data/quickAccess";

export function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [userId, setUserId] = useState("PAT001");
  const [error, setError] = useState("");

  const options = selectedTab === 0 ? quickAccess.patients : quickAccess.doctors;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      const session = await login(userId);
      navigate(
        session.role === "PATIENT" ? "/patient/dashboard" : "/doctor/dashboard",
        { replace: true },
      );
    } catch {
      setError("That ID is not in the seeded demo data.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-emerald-grid bg-grid px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_30%)]" />
      <div className="relative w-full max-w-md rounded-[2rem] border border-emerald/25 bg-black/70 p-8 shadow-[0_24px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald to-emerald/60 text-black shadow-emerald">
            <Activity size={36} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Medical History Tracker
          </h1>
          <p className="mt-3 text-sm text-zinc-400">
            Sign in with a seeded patient or doctor ID to enter the noir portal.
          </p>
        </div>

        <Tab.Group
          selectedIndex={selectedTab}
          onChange={(index) => {
            setSelectedTab(index);
            setUserId(index === 0 ? "PAT001" : "DOC002");
          }}
        >
          <Tab.List className="grid grid-cols-2 rounded-2xl border border-white/8 bg-white/[0.03] p-1">
            {[
              { label: "Patient", icon: UserRound },
              { label: "Doctor", icon: Stethoscope },
            ].map(({ label, icon: Icon }) => (
              <Tab
                key={label}
                className={({ selected }) =>
                  clsx(
                    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition",
                    selected
                      ? "bg-emerald/16 text-emerald shadow-emerald"
                      : "text-zinc-400 hover:text-white",
                  )
                }
              >
                <Icon size={16} />
                {label}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-300">
              ID
            </span>
            <input
              value={userId}
              onChange={(event) => setUserId(event.target.value.toUpperCase())}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-emerald/45 focus:shadow-emerald"
              placeholder={selectedTab === 0 ? "PAT001" : "DOC002"}
            />
          </label>

          <div>
            <div className="mb-2 text-sm font-medium text-zinc-300">Quick access</div>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setUserId(option.id)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:border-emerald/40 hover:text-emerald"
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald px-4 py-3 text-base font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? <LoaderCircle className="animate-spin" size={18} /> : null}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
