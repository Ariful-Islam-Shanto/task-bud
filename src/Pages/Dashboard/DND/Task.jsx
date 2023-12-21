import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({item, index}) => {
    // console.log(`Task Component - Item ID: ${item?.id}, Index: ${index}`);
    return (
        <Draggable
                      key={item?.id}
                      draggableId={`${item?.id}`}
                      index={index}
                    >
                      {(provided, snapshot) =>{
                      return   (
                        <div className='bg-gray-300 my-4 py-2 px-5 rounded-md w-full text-gray-900'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}

                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around"
                            }}
                          >
                            {item.title} $ id: {item.id}
                            {/* <button
                              type="button"
                              onClick={() => {
                                const newState = [...state];
                                newState[ind].splice(index, 1);
                                setState(
                                  newState.filter(group => group.length)
                                );
                              }}
                            >
                              delete
                            </button> */}
                          </div>
                        </div>
                      )}}
                    </Draggable>
    );
};

export default Task;