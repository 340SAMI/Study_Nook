import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0A0B0F] flex items-center justify-center px-6 py-12 font-sans overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#4B5280_1px,transparent_1px)] bg-[28px_28px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6C8EFF]/5 rounded-full blur-[120px]" />

            <div className="relative text-center max-w-md">
                <div className="text-[180px] font-bold text-[#F0F2FF] leading-none tracking-tighter opacity-10">
                    404
                </div>

                <div className="-mt-16 relative">
                    <div className="text-6xl mb-6">🔍</div>
                    <h1 className="text-4xl font-bold text-[#F0F2FF] tracking-tight mb-3">
                        Page Not Found
                    </h1>
                    <p className="text-[#5A6080] text-lg mb-8">
                        Oops! The study room you&apos;re looking for doesn&apos;t exist.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="px-8 py-3.5 bg-[#6C8EFF] hover:bg-[#5A7EFF] text-white font-semibold rounded-2xl transition"
                        >
                            Back to Home
                        </Link>
                        <Link
                            href="/rooms"
                            className="px-8 py-3.5 border border-white/10 hover:border-[#6C8EFF] text-[#F0F2FF] font-medium rounded-2xl transition"
                        >
                            Browse Rooms
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}