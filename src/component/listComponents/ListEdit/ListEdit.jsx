"use client";

import { useForm } from "react-hook-form";
import { Button, Modal, Surface } from "@heroui/react";
import { FiEdit2 } from "react-icons/fi";

const AMENITIES = ["Whiteboard", "Projector", "Wi-Fi", "Power Outlets", "Quiet Zone", "Air Conditioning"];

export function ListEdit({ room }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: room?.name || '',
            description: room?.description || '',
            imageURL: room?.imageURL || '',
            floor: room?.floor || '',
            capacity: room?.capacity || '',
            hourlyRate: room?.hourlyRate || '',
            amenities: room?.amenities || [],
        },
    });

    const onSubmit = async (data) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addroom/${room._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                imageURL: data.imageURL?.trim() || null,
                capacity: Number(data.capacity),
                hourlyRate: Number(data.hourlyRate),
            }),
        });
        if (res.ok) window.location.reload();
    };

    const inputClass = "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted outline-none transition-all duration-150 focus:border-accent focus:ring-1 focus:ring-accent";
    const labelClass = "text-[11px] font-medium text-muted uppercase tracking-widest";

    return (
        <Modal>
            <Button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 border border-white/10 text-[#9AA0B8] hover:border-[#6C8EFF]/40 hover:text-[#6C8EFF] transition-all">
                <FiEdit2 size={11} /> Edit
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-lg">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Edit Room</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Update your room details below.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form
                                    id="edit-room-form"
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="flex flex-col gap-5"
                                >
                                    {/* Room name */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className={labelClass}>Room name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Quiet Study Pod — 3rd Floor"
                                            {...register("name", { required: "Room name is required" })}
                                            className={inputClass}
                                        />
                                        {errors.name && <p className="text-[12px] text-danger">{errors.name.message}</p>}
                                    </div>

                                    {/* Description */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className={labelClass}>Description</label>
                                        <textarea
                                            rows={3}
                                            placeholder="Describe your room…"
                                            {...register("description", { required: "Description is required" })}
                                            className={`${inputClass} resize-none leading-relaxed`}
                                        />
                                        {errors.description && <p className="text-[12px] text-danger">{errors.description.message}</p>}
                                    </div>

                                    {/* Image URL */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className={labelClass}>
                                            Image URL <span className="normal-case text-muted/50 tracking-normal text-[11px]">(optional)</span>
                                        </label>
                                        <input
                                            type="url"
                                            placeholder="https://example.com/room.jpg"
                                            {...register("imageURL", {
                                                validate: (val) => {
                                                    if (!val) return true;
                                                    if (val.startsWith('data:')) return 'Please use a hosted image URL, not base64';
                                                    return true;
                                                }
                                            })}
                                            className={inputClass}
                                        />
                                        {errors.imageURL && <p className="text-[12px] text-danger">{errors.imageURL.message}</p>}
                                    </div>

                                    <div className="h-px bg-border" />

                                    {/* Floor / Capacity / Rate */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className={labelClass}>Floor</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 3"
                                                {...register("floor", { required: "Required" })}
                                                className={inputClass}
                                            />
                                            {errors.floor && <p className="text-[12px] text-danger">{errors.floor.message}</p>}
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className={labelClass}>Capacity</label>
                                            <input
                                                type="number"
                                                min={1}
                                                placeholder="2"
                                                {...register("capacity", { required: "Required", min: { value: 1, message: "Min 1" } })}
                                                className={inputClass}
                                            />
                                            {errors.capacity && <p className="text-[12px] text-danger">{errors.capacity.message}</p>}
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className={labelClass}>Rate ($)</label>
                                            <input
                                                type="number"
                                                min={0}
                                                placeholder="5"
                                                {...register("hourlyRate", { required: "Required", min: { value: 0, message: "Min 0" } })}
                                                className={inputClass}
                                            />
                                            {errors.hourlyRate && <p className="text-[12px] text-danger">{errors.hourlyRate.message}</p>}
                                        </div>
                                    </div>

                                    <div className="h-px bg-border" />

                                    {/* Amenities */}
                                    <div className="flex flex-col gap-3">
                                        <label className={labelClass}>Amenities</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {AMENITIES.map((amenity) => (
                                                <label
                                                    key={amenity}
                                                    className="flex items-center gap-3 bg-background border border-border rounded-xl px-4 py-3 cursor-pointer hover:border-accent/40 transition-all has-[:checked]:border-accent has-[:checked]:bg-accent/10"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        value={amenity}
                                                        {...register("amenities")}
                                                        className="accent-accent w-4 h-4 flex-shrink-0"
                                                    />
                                                    <span className="text-[13px] text-muted">{amenity}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </form>
                            </Surface>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button slot="close" variant="secondary">Cancel</Button>
                            <Button type="submit" form="edit-room-form" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}