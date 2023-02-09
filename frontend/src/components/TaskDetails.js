import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { extractPriority } from "../constants/mockData";
import axios from "axios";

const TaskDetails = ({ taskDetails, columnDetails }) => {
  const [updatedTitle, setTitle] = useState(taskDetails.title);
  const [updatedPriority, setPriority] = useState(taskDetails.priority);
  const [updatedDesc, setNewDesc] = useState(taskDetails.description);
  const [editing, setEditing] = useState(false);
  const [columnTitle, setColumnTitle] = useState();

  useEffect(() => {
    const getColumnData = async () => {
      try {
        const columnInfo = await axios.get(`api/status/${columnDetails}`);

        setColumnTitle(columnInfo.data);
      } catch (error) {
        console.log(error);
      }
    };
    getColumnData();
  }, [columnDetails]);

  const updateTask = () => {};

  return (
    <div className="md:px-8 text-sm md:text-base">
      <form onSubmit={updateTask} autoComplete="off">
        <div>
          <label
            className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            maxLength="45"
            type="text"
            name="title"
            className="text-xl md:text-2xl block w-full  outline-none"
            defaultValue={taskDetails?.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="lg:grid lg:grid-cols-8 gap-x-20 w-full">
          {/* First column */}
          <div className="col-span-6 mt-12">
            <div>
              <label className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block">
                Categories
              </label>
              <select>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
              </select>
            </div>
            <div className="mt-12 w-full">
              <div className={`${editing ? "" : "hidden"}`}>
                <div className="">
                  <label
                    className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block"
                    htmlFor="desc"
                  >
                    Description:
                  </label>
                  <textarea
                    name="desc"
                    className="border border-gray-300  px-4 py-4 outline-none rounded-md h-56 w-full"
                    defaultValue={taskDetails.description}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                  <div>
                    <div
                      onClick={() => setEditing(false)}
                      className="inline-block cursor-pointer text-gray-700 px-2 rounded-md py-1 mt-1 bg-gray-300"
                    >
                      Cancel
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm block"
                    htmlFor="desc"
                  >
                    Live Preview:
                  </label>
                  <ReactMarkdown
                    remarkPlugins={[gfm]}
                    className="border border-gray-200 px-2 py-4 overflow-y-auto   prose text-sm sm:text-base leading-tight text-gray-900"
                  >
                    {updatedDesc}
                  </ReactMarkdown>
                </div>
              </div>

              <div
                className={`${editing ? "hidden" : ""}`}
                onClick={() => setEditing(true)}
              >
                <label
                  className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block"
                  htmlFor="desc"
                >
                  Description:
                </label>
                <ReactMarkdown
                  remarkPlugins={[gfm]}
                  className="border border-gray-200 bg-gray-50 px-2 py-3 overflow-y-auto prose text-sm sm:text-base leading-normal  text-gray-900"
                >
                  {taskDetails.description === "" ||
                  taskDetails.description === null
                    ? "*No description yet, type here to add*"
                    : updatedDesc}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Second column */}
          <div className="col-span-2 mt-12">
            <div className="">
              <label
                className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block"
                htmlFor="title"
              >
                Priority:
              </label>
              <div className="flex items-center">
                <select
                  name="priority"
                  defaultValue={taskDetails.priority}
                  className="select"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option className="option" value="High">
                    High
                  </option>
                  <option className="option" value="Medium">
                    Medium
                  </option>
                  <option className="option" value="Low">
                    Low
                  </option>
                </select>
                {extractPriority(taskDetails.priority)}
              </div>
            </div>

            <div className="mt-12">
              <label
                className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block"
                htmlFor="title"
              >
                Status:
              </label>
              <h4 className="bg-gray-300 rounded-md text-black px-2 py-1 inline-block">
                {columnTitle?.title}
              </h4>
            </div>

            {taskDetails.updatedAt ? (
              <div className="mt-12">
                <label
                  className="text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block"
                  htmlFor="desc"
                >
                  Date Added:
                </label>
                <h4 className="tracking-wide">
                  {
                    new Date(taskDetails.updatedAt)
                      .toLocaleString()
                      .split(",")[0]
                  }
                </h4>
              </div>
            ) : null}
          </div>
        </div>

        {/* Buttons */}
        <div className="my-12 flex justify-end w-full text-sm sm:text-base">
          {taskDetails.description !== updatedDesc ||
          taskDetails.title !== updatedTitle ||
          taskDetails.priority !== updatedPriority ? (
            <div className="bg-green-700 rounded-md text-white px-2 py-2 transform hover:-translate-y-1 transition-transform duration-300">
              <button className="cursor-pointer" type="submit">
                Save changes
              </button>
            </div>
          ) : null}

          <div
            className="border border-red-700 text-red-700 hover:bg-red-700 hover:text-white transition-colors duration-300 px-2 py-2 rounded-md ml-4"
            // onClick={() => setModal(true)}
          >
            <p className="cursor-pointer">Delete Task</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskDetails;
