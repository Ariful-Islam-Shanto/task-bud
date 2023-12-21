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
        <div className="modal-box">
            <h1 className="text-center text-2xl text-gray-700 font-thin border-b-2 border-purple-500">Update Todo</h1>
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
                className="input border-0 border-b-4 focus:border-b-2 border-gray-800"
                required
              />
            </div>

            <div className="form-control col-span-1 md:col-span-2">
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              {/* <input type="text" {...register('category')} name='category'  placeholder="Category" className="input input-bordered" required /> */}
              <select
                defaultValue={task?.priority}
                {...register("priority")}
                name="priority"
                className=" px-5 py-3 rounded-md border-0 border-b-4 focus:border-b-2 border-gray-800"
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
                className="border-0 border-b-4 focus:border-b-2 border-gray-800 input input-bordered"
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
                className="px-5 py-5 rounded-lg border-0 border-b-4 focus:border-b-2 border-gray-800"
                placeholder="Description"
              ></textarea>
            </div>

            <div className="form-control mt-6 w-full">
              <button
                type="submit"
                className="btn bg-[#D94ACD] border-none text-gray-800 "
              >
                Update
              </button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateModal;
