import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const Column = ({title, tasks, id}) => {
    return (
        <div className='bg-gray-400 p-4 h-full w-full border-black border-2'>
            <h1 className='text-center text-xl font-bold'>{title}</h1>
          
            <Droppable droppableId={id}>
              {(provided, snapshot) => {

return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: snapshot.isDraggingOver ? 'lightblue' : 'white', // Example styling
                  }}
                >
                  {tasks?.map((item, index) => (
                   <Task
                   item={item}
                   index={index}
                   key={item?.id}
                   />
                  ))}
                  {provided.placeholder}
                </div>

              )}}
            </Droppable>
        </div>
    );
};

export default Column;