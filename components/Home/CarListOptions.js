'use client';
import { CarListData } from '../../utils/CarListData';
import CarListItem from './CarListItem';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function CarListOptions({ distance, rideId, onSelectCar }) { // ✅ add onSelectCar
  const [activeIndex, setActiveIndex] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const router = useRouter();

  const handleCarClick = (item, index) => {
    setActiveIndex(index);
    setSelectedCar(item.name); // only name for DB
    onSelectCar && onSelectCar(item.name); // ✅ inform parent
  };

  return (
    <div className="mt-5 p-5 overflow-auto h-[250px]">
      <h2 className="text-[22px] font-bold">Select Your Car</h2>

      {CarListData.map((item, index) => (
        <div
          className={`cursor-pointer p-2 rounded-md border-black ${
            activeIndex === index ? 'border-[2px]' : ''
          }`}
          key={index}
          onClick={() => handleCarClick(item, index)}
        >
          <CarListItem key={item.id} car={item} distance={distance} />
        </div>
      ))}

      {/* Payment bar */}
      {selectedCar && (
        <div className="flex justify-between fixed bottom-5 bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] items-center rounded-lg">
          <h2>Make Payment For {selectedCar}</h2>
          <button
            className="p-3 bg-black text-white rounded-lg text-center"
            onClick={() => {
              const item = CarListData[activeIndex];
              const price = distance
                ? item.baseFare + item.perKmRate * distance
                : 0;
              router.push(
                `/payment?amount=${price}&rideId=${rideId}&car=${selectedCar}`
              );
            }}
          >
            Pay
          </button>
        </div>
      )}
    </div>
  );
}

export default CarListOptions;
