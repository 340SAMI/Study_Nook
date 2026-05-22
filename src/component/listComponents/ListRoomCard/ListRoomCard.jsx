'use client'
import React from 'react';
import { FiUsers, FiLayers, FiDollarSign, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import CardImage from '../../roomComponents/RoomCard/CardImage';
import Image from 'next/image';
import { AlertDialog, Button } from '@heroui/react';
import { ListEdit } from '../ListEdit/ListEdit';


const ListRoomCard = ({ room }) => {
    const handleDelete = async () => {

      const res =  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addroom/${room._id}`, {
            method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },    
        });

       const rata = await res.json()
        console.log(rata);
        window.location.reload();
    };
   

    return (
        <div className="bg-[#0E1017] border border-white/5 rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:border-[#6C8EFF]/30 transition-all duration-300">

            {/* Image */}
            <div className="w-full sm:w-58 h-40 sm:h-auto flex-shrink-0">
                <Image
                    src={room.imageURL || "https://placehold.co/600x400/12141A/5A6080?text=No+Image"}
                    alt={room.name}
                    width={600}
                    height={400}
                    className="w-full h-60 object-cover"
                    onError={(e) => {e.target.src="https://placehold.co/600x400/12141A/5A6080?text=No+Image"}}
                    />
            </div>

            {/* Details */}
            <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                    <h3 className="text-[#F0F2FF] font-semibold text-[15px] tracking-tight">{room.name}</h3>
                    <p className="text-[#5A6080] text-xs mt-1 line-clamp-2 leading-relaxed">{room.description}</p>

                    <div className="flex flex-wrap gap-2 mt-3">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#9AA0B8] text-[11px]">
                            <FiUsers size={11} /> {room.capacity} seats
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#9AA0B8] text-[11px]">
                            <FiLayers size={11} /> Floor {room.floor}
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#9AA0B8] text-[11px]">
                            <FiDollarSign size={11} /> ${room.hourlyRate}/hr
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                        {room.amenities?.slice(0, 3).map((a, i) => (
                            <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-[#6C8EFF]/[0.08] border border-[#6C8EFF]/20 text-[#8AA4FF]">
                                {a}
                            </span>
                        ))}
                        {room.amenities?.length > 3 && (
                            <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#5A6080]">
                                +{room.amenities.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                    <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">


                 
                            <ListEdit key={room._id} room={room}></ListEdit>
                      


                        <AlertDialog>
                            <Button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all">
                             Delete Project 
                            </Button>
                            
                        <AlertDialog.Backdrop>
                            <AlertDialog.Container>
                                <AlertDialog.Dialog className="sm:max-w-[400px] bg-[#12141A] border border-white/5">
                                <AlertDialog.CloseTrigger />
                                <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading className="text-[#ffd6d3]">Delete project permanently?</AlertDialog.Heading>
                                </AlertDialog.Header>
                                <AlertDialog.Body>
                                <p>
                                    This will permanently delete <strong>My Awesome Project</strong> and all of its
                                    data. This action cannot be undone.
                                </p>
                                </AlertDialog.Body>
                                <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>
                                <Button slot="close" variant="danger" onPress={handleDelete}>
                                    Delete Project
                                </Button>
                                </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                            </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                        </AlertDialog>
                    </div>


            </div>

        </div>
    );
};

export default ListRoomCard;