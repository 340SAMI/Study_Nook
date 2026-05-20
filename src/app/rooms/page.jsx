import RoomCard from "@/component/roomComponents/RoomCard/RoomCard";

const allrooms = async ()=>{
 const res = await fetch ( `${process.env.NEXT_PUBLIC_SERVER_URL}/addroom`);
    return res.json();
}

console.log(allrooms(), "all rooms data")

const RoomsPage = async () => {
    const rooms = await allrooms(); 



    console.log(rooms, "rooms data")
  return (
    <div className="min-h-screen bg-[#0A0B0F] px-8 py-10">

      {/* Title */}
      <h1 className="text-3xl text-[#F0F2FF] font-semibold mb-2">
        Available study rooms
      </h1>
      <p className="text-sm text-[#9AA0B8] mb-8">
        Filter by amenities or search by name.
      </p>

      {/* Layout */}
      <div className="grid grid-cols-4 gap-8">

        {/* LEFT SIDEBAR */}
        <div className="col-span-1">

          {/* Search */}
          <div className="mb-6">
            <label className="text-sm text-[#9AA0B8] block mb-2">
              Search
            </label>
            <input
              placeholder="Room name..."
              className="w-full px-4 py-3 bg-[#12141A] border border-white/10 rounded-xl text-[#F0F2FF] placeholder:text-[#7A82A0] focus:border-[#6C8EFF] outline-none"
            />
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-sm text-[#F0F2FF] mb-4 font-medium">
              Amenities
            </h3>

            <div className="space-y-3 text-sm">
              {[
                "Whiteboard",
                "Projector",
                "Wi-Fi",
                "Power Outlets",
                "Quiet Zone",
                "Air Conditioning"
              ].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-[#6C8EFF] w-4 h-4"
                  />
                  <span className="text-[#9AA0B8]">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-span-3">

            {rooms?.length === 0 ? (
                <div className="rounded-2xl flex items-center justify-center text-sm py-20 border border-white/10 bg-[#0E1017] text-[#7A82A0]">
                    No rooms match your filters.
                </div>
                ) : (
                <div className="grid grid-cols-3 gap-6">
                    {rooms.map((room) => (
                    <RoomCard key={room._id} room={room} />
                    ))}
                </div>
                )}

        </div>

      </div>
    </div>
  );
};

export default RoomsPage;