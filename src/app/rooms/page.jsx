import AllRooms from '@/component/roomComponents/AllRooms/AllRooms';
import React from 'react';

const page = async () => {
     const res = await fetch ( `${process.env.NEXT_PUBLIC_SERVER_URL}/addroom`);
    const rooms = await res.json();

    console.log(rooms.map(r => ({ name: r.name, imageURL: r.imageURL })));
    return (
        <div>
            <AllRooms rooms={rooms}></AllRooms>
        </div>
    );
};

export default page;