import React from 'react';
import Link from 'next/link';
import RoomCard from '@/component/roomComponents/RoomCard/RoomCard';


export default async function LatestRooms() {
    let rooms = [];
    let error = null;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addroom`, {
            cache: 'no-store',
          
        });

        if (res.ok) {
            rooms = await res.json();
        }
    } catch (err) {
        error = "Failed to load rooms";
        console.error(err);
    }

    // Show only 6 latest rooms
    const latestRooms = rooms.slice(0, 6);

    return (
        <section className="py-16 bg-[#0A0B0F]">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-[#F0F2FF] tracking-tight">
                            Latest Rooms
                        </h2>
                        <p className="text-[#5A6080] mt-2">
                            Freshly added study spaces
                        </p>
                    </div>
                    <Link 
                        href="/rooms"
                        className="flex items-center gap-2 text-[#6C8EFF] hover:text-[#8BA6FF] transition font-medium group"
                    >
                        View all 
                        <span className="group-hover:translate-x-1 transition">→</span>
                    </Link>
                </div>

                {error ? (
                    <div className="text-red-400 text-center py-12">
                        {error}
                    </div>
                ) : latestRooms.length === 0 ? (
                    <div className="text-center py-16 text-[#5A6080]">
                        No rooms available yet
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestRooms.map((room) => (
                            <RoomCard key={room._id} room={room} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}