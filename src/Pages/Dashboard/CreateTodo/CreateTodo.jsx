import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

const CreateTodo = () => {
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

    const task = data.title;
    const description = data.description;
    const priority = data.priority;
    const deadline = data.deadline;
    console.log(task, description, priority, deadline);

    if ((!task, !description, !priority, !deadline)) {
      return toast.error("Please fill out the form correctly.");
    }
    try {

        const currentDate = new Date();
// const formattedDate = currentDate.toLocaleDateString();

      const newTodo = {
        title: task,
        email : user?.email,
        description: description,
        priority: priority,
        startDate : currentDate,
        deadline: new Date(deadline),
        status: "todo",
      };

      const { data: todoData } = await axiosPublic.post("/addTodo", newTodo);
      console.log(todoData);


      if (todoData.insertedId) {
        toast.success("Added a new todo.");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div>
      <h1 className="text-4xl font-thin text-gray-800">New Task</h1>
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
            name="title"
            type="text"
            placeholder="title"
            className="input border-0 border-b-4 focus:border-b-2 border-gray-800"
            required
          />
        </div>

        <div className="form-control col-span-1 md:col-span-2">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          {/* <input type="text" {...register('category')} name='category'  placeholder="Category" className="input input-bordered" required /> */}
          <select
            defaultValue="default"
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
            name="deadline"
            type="date"
            placeholder="Agent name"
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
            Create Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;
