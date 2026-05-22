export default function StatsBar() {
  const stats = [
    {
      value: "24",
      label: "Available rooms",
    },
    {
      value: "1,840",
      label: "Bookings this month",
    },
    {
      value: "4.8★",
      label: "Average rating",
    },
  ];

  return (
    <section className="relative -mt-10 z-20">
      <div className="w-[90%] max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#12141A]">

          {stats.map((stat, index) => (
            <div
              key={index}
              className="py-10 text-center border-b md:border-b-0 md:border-r border-white/[0.06] last:border-r-0"
            >
              <h2 className="text-4xl font-bold text-[#6C8EFF]">
                {stat.value}
              </h2>

              <p className="mt-2 text-sm text-[#9AA0B8]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}