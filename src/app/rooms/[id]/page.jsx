import React from 'react';

const page = async ({params}) => {
    const {id} = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`, {
    cache: "no-store",
  });
  const room = await res.json();

  console.log (room)
    return (
        <div>
            <h2>jfsdbzdjcxzbnc</h2>
        </div>
    );
};

export default page;