import CancelButton from '@/component/BookingComponent/CancelButton';
import { auth } from '@/lib/auth';
import { headers } from "next/headers";

const ROOM_INFO = {
    'quiet-pod': { name:  'Quiet Study Pod', emoji: '🏛️' },
    'default':   { name:  'Study Room',      emoji: '📚' },
};

function getRoomInfo(roomId) {
    return ROOM_INFO[roomId] ?? ROOM_INFO['default'];
}

async function getUserBookings(userId) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
            cache: 'no-store',
        });
        if (!res.ok) throw new Error('Bad response');
        const allBookings = await res.json();
        return {
            bookings: allBookings.filter((b) => b.sessionId === userId),
            error: null,
        };
    } catch {
        return { bookings: [], error: 'Failed to load bookings. Please try again.' };
    }
}

export default async function BookingsPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id ?? '';

    const { bookings, error } = await getUserBookings(userId);

    const totalBookings = bookings.length;
    const confirmedCount = bookings.filter((b) => b.Status.toLowerCase() === 'confirmed').length;
    const cancelledCount = bookings.filter((b) => b.Status.toLowerCase() === 'cancelled').length;

    const stats = [
        { label: 'Total Bookings', value: totalBookings, color: 'text-[#F0F2FF]' },
        { label: 'Confirmed',      value: confirmedCount, color: 'text-[#34D399]' },
        { label: 'Cancelled',      value: cancelledCount, color: 'text-[#E24B4A]' },
    ];

    return (
        <div className="relative min-h-[600px] bg-[#0A0B0F] px-4 md:px-6 py-10 font-sans overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#4B5280_1px,transparent_1px)] bg-[28px_28px]" />
            <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#6C8EFF]/5 rounded-full blur-[60px]" />

            <div className="relative max-w-[75%] mx-auto">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-[#6C8EFF]/50 to-transparent mb-7" />

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-[#F0F2FF] tracking-tight">My Bookings</h1>
                    <p className="text-sm text-[#5A6080] mt-1">Track and manage your study room reservations.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {stats.map(({ label, value, color }) => (
                        <div key={label} className="bg-[#0E1017] border border-white/5 rounded-2xl p-5">
                            <div className={`text-3xl font-bold ${color}`}>{value}</div>
                            <div className="text-[11px] uppercase tracking-widest text-[#5A6080] mt-1">{label}</div>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-[#0E1017] w-[100%] border border-white/5 rounded-3xl overflow-hidden">
                    <div className="grid grid-cols-[2fr_1fr_2fr_1fr_2fr] gap-4 px-6 py-4 border-b border-white/5 text-xs font-medium text-[#5A6080] uppercase tracking-widest">
                        {['Room', 'Date', 'Time', 'Cost', 'Status'].map((h) => (
                            <div key={h} className='mx-auto'>{h}</div>
                        ))}
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
                                    className="grid grid-cols-[2fr_1fr_2fr_1fr_2fr] gap-4 px-6 py-5 border-b  border-white/5 last:border-none hover:bg-white/5 transition-colors items-center"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-11 h-11 rounded-xl bg-[#12141A] border border-white/5 flex items-center justify-center text-2xl">
                                            { room.emoji}
                                        </div>
                                        <div className='mx-auto'>
                                            <div className="font-semibold text-[#F0F2FF]">{booking.name || room.name}</div>
                                            <div className="text-xs text-[#5A6080]">
                                                Booked on {new Date(booking.date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mx-auto text-[#9AA0B8]">
                                        {new Date(booking.date).toLocaleDateString('en-US', {
                                            month: 'short', day: 'numeric', year: 'numeric',
                                        })}
                                    </div>

                                    <div className="mx-auto text-[#9AA0B8]">{booking.startTime} – {booking.endTime}</div>

                                    <div className="mx-auto font-semibold text-[#F0F2FF]">${booking.totalCost?.toFixed(2)}</div>

                                    <div className="flex mx-auto  items-center gap-3">
                                        {booking.Status.toLowerCase() === 'confirmed' ? (
                                            <>
                                                <span className="inline-flex  items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#34D399]">
                                                    <span className="w-2 h-2 rounded-full bg-current" />
                                                    Confirmed
                                                </span>
                                                {isUpcoming && <CancelButton bookingId={booking._id} />}
                                            </>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-red-500/10 border border-red-500/20 text-[#E24B4A]">
                                                <span className="w-2 h-2 rounded-full bg-current" />
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