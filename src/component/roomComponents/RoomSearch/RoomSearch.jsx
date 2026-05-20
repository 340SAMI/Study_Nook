'use client';

const RoomSearch = ({SearchItem,setSearchItem}) => {
    
    return (
        <div>
            <div className="mb-6">
                <label className="text-sm text-[#9AA0B8] block mb-2">
                Search
                </label>
                <input
                placeholder="Room name..."
                className="w-full px-4 py-3 bg-[#12141A] border border-white/10 rounded-xl text-[#F0F2FF] placeholder:text-[#7A82A0] focus:border-[#6C8EFF] outline-none"
                value={SearchItem}
                onChange={(e)=>{setSearchItem(e.target.value)}}
                />
            </div>
         
        </div>
    );
};

export default RoomSearch;