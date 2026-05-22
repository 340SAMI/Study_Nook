import Link from "next/link";
import CardImage from "./CardImage";
import { FiUsers, FiLayers, FiClock } from "react-icons/fi";

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
    <div className="group bg-[#0E1017] border border-white/[0.07] rounded-[20px] overflow-hidden hover:border-[#6C8EFF]/40 hover:-translate-y-1 transition-all duration-300">

      {/* Image */}
      <div className="relative h-44 bg-[#12141A] overflow-hidden">
        <CardImage
          imageURL={imageURL}
          name={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Price badge overlaid on image */}
        <div className="absolute top-3 right-3 flex items-baseline gap-1 bg-black/80 border border-white/10 rounded-full px-2.5 py-1">
          <span className="text-[#34D399] text-[13px] font-semibold">${hourlyRate}</span>
          <span className="text-[#5A6080] text-[11px]">/hr</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-[18px]">
        <h3 className="text-[#F0F2FF] font-semibold text-[15px] tracking-tight mb-1.5">
          {name}
        </h3>
        <p className="text-[#5A6080] text-xs leading-relaxed line-clamp-2 mb-3.5">
          {description || "A peaceful space perfect for focused study and productivity."}
        </p>

        {/* Meta pills */}
        <div className="flex flex-wrap gap-2 mb-3.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#9AA0B8] text-[11px]">
            <FiUsers size={11} className="opacity-70" />
            {capacity} seats
          </div>
          {floor && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#9AA0B8] text-[11px]">
              <FiLayers size={11} className="opacity-70" />
              Floor {floor}
            </div>
          )}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#9AA0B8] text-[11px]">
            <FiClock size={11} className="opacity-70" />
            8am – 10pm
          </div>
        </div>

        <div className="h-px bg-white/5 mb-3.5" />

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-[18px]">
            {visibleAmenities.map((item, i) => (
              <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-[#6C8EFF]/[0.08] border border-[#6C8EFF]/20 text-[#8AA4FF]">
                {item}
              </span>
            ))}
            {remaining > 0 && (
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#5A6080]">
                +{remaining} more
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/rooms/${_id}`}
          className="block w-full py-[11px] text-center bg-[#6C8EFF] hover:bg-[#5A7EFF] active:scale-[0.98] transition-all duration-150 font-semibold text-white rounded-xl text-[13px] tracking-wide"
        >
          View details &amp; book
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;