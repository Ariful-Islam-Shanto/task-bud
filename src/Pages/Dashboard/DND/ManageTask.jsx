import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const ManageTask = () => {
  const [todo, setTodo] = useState([]);
  const [onGoingTodo, setOnGoingTodo] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        const todo = json.slice(0, 10);
        const onGoing = json.slice(0, 20).filter((todo) => {
          return todo.completed === false;
        });

        const completed = json.slice(0, 20).filter((todo) => {
          return todo.completed === true;
        });

        setTodo(todo);
        setOnGoingTodo(onGoing);
        setCompletedTodo(completed);

        console.log(json); //
      });
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    //   console.log("draggable id", typeof parseInt(draggableId));
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
      return array.find((item) => item.id === parseInt(id));
    };

    const removeItemById = (id, array) => {
      return array.filter((item) => item.id !== parseInt(id));
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

    console.log("dragged task",task);
    // Add the dragged task to the destination droppable area
    if (destination.droppableId === "1") {
      updatedTodo = [{ ...task }, ...updatedTodo];
    } else if (destination.droppableId === "2") {
      updatedOnGoingTodo = [
        { ...task, completed: false },
        ...updatedOnGoingTodo,
      ];
    } else {
      updatedCompletedTodo = [
        { ...task, completed: false },
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
    <div className="min-h-[calc(100vh-120px)] space-y-8 flex items-center flex-col justify-center">
      <DragDropContext onDragEnd={handleDragEnd}>
        <h1 className="text-4xl text-center font-bold text-gray-800">
          Manage Todo
        </h1>

        <div className="overflow-y-scroll max-h-[calc(100vh-200px)] gap-4 grid grid-cols-3">
          <Column id={"1"} tasks={todo} title={"Todo"} />
          <Column id={"2"} tasks={onGoingTodo} title={"Ongoing"} />
          <Column id={"3"} tasks={completedTodo} title={"Completed"} />
        </div>
      </DragDropContext>
    </div>
  );
};

export default ManageTask;
