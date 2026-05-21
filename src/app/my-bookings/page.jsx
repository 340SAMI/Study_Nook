import { auth } from '@/lib/auth';
import { headers } from "next/headers";
import React from 'react';

export default async function BookingsPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.user?.id;

    let bookings = [];
    let error = null;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, { 
            cache: 'no-store' 
        });
        const allBookings = await res.json();
        bookings = allBookings.filter(item => item.sessionId === userId);
    } catch (err) {
        error = "Failed to load bookings. Please try again.";
    }

    const totalBookings = bookings.length;
    const confirmedCount = bookings.filter(b => b.Status === 'Confirmed').length;
    const cancelledCount = bookings.filter(b => b.Status === 'Cancelled').length;

    // Room mapping
    const getRoomInfo = (roomId) => {
        if (roomId === '6a0d9551c8ec3014ec4f9332') {
            return { name: 'Quiet Study Pod', emoji: '🏛️' };
        }
        return { name: 'Study Room', emoji: '📚' };
    };

    return (
        <div className="relative min-h-[600px] bg-[#0A0B0F] px-4 md:px-6 py-10 font-sans overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#4B5280_1px,transparent_1px)] bg-[28px_28px]" />
            <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#6C8EFF]/5 rounded-full blur-[60px]" />

            <div className="relative max-w-[860px] mx-auto">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-[#6C8EFF]/50 to-transparent mb-7" />

                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[#F0F2FF] tracking-tight">My Bookings</h1>
                    <p className="text-sm text-[#5A6080] mt-1">Track and manage your study room reservations.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    <div className="bg-[#0E1017] border border-white/5 rounded-2xl p-5">
                        <div className="text-3xl font-bold text-[#F0F2FF]">{totalBookings}</div>
                        <div className="text-[11px] uppercase tracking-widest text-[#5A6080] mt-1">Total Bookings</div>
                    </div>
                    <div className="bg-[#0E1017] border border-white/5 rounded-2xl p-5">
                        <div className="text-3xl font-bold text-[#34D399]">{confirmedCount}</div>
                        <div className="text-[11px] uppercase tracking-widest text-[#5A6080] mt-1">Confirmed</div>
                    </div>
                    <div className="bg-[#0E1017] border border-white/5 rounded-2xl p-5">
                        <div className="text-3xl font-bold text-[#E24B4A]">{cancelledCount}</div>
                        <div className="text-[11px] uppercase tracking-widest text-[#5A6080] mt-1">Cancelled</div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-[#0E1017] border border-white/5 rounded-3xl overflow-hidden">
                    <div className="grid grid-cols-[2fr_1fr_1.2fr_1fr_1fr] gap-4 px-6 py-4 border-b border-white/5 text-xs font-medium text-[#5A6080] uppercase tracking-widest">
                        <div>Room</div>
                        <div>Date</div>
                        <div>Time</div>
                        <div>Cost</div>
                        <div>Status</div>
                    </div>

                    {error ? (
                        <div className="p-12 text-center text-red-400">{error}</div>
                    ) : bookings.length === 0 ? (
                        <div className="py-20 text-center">
                            <div className="text-5xl mb-4 opacity-30">📅</div>
                            <p className="text-[#5A6080]">No bookings yet</p>
                            <p className="text-sm mt-1 text-[#5A6080]">Your reservations will show here</p>
                        </div>
                    ) : (
                        bookings.map((booking) => {
                            const room = getRoomInfo(booking.roomId);
                            const isUpcoming = new Date(booking.date) >= new Date();

                            return (
                                <div 
                                    key={booking._id} 
                                    className="grid grid-cols-[2fr_1fr_1.2fr_1fr_1fr] gap-4 px-6 py-5 border-b border-white/5 last:border-none hover:bg-white/5 transition-colors items-center"
                                >
                                    {/* Room */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 rounded-xl bg-[#12141A] border border-white/5 flex items-center justify-center text-2xl">
                                            {room.emoji}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-[#F0F2FF]">{room.name}</div>
                                            <div className="text-xs text-[#5A6080]">
                                                Booked on {new Date(booking.createdAt || booking.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="text-[#9AA0B8]">
                                        {new Date(booking.date).toLocaleDateString('en-US', { 
                                            month: 'short', 
                                            day: 'numeric', 
                                            year: 'numeric' 
                                        })}
                                    </div>

                                    {/* Time */}
                                    <div className="text-[#9AA0B8]">
                                        {booking.startTime} – {booking.endTime}
                                    </div>

                                    {/* Cost */}
                                    <div className="font-semibold text-[#F0F2FF]">
                                        ${booking.totalCost?.toFixed(2)}
                                    </div>

                                    {/* Status + Cancel */}
                                    <div className="flex items-center gap-3">
                                        {booking.Status === 'Confirmed' ? (
                                            <>
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#34D399]">
                                                    <span className="w-2 h-2 rounded-full bg-current"></span>
                                                    Confirmed
                                                </span>
                                                {isUpcoming && (
                                                    <button className="text-xs font-medium px-4 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition">
                                                        Cancel
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-red-500/10 border border-red-500/20 text-[#E24B4A]">
                                                <span className="w-2 h-2 rounded-full bg-current"></span>
                                                Cancelled
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}