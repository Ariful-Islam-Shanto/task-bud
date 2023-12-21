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
            className="bg-gray-200 my-4 py-2 px-5 rounded-md w-full text-gray-900"
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
          
                <div className="card-body p-0 items-center text-center">
                  <h2 className="card-title">{item?.title}</h2>
                  <p>{item?.description}</p>
                  <p> Deadline : {formattedDate}</p>
                  <div className="card-actions justify-end">
                    <button   onClick={() => {document.getElementById("my_modal_5").showModal()
                    handleUpdate(item)
                }} className="btn btn-primary"><FaPenSquare/></button>
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
