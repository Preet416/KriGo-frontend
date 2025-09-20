import React from 'react'
import Image from 'next/image'
import { FaUser } from "react-icons/fa6";

function CarListItem({ car, distance }) {
  
  const price = distance
    ? car.baseFare + car.perKmRate * distance
    : 0;

  return (
    <div>
      <div className="flex items-center justify-between mt-5">
        {/* Left side: Car image + info */}
        <div className="flex items-center gap-5">
          <Image
            src={car.image}
            width={100}
            height={100}
            alt={car.name || "Car image"}
          />

          <div>
            <h2 className="font-semibold text-[18px] flex gap-3 items-center">
              {car.name}
              <span className="flex gap-2 font-normal text-[14px] items-center">
                <FaUser /> {car.seat}
              </span>
            </h2>
            <p>{car.desc}</p>
          </div>
        </div>

        {/* Right side: Price in ₹ */}
        <h2 className="font-semibold text-[18px]">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(price)}
        </h2>
      </div>
    </div>
  )
}

export default CarListItem
