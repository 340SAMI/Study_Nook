"use client";
import React, { useState } from 'react';

const RoomAmnities = ({amnities,setAmnities}) => {
    
    const handleOnChange = (item, istrue)=>{
        console.log(item,istrue)
        if(istrue){
            setAmnities((prev)=>[...prev,item]);
        }else{
            setAmnities(amnities.filter((a)=>a !== item));
        }
    }
    return (
        <div>
            <div className="space-y-3 text-sm">
              {["Whiteboard","Projector","Wi-Fi","Power Outlets","Quiet Zone","Air Conditioning"].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-[#6C8EFF] w-4 h-4"
                    value={item}
                    onChange={(e)=>{handleOnChange(item,e.target.checked),console.log(e.target.checked, amnities)}}
                  />
                  <span className="text-[#9AA0B8]">{item}</span>
                </label>
              ))}
            </div>
        </div>
    );
};

export default RoomAmnities;