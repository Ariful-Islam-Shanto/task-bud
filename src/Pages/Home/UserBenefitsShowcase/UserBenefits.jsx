import React from "react";
import UserBenefitsCard from "./UserBenefitsCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const UserBenefits = () => {

    const axiosPublic = useAxiosPublic();

    const {data: benefits} = useQuery({
        queryKey : ['benefits'],
        queryFn : async () => {
            const {data} = await axiosPublic.get('/benefits');
            return data;
        }
    })

    console.log(benefits);
  return (
    <div className="min-h-[100vh py-12 ">
      <div className="max-w-xl space-y-4 mx-auto">
        <h1 className="text-gray-800 text-4xl text-center font-bold">
          Personalized Benefits Showcase
        </h1>
        <p className="text-gray-500 text-center">
          Discover Task-Bud Platform provides personalized benefits for
          developers, bankers, and students. Streamline tasks, enhance
          collaboration, and elevate your professional or academic journey.
        </p>
      </div>

      <div>
          {
            benefits?.map((benefit, idx) => 
                <UserBenefitsCard key={benefits._id} benefits={benefit} isTrue={idx === 1 ? true : false}/>
            )
          }
      </div>
    </div>
  );
};

export default UserBenefits;
