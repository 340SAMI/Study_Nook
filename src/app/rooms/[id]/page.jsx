import BookingCard from '@/component/dynamicRoomComponent/BookingCard';
import OwnerChecker from '@/component/dynamicRoomComponent/OwnerChecker';
import { auth } from '@/lib/auth';
import { headers } from "next/headers";
import Image from 'next/image';
import React from 'react';
const roomfetch = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`, {
    cache: "no-store",
  });
  return res.json();
};

const Page = async ({ params }) => {
  
  const { id } = await params;
  const room = await roomfetch(id);


       const session = await auth.api.getSession({
        headers: await headers()
    });

    const sessionId = session?.user?.id;



  return (
    <div className="bg-[#0A0B0F] min-h-screen px-4 py-10 relative overflow-hidden">

      {/* Background */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6C8EFF]/[0.05] rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.1]"
        style={{
          backgroundImage: `radial-gradient(circle, #4B5280 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative w-[90%] max-w-5xl mx-auto">

        {/* Top accent */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#6C8EFF]/50 to-transparent mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

          {/* ── LEFT ── */}
          <div>

            {/* Image */}
            <div className=" bg-[#12141A] rounded-2xl overflow-hidden border border-white/[0.07] mb-6">
              {room?.imageURL ? (
                <Image
                  src={room?.imageURL}
                  alt={room.name}
                  className="w-full h-full object-cover"
                  height={400}
                  width={400}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-[#2A3050]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9.75L12 3l9 6.75V21H3V9.75z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Tags + booking count */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="text-[11px] px-3 py-1 rounded-full bg-[#6C8EFF]/1 border border-[#6C8EFF]/20 text-[#6C8EFF]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {room?.floor || "3rd Floor"}
              </span>
              <span
                className="text-[11px] px-3 py-1 rounded-full bg-[#6C8EFF]/1 border border-[#6C8EFF]/20 text-[#6C8EFF]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {room?.capacity || 2}–{(room?.capacity || 2) + 2} seats
              </span>
              <span
                className="flex items-center gap-1.5 text-[12px] text-[#5A6080]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <span className="bg-[#6C8EFF]/[0.1] border border-[#6C8EFF]/20 text-[#6C8EFF] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  {room?.bookingCount || 0} bookings
                </span>
                so far
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-[26px] font-bold text-[#F0F2FF] tracking-tight leading-snug mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {room?.name || "Quiet Study Pod"}
            </h1>

            {/* Description */}
            <p
              className="text-[14px] text-[#5A6080] leading-relaxed mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {room?.description || "A peaceful, well-lit study room perfect for focused work."}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap gap-5 mb-6 ">
              {[
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ),
                  label: `${room?.capacity - 2}–${(room?.capacity )} people`,
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 6h18M3 14h18M3 18h16" />
                    </svg>
                  ),
                  label: room?.floor || "3rd Floor",
                },
                {
                  icon: (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="10" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                    </svg>
                  ),
                  label: `$${room?.hourlyRate || 5} / hour`,
                },
              ].map((m, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-[13px] text-[#7A82A0]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {m.icon}
                  {m.label}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5 mb-6" />

            {/* Amenities */}
            <p
              className="text-[11px] font-medium text-[#7A82A0] uppercase tracking-widest mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Amenities
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {(room?.amenities?.length > 0
                ? room.amenities
                : ["Wi-Fi", "Whiteboard", "Projector"]
              ).map((a) => (
                <span
                  key={a}
                  className="text-[12px] px-3 py-1.5 rounded-full bg-[#6C8EFF]/[0.08] border border-[#6C8EFF]/20 text-[#6C8EFF]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {a}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.05] mb-6" />

            {/* Owner */}
            <p
              className="text-[11px] font-medium text-[#7A82A0] uppercase tracking-widest mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Listed by
            </p>
            <div className="flex items-center gap-3 bg-[#12141A] border border-white/[0.07] rounded-xl px-4 py-3 w-fit mb-6">
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#6C8EFF] to-[#A78BFA] flex items-center justify-center text-[13px] font-semibold text-white shrink-0">
                {room?.ownerName?.[0]?.toUpperCase() ?? "A"}
              </div>
              <div>
                  <p
                    className="text-[12px] text-[#3A4060]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Listed on{" "}
                   {room?.createdAt? 
                   new Date(room?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }): "N/A" }
                  </p>
              </div>
            </div>

            {/* Owner actions — show only if current user is owner */}
            <OwnerChecker room={room}></OwnerChecker>
          </div>

          {/* ── RIGHT — Booking Card ── */}
          <div className="lg:sticky lg:top-24 h-fit">
            <BookingCard room={room} sessionId={sessionId}></BookingCard>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Page;