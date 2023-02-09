import React, { useEffect, useState } from "react";

import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import axios from "axios";
import useCols from "../hooks/useCols";
import useTasks from "../hooks/useTasks";

const Kanban = () => {
  const [column, updated, setUpdated] = useCols();

  const [task] = useTasks();
  const [cols, setCols] = useState(column);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(task);
  }, [task]);

  const addColumn = async (e) => {
    e.preventDefault();
    const newColumnName = e.target.elements.newCol.value;
    try {
      const response = await axios.post("api/status", {
        title: newColumnName,
      });

      const newColumn = { id: response.data._id, title: response.data.title };

      setCols((prev) => [...prev, newColumn]);
      setUpdated(true);
      e.target.elements.newCol.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    const sourceTask = tasks.find((task) => task._id === result.draggableId);

    if (source.droppableId === destination.droppableId) {
      let newTasks = [...tasks];
      let sourceIndex = newTasks.indexOf(sourceTask);
      newTasks.splice(sourceIndex, 1);
      if (destination.index > sourceIndex) {
        newTasks.splice(destination.index, 0, sourceTask);
      } else {
        newTasks.splice(destination.index, 0, sourceTask);
      }

      setTasks([...newTasks]);
    } else {
      let newTasks = [...tasks];
      let sourceIndex = newTasks.indexOf(sourceTask);
      newTasks.splice(sourceIndex, 1);

      if (destination.index === 0) {
        newTasks = [sourceTask, ...newTasks];
      } else {
        newTasks.splice(destination.index, 0, sourceTask);
      }
      sourceTask.column = destination.droppableId;

      setTasks([...newTasks]);
    }
  };

  return (
    <>
      {cols ? (
        <DragDropContext onDragEnd={onDragEnd} direction="horizontal">
          <div className="flex items-start  justify-center">
            <div className="flex justify-center">
              {(!updated ? column : cols).map((column) => {
                const columnTasks = tasks?.filter(
                  (task) => task.column === column._id
                );
                return (
                  <Column
                    key={column._id}
                    column={column}
                    tasks={columnTasks}
                  />
                );
              })}
            </div>
            <div className="flex items-center mt-[2.55rem]">
              <form autoComplete="off" className="ml-10" onSubmit={addColumn}>
                <input
                  maxLength="20"
                  className="truncate bg-transparent placeholder-indigo-500 text-indigo-800 bg-indigo-50 px-2 outline-none py-1 rounded-sm ring-2 focus:ring-indigo-500"
                  type="text"
                  name="newCol"
                  placeholder="Add a new column"
                />
              </form>
            </div>
          </div>
        </DragDropContext>
      ) : (
        "No Column added"
      )}
    </>
  );
};

export default Kanban;
