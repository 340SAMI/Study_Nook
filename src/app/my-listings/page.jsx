
import React from 'react';

export default async function page() {
    let rooms = [];
    let error = null;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addroom`, {
            cache: 'no-store',
            next: { revalidate: 0 }
        });

        if (!res.ok) throw new Error("Failed to fetch rooms");
        rooms = await res.json();
    } catch (err) {
        error = "Failed to load study rooms. Please try again later.";
    }

    return (
        <div className="relative min-h-screen bg-[#0A0B0F] px-4 md:px-6 py-10 font-sans overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#4B5280_1px,transparent_1px)] bg-[28px_28px]" />
            <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6C8EFF]/5 rounded-full blur-[80px]" />

            <div className="relative max-w-6xl mx-auto">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-[#6C8EFF]/50 to-transparent mb-8" />

                {/* Header */}
                <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-[#F0F2FF] tracking-tight">Study Rooms</h1>
                        <p className="text-[#5A6080] mt-1">Choose your perfect space to focus</p>
                    </div>
                    <div className="text-sm text-[#5A6080] bg-[#0E1017] px-4 py-2 rounded-2xl border border-white/5">
                        {rooms.length} rooms available
                    </div>
                </div>

                {error ? (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-8 rounded-3xl text-center">
                        {error}
                    </div>
                ) : rooms.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-6 opacity-40">🏠</div>
                        <p className="text-xl text-[#5A6080]">No rooms added yet</p>
                        <p className="text-sm text-[#5A6080] mt-2">Add rooms from the admin panel</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rooms.map((room) => (
                            <div
                                key={room._id}
                                className="group bg-[#0E1017] border border-white/5 rounded-3xl overflow-hidden hover:border-[#6C8EFF]/40 hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Room Visual */}
                                <div className="h-56 bg-[#12141A] flex items-center justify-center text-7xl relative border-b border-white/5">
                                    {room.emoji || '🏛️'}
                                    {room.capacity && (
                                        <div className="absolute top-4 right-4 px-3 py-1 text-xs font-medium bg-black/70 backdrop-blur rounded-full">
                                            {room.capacity} seats
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-semibold text-[#F0F2FF] group-hover:text-[#6C8EFF] transition-colors">
                                            {room.name}
                                        </h3>
                                        <div className="text-right">
                                            <span className="text-[#34D399] font-bold text-lg">
                                                ${room.hourlyRate || room.price || '—'}
                                            </span>
                                            <span className="text-xs text-[#5A6080]">/hr</span>
                                        </div>
                                    </div>

                                    {room.description && (
                                        <p className="text-sm text-[#9AA0B8] mt-3 line-clamp-3">
                                            {room.description}
                                        </p>
                                    )}

                                    {/* Amenities */}
                                    {room.amenities && room.amenities.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-5">
                                            {room.amenities.slice(0, 4).map((amenity, i) => (
                                                <span 
                                                    key={i} 
                                                    className="text-[10px] px-3 py-1 bg-white/5 rounded-full text-[#9AA0B8]"
                                                >
                                                    {amenity}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <button
                                        
                                        className="mt-8 w-full py-4 bg-[#6C8EFF] hover:bg-[#5A7EFF] font-semibold rounded-2xl text-white transition active:scale-95"
                                    >
                                        Book This Room
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}