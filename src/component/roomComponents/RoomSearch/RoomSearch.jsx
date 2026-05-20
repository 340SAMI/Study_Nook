'use client';
import React from 'react';

const RoomSearch = () => {
    return (
        <div>
            <div className="mb-6">
                <label className="text-sm text-[#9AA0B8] block mb-2">
                Search
                </label>
                <input
                placeholder="Room name..."
                className="w-full px-4 py-3 bg-[#12141A] border border-white/10 rounded-xl text-[#F0F2FF] placeholder:text-[#7A82A0] focus:border-[#6C8EFF] outline-none"
                />
            </div>
         
        </div>
    );
};

export default RoomSearch;