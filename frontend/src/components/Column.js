import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const Column = ({ tasks, column }) => {
  return (
    <Droppable droppableId={column._id}>
      {(provided, snapshot) => (
        <div
          className="bg-gray-100 mx-2 rounded-md  overflow-x-auto h-full mt-10 min-w-[250px]"
          style={{ height: "90%" }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="text-xl font-bold text-center mt-3">
            {column.title}
          </div>
          <div className="mt-10">
            {tasks?.map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? "0.5" : "1",
                    }}
                  >
                    <Task task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
