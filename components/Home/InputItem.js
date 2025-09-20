'use client';

import Image from 'next/image';
import React from 'react';


function InputItem({ type, value, onChange }) {
  return (
    <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
      <Image
        src={type === 'source' ? '/source.png' : '/des.png'}
        width={15}
        height={15}
        alt={type === 'source' ? 'Pickup icon' : 'Dropoff icon'}
      />
      <input
        type='text'
        placeholder={type === 'source' ? 'Pickup Location' : 'Dropoff Location'}
        className='bg-transparent w-full outline-none'
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputItem;
