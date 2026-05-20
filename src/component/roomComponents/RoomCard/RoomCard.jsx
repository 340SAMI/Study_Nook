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

  // limit amenities
  const visibleAmenities = amenities.slice(0, 3);
  const remaining = amenities.length - 3;

  return (
    <div className="bg-[#12141A] border border-white/10 rounded-2xl overflow-hidden hover:border-[#6C8EFF]/40 transition-all duration-200">

      {/* Image */}
      <div className="w-full h-40 bg-[#0E1017] overflow-hidden">
        <CardImage imageURL={imageURL} name={name} />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2">

        {/* Name */}
        <h3 className="text-[#F0F2FF] font-semibold text-[15px]">
          {name}
        </h3>

        {/* Description */}
        <p className="text-[#7A82A0] text-[13px] leading-relaxed">
          {description?.slice(0, 100)}
          {description?.length > 100 && "..."}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-[12px] text-[#9AA0B8] mt-1">
          <span>Floor {floor}</span>
          <span>{capacity} people</span>
        </div>

        {/* Price */}
        <div className="text-[#6C8EFF] font-semibold text-[14px]">
          ${hourlyRate}/hr
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-2">
          {visibleAmenities.map((item, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-1 rounded-full bg-[#0E1017] border border-white/10 text-[#9AA0B8]"
            >
              {item}
            </span>
          ))}

          {remaining > 0 && (
            <span className="text-[11px] px-2 py-1 rounded-full bg-[#0E1017] border border-white/10 text-[#9AA0B8]">
              +{remaining} more
            </span>
          )}
        </div>

        {/* Button */}
        <Link
          href={`/rooms/${_id}`}
          className="mt-3 text-center bg-[#6C8EFF] hover:bg-[#5B7EFF] text-white text-[13px] py-2 rounded-xl transition"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default RoomCard;