import React, { useState } from "react";
import axios from "axios";
import useTasks from "../hooks/useTasks";
const AddTask = (props) => {
  const [description, setDescription] = useState(null);
  const [task, setTask, setUpdated] = useTasks();
  const addTask = async (e) => {
    e.preventDefault();
    const title = e.target.elements.newTaskTitle.value;
    const priority = e.target.elements.priority.value;
    const column = e.target.elements.column.value;
    const colId = props.allCols.find((col) => col.title === column);

    try {
      const newTask = await axios.post("api/tasks", {
        title,
        priority,
        description,
        column: colId._id,
      });
      setTask([...task, newTask.data]);
      setUpdated(true);
    } catch (error) {
      console.log(error);
    }
    props.close();
  };
  return (
    <div className="px-2 py-2 md:px-8   text-sm md:text-base">
      <form autoComplete="off" onSubmit={addTask}>
        <h4 className="text-lg sm:text-2xl text-gray-800">Add a New Task</h4>

        <div className="mt-6 sm:mt-12">
          <div>
            <label htmlFor="newTaskTitle" className="block text-gray-500">
              Title:
            </label>
            <input
              maxLength="45"
              required
              type="text"
              name="newTaskTitle"
              className="bg-transparent border-b border-gray-400 w-3/4 text-lg md:text-2xl outline-none"
            />
          </div>

          <div className="sm:flex my-8">
            <div className="">
              <label
                htmlFor="priority"
                className=" text-gray-500 block sm:inline"
              >
                Priority
              </label>
              <select name="priority" defaultValue="Low" className="select">
                <option value="High" className="option">
                  High
                </option>
                <option value="Medium" className="option">
                  Medium
                </option>
                <option value="Low" className="option">
                  Low
                </option>
              </select>
            </div>

            <div className="mt-8 sm:mt-0 sm:ml-12">
              <label className="text-gray-500 block sm:inline" htmlFor="column">
                Select a column
              </label>
              <select name="column" required className="select">
                {props.allCols.map((c) => (
                  <option className="option" value={c.title} key={c._id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="my-8">
          <label htmlFor="newTaskDescription" className="block text-gray-500">
            Description (optional):
          </label>
          <textarea
            name="desc"
            className="border border-gray-300 w-full px-4 py-3 outline-none h-32"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="bg-purple-500 text-white px-3 py-2 rounded-md">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
