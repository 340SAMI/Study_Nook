"use client";

import { useState } from "react";

function StatusBadge({ status }) {
  const isConfirmed = status === "confirmed";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${
        isConfirmed
          ? "bg-emerald-400/10 border-emerald-400/20 text-emerald-400"
          : "bg-red-400/10 border-red-400/20 text-red-400"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isConfirmed ? "bg-emerald-400" : "bg-red-400"
        }`}
      />
      {isConfirmed ? "Confirmed" : "Cancelled"}
    </span>
  );
}

function BookingRow({ booking, isLast, onCancel }) {
  const isCancellable =
    booking.status === "confirmed" && booking.cancellable;

  return (
    <div
      className={`grid grid-cols-[2fr_1fr_1.2fr_1fr_1fr] gap-3 px-5 py-4 items-center hover:bg-white/[0.02] transition-colors ${
        !isLast ? "border-b border-white/[0.04]" : ""
      }`}
    >
      {/* Room */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#12141A] border border-white/[0.06] flex items-center justify-center text-lg shrink-0">
          {booking.emoji}
        </div>
        <div>
          <p className="text-[13px] font-semibold text-[#F0F2FF]">
            {booking.room}
          </p>
          <p className="text-[11px] text-[#5A6080] mt-0.5">
            Booked on {booking.bookedOn}
          </p>
        </div>
      </div>

      {/* Date */}
      <p className="text-[13px] text-[#9AA0B8]">{booking.date}</p>

      {/* Time */}
      <p className="text-[13px] text-[#9AA0B8]">{booking.time}</p>

      {/* Cost */}
      <p className="text-[13px] font-semibold text-[#F0F2FF]">{booking.cost}</p>

      {/* Status + Cancel */}
      <div className="flex items-center gap-2">
        <StatusBadge status={booking.status} />
        {isCancellable && (
          <button
            onClick={() => onCancel(booking.id)}
            className="text-[12px] font-medium text-red-400 bg-red-400/[0.08] hover:bg-red-400/[0.15] border border-red-400/[0.15] rounded-lg px-3 py-1 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

const COLUMNS = ["Room", "Date", "Time", "Cost", "Status"];

export default function BookingsTable({ bookings, onCancel }) {
  return (
    <div className="bg-[#0E1017] border border-white/[0.07] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[2fr_1fr_1.2fr_1fr_1fr] gap-3 px-5 py-3.5 border-b border-white/[0.05]">
        {COLUMNS.map((col) => (
          <p
            key={col}
            className="text-[11px] font-medium text-[#5A6080] uppercase tracking-widest"
          >
            {col}
          </p>
        ))}
      </div>

      {/* Rows */}
      {bookings.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-4xl opacity-30 mb-3">📭</p>
          <p className="text-sm text-[#5A6080]">No bookings yet.</p>
        </div>
      ) : (
        bookings.map((booking, i) => (
          <BookingRow
            key={booking.id}
            booking={booking}
            isLast={i === bookings.length - 1}
            onCancel={onCancel}
          />
        ))
      )}
    </div>
  );
}