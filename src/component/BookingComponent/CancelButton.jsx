"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function CancelButton({ bookingId }) {
    const router = useRouter();

    const handleCancel = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${bookingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Status: 'Cancelled' }),
            });

            if (!res.ok) throw new Error('Failed to cancel');

            router.refresh();
        } catch (err) {
            console.error('Failed to cancel booking:', err);
        }
    };

    return (
        <AlertDialog >
            <Button className="inline-flex  items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full bg-red-500/20 border border-red-500 text-[#ceb5b3]" size="sm">Cancel Booking</Button>
            <AlertDialog.Backdrop >
                <AlertDialog.Container >
                    <AlertDialog.Dialog className="sm:max-w-[400px] bg-[#12141A] border border-white/5">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading className="text-[#ffd6d3]">Cancel this booking?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will cancel your reservation. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Keep Booking
                            </Button>
                            <Button slot="close" variant="danger" onPress={handleCancel}>
                                Yes, Cancel
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}