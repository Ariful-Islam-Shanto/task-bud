import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const Column = ({title, tasks, id}) => {
    return (
        <div className='bg-gray-100  p-4 h-full w-full border-black border-2'>
          
         <div className='p-2 bg-[#3e1a3b] w-full'>  <h1 className='text-center text-xl font-bold text-gray-200'>{title}</h1></div>          
            <Droppable droppableId={id}>
              {(provided, snapshot) => {

return (
                <div
                className='h-full'
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