"use client"
import { authClient } from '@/lib/auth-client';
import React from 'react';

const OwnerChecker = ({room}) => {

    const { data: session } = authClient.useSession();
    const {id:sessionId} = session?.user || {};

    return (
        <div>
           {sessionId===room?.ownerId &&
           
           <div className="flex gap-3">
              <button
                className="flex-1 bg-[#12141A] border border-white/8 hover:border-[#6C8EFF]/40 hover:text-[#6C8EFF] text-[#9AA0B8] text-[13px] font-medium py-2.5 rounded-xl transition-all duration-150"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                ✏️ Edit Room
              </button>
              <button
                className="flex-1 bg-[#12141A] border border-white/8 hover:border-[#E24B4A]/40 hover:bg-[#E24B4A]/6] text-[#E24B4A] text-[13px] font-medium py-2.5 rounded-xl transition-all duration-150"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                🗑 Delete Room
              </button>
            </div>
           
           }              

        </div>
    );
};

export default OwnerChecker;