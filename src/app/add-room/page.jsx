"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const AMENITIES = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];



const AddBookpage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const {id, name} = session?.user || {};


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  if (!session) {
    return (
      <div className="bg-[#0A0B0F] min-h-screen flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <h2
            className="text-[38px] font-bold text-[#F0F2FF] mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Please log in to add a room
          </h2>

          <div className="p-0.5 rounded-2xl bg-[size:300%_100%] bg-gradient-to-r from-transparent via-[#6C8EFF] to-transparent bg-left hover:bg-right transition-all duration-1000 ease-in-out group">                      
            <div className="text-[#6C8EFF] hover:text-[#8AABFF] bg-[#0A0B0F] p-2 rounded-xl">
            <Link
              href="/authentication/login"
              className=" transition-colors"
            >
              Go to login →
            </Link>
          </div>
          </div>
        </div>
      </div>
    );
  }

  const onSubmit = async (data) => {
  
    const roomData = {
      ...data,
      userName: name,
      ownerId: id,
       createdAt: new Date().toISOString(), 
    };  console.log(roomData)
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addroom`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomData),
    });
    
  
    router.push("/my-listings");
; 
  };

  return (
    <div className="bg-[#0A0B0F] min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#6C8EFF]/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[10%] w-[300px] h-[300px] bg-[#A78BFA]/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.14]"
        style={{
          backgroundImage: `radial-gradient(circle, #4B5280 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative w-full max-w-2xl">

        {/* Top accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#6C8EFF]/60 to-transparent mb-8" />

        {/* Heading */}
        <div className="mb-6">
          <h1
            className="text-[24px] font-bold text-[#F0F2FF] tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Add a new room
          </h1>
          <p
            className="text-[13px] text-[#5A6080] mt-1"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Share your space and start earning.{" "}
            <Link
              href="/my-listings"
              className="text-[#6C8EFF] hover:text-[#8AABFF] transition-colors"
            >
              View my listings →
            </Link>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#0E1017] border border-white/[0.08] rounded-2xl px-8 py-10 shadow-2xl shadow-black/60 flex flex-col gap-5"
        >
          {/* Room name */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[11px] font-medium text-[#7A82A0] uppercase tracking-widest"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Room name
            </label>
            <input
              type="text"
              placeholder="e.g. Quiet Study Pod — 3rd Floor"
              {...register("name", { required: "Room name is required" })}
              className="bg-[#12141A] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#F0F2FF] placeholder-[#3A4060] outline-none transition-all duration-150 focus:border-[#6C8EFF]/50 focus:bg-[#13152A]/60"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
            {errors.name && (
              <p className="text-[12px] text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[11px] font-medium text-[#7A82A0] uppercase tracking-widest"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe your room — lighting, noise level, nearby facilities…"
              {...register("description", { required: "Description is required" })}
              className="bg-[#12141A] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#F0F2FF] placeholder-[#3A4060] outline-none transition-all duration-150 focus:border-[#6C8EFF]/50 focus:bg-[#13152A]/60 resize-none leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
            {errors.description && (
              <p className="text-[12px] text-red-400">{errors.description.message}</p>
            )}
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[11px] font-medium text-[#7A82A0] uppercase tracking-widest"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Image URL{" "}
              <span className="normal-case text-[#3A4060] tracking-normal text-[11px]">
                (optional)
              </span>
            </label>
            <input
              type="url"
              placeholder="https://example.com/room.jpg"
              {...register("imageURL",{ validate: 
                                            (val) => {if (!val) return true; 
                                                        if (val.startsWith('data:')) return 'Please use a hosted image URL, not base64';
                                                          return true;}
                                                          })}

              className="bg-[#12141A] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#F0F2FF] placeholder-[#3A4060] outline-none transition-all duration-150 focus:border-[#6C8EFF]/50 focus:bg-[#13152A]/60"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
                {errors.imageURL && (
                  <p className="text-[12px] text-red-400">{errors.image.message}</p>
                )}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.05]" />

          {/* Floor / Capacity / Hourly rate */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[11px] font-medium text-[#7A82A0] uppercase tracking-widest"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Floor
              </label>
              <input
                type="text"
                placeholder="e.g. 3rd Floor"
                {...register("floor", { required: "Required" })}
                className="bg-[#12141A] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#F0F2FF] placeholder-[#3A4060] outline-none transition-all duration-150 focus:border-[#6C8EFF]/50 focus:bg-[#13152A]/60"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              {errors.floor && (
                <p className="text-[12px] text-red-400">{errors.floor.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-[11px] font-medium text-[#7A82A0] uppercase tracking-widest"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Capacity
              </label>
              <input
                type="number"
                min={1}
                placeholder="2"
                {...register("capacity", {
                  required: "Required",
                  min: { value: 1, message: "Min 1" },
                })}
                className="bg-[#12141A] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#F0F2FF] placeholder-[#3A4060] outline-none transition-all duration-150 focus:border-[#6C8EFF]/50 focus:bg-[#13152A]/60"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              {errors.capacity && (
                <p className="text-[12px] text-red-400">{errors.capacity.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-[11px] font-medium text-[#7A82A0] uppercase tracking-widest"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Hourly rate ($)
              </label>
              <input
                type="number"
                min={0}
                placeholder="5"
                {...register("hourlyRate", {
                  required: "Required",
                  min: { value: 0, message: "Min 0" },
                })}
                className="bg-[#12141A] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#F0F2FF] placeholder-[#3A4060] outline-none transition-all duration-150 focus:border-[#6C8EFF]/50 focus:bg-[#13152A]/60"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />
              {errors.hourlyRate && (
                <p className="text-[12px] text-red-400">{errors.hourlyRate.message}</p>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.05]" />

          {/* Amenities */}
          <div className="flex flex-col gap-3">
            <label
              className="text-[11px] font-medium text-[#7A82A0] uppercase tracking-widest"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Amenities
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AMENITIES.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-3 bg-[#12141A] border border-white/[0.07] rounded-xl px-4 py-3 cursor-pointer hover:border-[#6C8EFF]/40 hover:bg-[#13152A] transition-all duration-150 has-[:checked]:border-[#6C8EFF]/50 has-[:checked]:bg-[#6C8EFF]/[0.08]"
                >
                  <input
                    type="checkbox"
                    value={amenity}
                    {...register("amenities")}
                    className="accent-[#6C8EFF] w-4 h-4 flex-shrink-0"
                  />
                  <span
                    className="text-[13px] text-[#9AA0B8] has-[:checked]:text-[#C4CEFF]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {amenity}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.05]" />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#6C8EFF] hover:bg-[#5B7EFF] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-[14px] py-3.5 rounded-xl transition-all duration-150 active:scale-[0.98]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {isSubmitting ? "Adding room…" : "Add Room"}
          </button>
        </form>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent mt-8" />
      </div>
    </div>
  );
};

export default AddBookpage;