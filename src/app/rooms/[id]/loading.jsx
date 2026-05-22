import React from 'react';
import {  ClipLoader } from 'react-spinners';

const loading = () => {
    return (
      
           <div className='flex h-[90%] my-auto justify-center items-center'>
                <ClipLoader
                size={55}
                speedMultiplier={1.5}
                />
           </div> 

    );
};

export default loading;