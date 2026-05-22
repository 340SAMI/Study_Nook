import { auth } from '@/lib/auth';
import Link from 'next/link';
import { headers } from "next/headers";
import ListRoomCard from '@/component/listComponents/ListRoomCard/ListRoomCard';

async function getAllRooms() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addroom`, {
        cache: 'no-store'
    });
    return res.json();
}

const MyListingsPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id ?? '';

    const allRooms = await getAllRooms();
    const myListings = allRooms.filter((room) => room.ownerId === userId);

    return (
        <div className="bg-[#0A0B0F] min-h-screen relative overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#4B5280_1px,transparent_1px)] bg-[28px_28px]" />
            <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#6C8EFF]/5 rounded-full blur-[60px]" />

            <div className="relative w-full max-w-5xl mx-auto px-6 py-10">

                <div className="h-[1px] bg-gradient-to-r from-transparent via-[#6C8EFF]/50 to-transparent mb-7" />

                {/* Header */}
                <div className="grid grid-cols-4 mb-8">
                    <div className="col-span-3 flex flex-col justify-center">
                        <h1 className="text-2xl font-bold text-[#F0F2FF] tracking-tight">My Listings</h1>
                        <p className="text-sm text-[#5A6080] mt-1">Rooms you&apos;ve put up for booking.</p>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <div className="bg-[#0E1017] border border-white/5 rounded-2xl px-5 py-3 text-center">
                            <div className="text-2xl font-bold text-[#F0F2FF]">{myListings.length}</div>
                            <div className="text-[11px] uppercase tracking-widest text-[#5A6080] mt-0.5">Total</div>
                        </div>
                        <Link
                            href="/add-room"
                            className="px-5 py-2.5 bg-[#6C8EFF] hover:bg-[#5A7EFF] active:scale-[0.98] transition-all duration-150 text-white text-sm font-semibold rounded-xl whitespace-nowrap"
                        >
                            + Add Room
                        </Link>
                    </div>
                </div>

                {/* Listings */}
                {myListings.length === 0 ? (
                    <div className="bg-[#0E1017] border border-white/5 rounded-3xl py-20 text-center">
                        <div className="text-5xl mb-4 opacity-30">🏛️</div>
                        <p className="text-[#5A6080]">You haven&apos;t listed any rooms yet</p>
                        <Link
                            href="/add-room"
                            className="inline-block mt-4 px-5 py-2.5 bg-[#6C8EFF] hover:bg-[#5A7EFF] active:scale-[0.98] transition-all duration-150 text-white text-sm font-semibold rounded-xl"
                        >
                            List a room
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {myListings.map((room) => (
                            <ListRoomCard key={room._id} room={room} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default MyListingsPage;