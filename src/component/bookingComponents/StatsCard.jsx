const stats = [
  { label: "Total Bookings", valueKey: "total", color: "text-[#F0F2FF]" },
  { label: "Confirmed", valueKey: "confirmed", color: "text-emerald-400" },
  { label: "Cancelled", valueKey: "cancelled", color: "text-red-400" },
];

export default function StatsCards({ bookings }) {
  const total = bookings.length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;
  const cancelled = bookings.filter((b) => b.status === "cancelled").length;
  const values = { total, confirmed, cancelled };

  return (
    <div className="grid grid-cols-3 gap-3 mb-7">
      {stats.map(({ label, valueKey, color }) => (
        <div
          key={label}
          className="bg-[#0E1017] border border-white/[0.07] rounded-2xl px-5 py-4"
        >
          <p className={`font-syne text-[22px] font-bold ${color}`}>
            {values[valueKey]}
          </p>
          <p className="text-[11px] text-[#5A6080] mt-1 uppercase tracking-widest">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}