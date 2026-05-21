"use client";

import BookingsTable from "@/component/bookingComponents/Bookingstable";
import StatsCards from "@/component/bookingComponents/StatsCard";
import { useState } from "react";


const INITIAL_BOOKINGS = [
  {
    id: 1,
    emoji: "🏛️",
    room: "Quiet Study Pod",
    bookedOn: "May 21, 2026",
    date: "May 22, 2026",
    time: "08:00 – 10:00",
    cost: "$22.00",
    status: "confirmed",
    cancellable: false,
  },
  {
    id: 2,
    emoji: "📚",
    room: "Game Zone",
    bookedOn: "May 20, 2026",
    date: "May 25, 2026",
    time: "14:00 – 16:00",
    cost: "$22.00",
    status: "confirmed",
    cancellable: true,
  },
  {
    id: 3,
    emoji: "🎯",
    room: "Focus Lab — 2nd Floor",
    bookedOn: "May 18, 2026",
    date: "May 19, 2026",
    time: "10:00 – 11:00",
    cost: "$5.00",
    status: "cancelled",
    cancellable: false,
  },
];

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

  const handleCancel = (id) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: "cancelled", cancellable: false } : b
      )
    );
  };

  return (
    <div className="bg-[#0A0B0F]  px-6 py-10 font-sans relative overflow-hidden">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, #4B5280 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient blob */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[rgba(108,142,255,0.05)] rounded-full blur-[60px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Top divider line */}
        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(108,142,255,0.5)] to-transparent mb-7" />

        {/* Heading */}
        <div className="mb-7">
          <h1 className="font-sans text-2xl font-bold text-[#F0F2FF] tracking-tight">
            My Bookings
          </h1>
          <p className="text-[13px] text-[#5A6080] mt-1">
            Track and manage your study room reservations.
          </p>
        </div>

        {/* Stats */}
        <StatsCards bookings={bookings} />

        {/* Table */}
        <BookingsTable bookings={bookings} onCancel={handleCancel} />
      </div>
    </div>
  );
}