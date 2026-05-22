import React from 'react';
import {  ClipLoader } from 'react-spinners';

const loading = () => {
    return (
      
           <div className='flex h-[90%] my-auto justify-center items-center'>
                         <ClipLoader
                         color="#124ad8"
                         size={60}
                         speedMultiplier={10}
                         />
            </div> 

    );
};

export default loading;