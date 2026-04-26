import { CalendarDays, Pill, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { NoirCard } from "../../components/ui/NoirCard";
import { StatCard } from "../../components/ui/StatCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { useAuth } from "../../context/AuthContext";
import { formatMonthDay } from "../../utils/formatters";

export function DoctorDashboardPage() {
  const { session } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/doctors/${session.userId}`).then((response) => setData(response.data));
  }, [session.userId]);

  if (!data) {
    return <div className="text-zinc-400">Loading doctor dashboard...</div>;
  }

  const doctor = data.doctor;
  const upcoming = data.appointments.filter((item) => item.status === "SCHEDULED");

  return (
    <div className="space-y-8">
      <NoirCard className="overflow-hidden p-0">
        <div className="grid gap-8 bg-[linear-gradient(135deg,rgba(16,185,129,0.12),transparent_48%)] px-6 py-8 md:grid-cols-[140px_1fr] md:px-8">
          <img
            src={doctor.avatarUrl}
            alt={doctor.fullName}
            className="h-28 w-28 rounded-full object-cover ring-2 ring-emerald/55"
          />
          <div>
            <div className="text-sm uppercase tracking-[0.35em] text-emerald">Welcome back</div>
            <h1 className="mt-2 text-4xl font-extrabold text-white">{doctor.fullName}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
              <StatusBadge>{doctor.specialization}</StatusBadge>
              <span>{doctor.clinicName}</span>
              <span>{doctor.yearsExperience} yrs</span>
            </div>
          </div>
        </div>
      </NoirCard>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={Users} label="Patients Treated" value={data.patientsTreated} />
        <StatCard icon={Pill} label="Prescriptions Issued" value={data.prescriptionsIssued} />
        <StatCard icon={CalendarDays} label="Upcoming Appointments" value={data.upcomingAppointments} />
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Upcoming appointments</h2>
          <span className="text-sm text-emerald">View all</span>
        </div>
        <div className="space-y-4">
          {upcoming.map((appointment) => {
            const { month, day } = formatMonthDay(appointment.appointmentDateTime);
            return (
              <NoirCard key={appointment.id} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-emerald to-emerald/60 text-black">
                    <div className="text-sm font-medium">{month}</div>
                    <div className="text-3xl font-extrabold leading-none">{day}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{appointment.patient.fullName}</div>
                    <div className="text-zinc-300">{appointment.title}</div>
                  </div>
                </div>
                <StatusBadge>{appointment.status}</StatusBadge>
              </NoirCard>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Your patients</h2>
          <span className="text-sm text-emerald">See all</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {data.patients.map((patient) => (
            <NoirCard key={patient.id} className="flex items-center gap-4">
              <img
                src={patient.avatarUrl}
                alt={patient.fullName}
                className="h-16 w-16 rounded-full object-cover ring-1 ring-emerald/35"
              />
              <div>
                <div className="text-2xl font-bold text-white">{patient.fullName}</div>
                <div className="text-zinc-400">
                  {patient.age} yrs · {patient.bloodType} · {patient.id}
                </div>
              </div>
            </NoirCard>
          ))}
        </div>
      </section>
    </div>
  );
}
