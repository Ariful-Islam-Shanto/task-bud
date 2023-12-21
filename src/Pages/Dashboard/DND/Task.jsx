import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaPenSquare, FaTrashAlt } from "react-icons/fa";
import UpdateModal from "./Modal/UpdateModal";
import useTodo from "../../../Hooks/useTodo";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const Task = ({ item, index }) => {
  const {refetch} = useTodo();
  const axiosPublic = useAxiosPublic();
  const [selectedItem, setSelectedItem] = useState({});
  // console.log(`Task Component - Item ID: ${item?.id}, Index: ${index}`);

  const {mutate} = useMutation({
    mutationKey : ['deleteTodo'],
    mutationFn : async (id) => {
        const { data } = await axiosPublic.delete(`/deleteTodo/${id}`)
        if(data.deletedCount > 0) {
            toast.success('Deleted todo');
            refetch();
        }
    }
  })

  const handleUpdate = (item) => {
    setSelectedItem(item)
  }
  return (
    <Draggable key={item?._id} draggableId={`${item?._id}`} index={index}>
      {(provided, snapshot) => {

        const deadline = new Date(item?.deadline);
        const formattedDate = deadline.toLocaleDateString();
        return (
          <div
            className="bg-gradient-to-r  from-[#441DFC] 0%, to-[#4E81EB] my-4 py-2 px-5 rounded-xl w-full text-gray-200"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
          
                <div className="card-body h-full justify-between p-0 items-left text-left">
                  <h2 className="card-title text-xl">{item?.title}</h2>
                  <p className="text-gray-400">{item?.description}</p>
                  <p className="flex-grow text-xs text-gray-400"> Deadline : {formattedDate}</p>
                  <div className="card-actions justify-end">
                    <button   onClick={() => {document.getElementById("my_modal_5").showModal()
                    handleUpdate(item)
                }} className="btn btn-ghost"><FaPenSquare/></button>
                    <button onClick={() => {
                        mutate(item?._id);
                    }} className="btn btn-ghost"><FaTrashAlt/></button>
                  </div>
                </div>
              </div>
              <UpdateModal task={selectedItem}/>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Task;
