import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const Column = ({title, tasks, id}) => {
    return (
        <div className='bg-  p-4 h-full w-full border-black border-2'>
          
         <div className='p-2 rounded-md bg-[#3b82f6] w-full'>  <h1 className='text-center text-xl font-thin text-gray-300'>{title}</h1></div>          
            <Droppable droppableId={id}>
              {(provided, snapshot) => {

return (
                <div
                className='h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 items-center gap-5'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: snapshot.isDraggingOver ? 'lightblue' : '', // Example styling
                  }}
                >
                    {tasks?.length < 0 && 
                       <div className='w-full h-full'>
                       <h1 className='text-white'>Add Todo</h1>
                   </div>
                    }
                  { tasks?.map((item, index) => (
                   <Task
                   item={item}
                   index={index}
                   key={item?._id}
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