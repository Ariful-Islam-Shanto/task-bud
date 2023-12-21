import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAuth from "../../../../Hooks/useAuth";
import useTodo from "../../../../Hooks/useTodo";

const UpdateModal = ({task}) => {
    const { refetch } = useTodo();
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
  
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
      console.log(data);
  
      const todo = data.title;
      const description = data.description;
      const priority = data.priority;
      const deadline = data.deadline;
      console.log(todo, description, priority, deadline);
  
      if ((!todo, !description, !priority, !deadline)) {
        return toast.error("Please fill out the form correctly.");
      }
      try {
  
          const currentDate = new Date();
  // const formattedDate = currentDate.toLocaleDateString();
  
        const newTodo = {
          title: todo || task?.title,
          email : user?.email,
          description: description || task?.description,
          priority: priority || task?.priority,
          startDate : currentDate,
          deadline: new Date(deadline) || task?.deadline,
          status: "todo" || task?.status,
        };
  
        const { data: todoData } = await axiosPublic.put(`/todo/${task?._id}`, newTodo);
        console.log(todoData);
  
  
        if (todoData.modifiedCount > 0) {
          toast.success("Updated todo.");
           refetch();
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    };
  

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box px-0">
            <h1 className="text-center text-4xl stroke- stroke-slate-800 pb-5 text-gray-700 font-bold border-b-2 border-blue-500">Update Todo</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body grid grid-cols-1 md:grid-cols-4"
          >
            <div className="form-control col-span-1 md:col-span-4">
              <label className="label">
                <span className="label-text">Enter Task Name</span>
              </label>
              <input
                {...register("title")}
                defaultValue={task?.title}
                name="title"
                type="text"
                placeholder="title"
                className="input text-gray-700 placeholder:text-gray-700 border-0 border-b-4 focus:border-b-2 border-gray-800"
                required
              />
            </div>

            <div className="form-control col-span-1 md:col-span-2">
              <label className="label">
                <span className="label-text">Priority</span>
              </label>

              <select
                defaultValue={task?.priority}
                {...register("priority")}
                name="priority"
                className=" px-5 text-gray-700 py-3 rounded-md border-0 border-b-4 focus:border-b-2 border-gray-800"
              >
                <option disabled value="default">
                  Select a Priority
                </option>
                <option value="low">Low</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
              </select>
            </div>

            <div className="form-control col-span-1 md:col-span-2">
              <label className="label">
                <span className="label-text">Deadline</span>
              </label>
              <input
                {...register("deadline")}
                defaultValue={task?.deadline ? new Date(task.deadline).toISOString().split('T')[0] : ''}
                name="deadline"
                type="date"
                placeholder="deadline"
                className="border-0 text-gray-700 border-b-4 focus:border-b-2 border-gray-800 input input-bordered"
                required
              />
            </div>

            <div className="form-control col-span-1 md:col-span-4">
              <label className="label">
                <span className="label-text"></span>
              </label>
              <textarea
                {...register("description")}
                defaultValue={task?.description}
                name="description"
                id=""
                cols="30"
                rows="2"
                className="px-5 text-gray-700 placeholder:text-gray-700 py-5 rounded-lg border-0 border-b-4 focus:border-b-2 border-gray-800"
                placeholder="Description"
              ></textarea>
            </div>

            <div className="form-control mt-6 w-full flex items-center flex-row gap-6 justify-between">
              <button
                type="submit"
                className="btn bg-blue-400 border-none text-gray-800 "
              >
                Update
              </button>
             
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
    
            </div>
          </form>
         
        </div>
      </dialog>
    </div>
  );
};

export default UpdateModal;
