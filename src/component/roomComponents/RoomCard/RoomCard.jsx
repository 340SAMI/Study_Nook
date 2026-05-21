import Image from "next/image";
import Link from "next/link";
import CardImage from "./CardImage";

const RoomCard = ({ room }) => {
  const {
    _id,
    name,
    description,
    imageURL,
    floor,
    capacity,
    hourlyRate,
    amenities = [],
  } = room;

  const visibleAmenities = amenities.slice(0, 3);
  const remaining = amenities.length - 3;

  return (
    <div className="group bg-[#0E1017] border border-white/5 rounded-3xl overflow-hidden hover:border-[#6C8EFF]/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl hover:shadow-[#6C8EFF]/10">
      
      {/* Image Section */}
      <div className="relative h-52 bg-[#12141A] overflow-hidden">
        <CardImage 
          imageURL={imageURL} 
          name={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        
        {/* Capacity Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 text-xs font-medium bg-black/70 backdrop-blur-md rounded-full border border-white/10">
          {capacity} seats
        </div>

        {/* Floor Badge */}
        {floor && (
          <div className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-black/70 backdrop-blur-md rounded-full border border-white/10">
            Floor {floor}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col">
        <h3 className="text-[#F0F2FF] font-semibold text-lg tracking-tight group-hover:text-[#6C8EFF] transition-colors">
          {name}
        </h3>

        <p className="text-[#9AA0B8] text-sm mt-2 line-clamp-3 min-h-[60px]">
          {description || "A peaceful space perfect for focused study and productivity."}
        </p>

        {/* Price */}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-[#34D399] text-2xl font-bold">
            ${hourlyRate}
          </span>
          <span className="text-[#5A6080] text-sm">/hour</span>
        </div>

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {visibleAmenities.map((item, i) => (
              <span
                key={i}
                className="text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#9AA0B8]"
              >
                {item}
              </span>
            ))}
            {remaining > 0 && (
              <span className="text-[11px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#9AA0B8]">
                +{remaining} more
              </span>
            )}
          </div>
        )}

        {/* Action Button */}
        <Link
          href={`/rooms/${_id}`}
          className="mt-6 w-full py-3.5 text-center bg-[#6C8EFF] hover:bg-[#5A7EFF] active:scale-[0.97] transition-all duration-200 font-semibold text-white rounded-2xl text-sm tracking-wide"
        >
          View Details & Book
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;