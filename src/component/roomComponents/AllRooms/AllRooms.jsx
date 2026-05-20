'use client'
import RoomAmnities from "@/component/roomComponents/RoomAmnities/RoomAmnities";
import RoomCard from "@/component/roomComponents/RoomCard/RoomCard";
import RoomSearch from "@/component/roomComponents/RoomSearch/RoomSearch";
import { useState } from "react";

const AllRooms = ({rooms}) => {
  const [amnities, setAmnities] = useState([]);
  const [SearchItem, setSearchItem]=useState(' ');

 
  const filtered = rooms?.filter((room) => {
  const matchesSearch = room.name
    ?.toLowerCase()
    .includes(SearchItem.toLowerCase()) || room.description?.toLowerCase().includes(SearchItem.toLocaleLowerCase());
  const matchesAmenities =
    amnities.length === 0 ||
    amnities.every((a) => room.amenities?.includes(a));
  return matchesSearch && matchesAmenities;
});
    
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
<       RoomSearch SearchItem={SearchItem} setSearchItem={setSearchItem}></RoomSearch>          

          {/* Amenities */}
          <div>
            <h3 className="text-sm text-[#F0F2FF] mb-4 font-medium">
              Amenities
            </h3>

            <div className="space-y-3 text-sm">
                <RoomAmnities amnities={amnities} setAmnities={setAmnities}></RoomAmnities>
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
                    {filtered.map((room) => (
                    <RoomCard key={room._id} room={room} />
                    ))}
                </div>
                )}

        </div>

      </div>
    </div>
  );
};

export default AllRooms;