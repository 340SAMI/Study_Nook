"use client";

import { useState } from "react";

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00",
];

const BookingCard = ({ room }) => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");

  const hourlyRate = room?.hourlyRate || 0;

  // Calculate total cost
  const startHour = parseInt(startTime.split(":")[0]);
  const endHour = parseInt(endTime.split(":")[0]);
  const duration = endHour > startHour ? endHour - startHour : 0;
  const totalCost = duration * hourlyRate;

  // End time options — only times after startTime
  const endSlots = TIME_SLOTS.filter(
    (t) => parseInt(t.split(":")[0]) > startHour
  );

  const handleSubmit = () => {
    // wire up booking logic here later
    const bookObj = { date, startTime, endTime, totalCost, Status:"Confirmed" }
    console.log(bookObj);
  };

  return (
    <div className="lg:sticky lg:top-24 h-fit">
      <div className="bg-[#0E1017] border border-white/8 rounded-2xl p-6 shadow-2xl shadow-black/40">

        {/* Accent */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-[#6C8EFF]/50 to-transparent mb-5" />

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-5">
          <span
            className="text-[32px] font-bold text-[#F0F2FF]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            ${hourlyRate}
          </span>
          <span
            className="text-[13px] text-[#5A6080]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            / hour
          </span>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-1.5 mb-3">
          <label
            className="text-[11px] font-medium text-[#7A82A0] uppercase tracking-widest"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Date
          </label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="bg-[#12141A] border border-white/[0.08] rounded-xl px-4 py-2.5 text-[13px] text-[#F0F2FF] outline-none focus:border-[#6C8EFF]/40 transition-all"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          />
        </div>

        {/* Start / End */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Start */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[11px] font-medium text-[#7A82A0] uppercase tracking-widest"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Start
            </label>
            <select
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                // reset end time if it's no longer valid
                const newStart = parseInt(e.target.value.split(":")[0]);
                if (parseInt(endTime.split(":")[0]) <= newStart) {
                  setEndTime(
                    TIME_SLOTS.find((t) => parseInt(t.split(":")[0]) > newStart) || "20:00"
                  );
                }
              }}
              className="bg-[#12141A] border border-white/[0.08] rounded-xl px-3 py-2.5 text-[13px] text-[#F0F2FF] outline-none focus:border-[#6C8EFF]/40 transition-all appearance-none"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {TIME_SLOTS.slice(0, -1).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* End */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[11px] font-medium text-[#7A82A0] uppercase tracking-widest"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              End
            </label>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="bg-[#12141A] border border-white/[0.08] rounded-xl px-3 py-2.5 text-[13px] text-[#F0F2FF] outline-none focus:border-[#6C8EFF]/40 transition-all appearance-none"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {endSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Total cost */}
        <div className="flex items-center justify-between bg-[#6C8EFF]/[0.06] border border-[#6C8EFF]/[0.15] rounded-xl px-4 py-3 mb-4">
          <span
            className="text-[12px] text-[#7A82A0]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Total cost ({duration} hr)
          </span>
          <span
            className="text-[18px] font-bold text-[#6C8EFF]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            ${totalCost}.00
          </span>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={!date || duration === 0}
          className="w-full bg-[#6C8EFF] hover:bg-[#5B7EFF] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-[14px] py-3.5 rounded-xl transition-all duration-150 active:scale-[0.98]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Confirm Booking
        </button>

        <p
          className="text-center text-[11px] text-[#3A4060] mt-3"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Free cancellation before the booking date
        </p>

      </div>
    </div>
  );
};

export default BookingCard;