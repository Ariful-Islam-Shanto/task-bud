import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useTodo from "../../../Hooks/useTodo";
import toast from "react-hot-toast";

const ManageTask = () => {
    const axiosPublic = useAxiosPublic();
  const [todo, setTodo] = useState([]);
  const [onGoingTodo, setOnGoingTodo] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);
  const {todos} = useTodo();
  console.log(todos);

  useEffect(() => {
 
    if(todos) {
      const allTodos = todos.filter(item => item.status === 'todo');
      const onGoing = todos.filter(item => item.status === 'ongoing');
      const completed = todos.filter(item => item.status === 'completed');
  
      setTodo(allTodos);
    //   console.log('alltodos', allTodos);
      setOnGoingTodo(onGoing);
      setCompletedTodo(completed);
    }
  }, [todos])
//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/todos")
//       .then((response) => response.json())
//       .then((json) => {
//         // console.log(json);
//         const todo = json.slice(0, 10);
//         const onGoing = json.slice(0, 20).filter((todo) => {
//           return todo.completed === false;
//         });

//         const completed = json.slice(0, 20).filter((todo) => {
//           return todo.completed === true;
//         });

//         setTodo(todo);
//         setOnGoingTodo(onGoing);
//         setCompletedTodo(completed);

//         console.log(json); //
//       });
//   }, []);

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    //   console.log("draggable id", typeof draggableId);
    //? If the task is dragged but put in into the same
    //? Box again then return the result.

    
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    //? Create two function for find and remove the specific
    //? id that has been dragged.
    const findItemById = (id, array) => {
      return array.find((item) => item._id === id);
    };

    const removeItemById = (id, array) => {
      return array.filter((item) => item._id !== id);
    };

    //? testing purpose
    let updatedTodo = [...todo];
    let updatedOnGoingTodo = [...onGoingTodo];
    let updatedCompletedTodo = [...completedTodo];

    // Remove the dragged task from the source droppable area
    if (source.droppableId === "1") {
      updatedTodo = removeItemById(draggableId, updatedTodo);
    } else if (source.droppableId === "2") {
      updatedOnGoingTodo = removeItemById(draggableId, updatedOnGoingTodo);
    //   console.log(updatedOnGoingTodo);
    } else {
      updatedCompletedTodo = removeItemById(draggableId, updatedCompletedTodo);
    //   console.log(updatedCompletedTodo);
    }

    // Get the dragged task
    const task = findItemById(draggableId, [
      ...todo,
      ...onGoingTodo,
      ...completedTodo,
    ]);

    if(task) {
        let status;
        if(destination.droppableId === '1') {
            status = 'todo'
        }else if(destination.droppableId === '2') {
            status = 'ongoing';
        }else {
            status = 'completed';
        }
        const { data } = await axiosPublic.put(`/status/${task?._id}`, {status});
        // console.log(data);
        // console.log(status);
        if(data.modifiedCount > 0) {
            toast.success(`${task.title} is ${status}`);
        }
    }

    console.log("dragged task",task);
    // Add the dragged task to the destination droppable area
    if (destination.droppableId === "1") {
      updatedTodo = [{ ...task }, ...updatedTodo];
    } else if (destination.droppableId === "2") {
      updatedOnGoingTodo = [
        { ...task, status : 'ongoing' },
        ...updatedOnGoingTodo,
      ];
    } else {
      updatedCompletedTodo = [
        { ...task, status : 'completed'},
        ...updatedCompletedTodo,
      ];
    }

    console.log(updatedOnGoingTodo, "updated ongoing");
    console.log(updatedCompletedTodo, "updated completed");
    setTodo(updatedTodo);
    setOnGoingTodo(updatedOnGoingTodo);
    setCompletedTodo(updatedCompletedTodo);
  };
  
  return (
    <div className="min-h-[calc(100vh-120px)] py-3 space-y-8 flex items-left flex-col justify-center">
      <DragDropContext onDragEnd={handleDragEnd}>
        <h1 className="text-4xl pt-3 font-thin text-gray-300 text-center ">
          Manage Todo
        </h1>

        <div className="overflow-y-scroll min-h-[calc(100vh-200px)] w-full gap-4 grid grid-cols-1 lg:grid-cols-2">
          <Column id={"1"} tasks={todo} title={"Todo"} />
          <Column id={"2"} tasks={onGoingTodo} title={"Ongoing"} />
          <Column id={"3"} tasks={completedTodo} title={"Completed"} />
        </div>
      </DragDropContext>
    </div>
  );
};

export default ManageTask;
