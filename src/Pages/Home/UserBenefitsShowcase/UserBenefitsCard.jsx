import React from "react";
import { FaMarker } from "react-icons/fa";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const UserBenefitsCard = ({benefits, isTrue}) => {

    console.log(benefits);
  return (
    <div className=" w-full min-h-[40vh] ">
      <div className={`hero-content  flex-col justify-between ${isTrue ? 'lg:flex-row' : 'lg:flex-row-reverse'} `}>
        <img
          src={benefits?.image}
          className="max-w-sm rounded-lg shadow-2xl shadow-blue-200"
        />
        <div>
          <h1 className="text-2xl font-medium">{benefits?.type}</h1>
          <p className="py-6 text-neutral-400">
            {benefits?.description}
          </p>
          <div className="space-y-4">
            {benefits?.benefits?.map((item, idx) => 
                <p className="flex items-center gap-3" key={idx}><IoCheckmarkDoneCircleSharp/> {item}</p>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBenefitsCard;
