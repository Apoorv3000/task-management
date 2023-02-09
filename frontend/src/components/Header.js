import React, { useState } from "react";

import { Add } from "../constants/icons";

import useCols from "../hooks/useCols";
import AddTask from "../pages/AddTask";
import Modal from "./Modal";

const Header = () => {
  const [filter, setFilter] = useState(null);
  const priority = ["high", "medium", "low"];
  const [modal, setModal] = useState(false);
  const [column] = useCols();
  return (
    <>
      <div className="p-5 shadow-lg mb-2">
        <div className="flex flex-wrap justify-between items-center">
          <div className="mr-5 text-2xl">Kanban..</div>
          <div className="flex flex-wrap items-center sm:space-x-9">
            <div className="flex items-center mt-2 sm:mt-0">
              <h3 className="text-gray-500 mr-2">Categories:</h3>
              <div className="space-x-1 text-blue-900 flex bg-indigo-50 rounded-md">
                <select className=" bg-indigo-50 rounded-md px-2 py-2">
                  <option value="">Choose Category</option>
                  <option value="">Choose Category</option>
                  <option value="">Choose Category</option>
                </select>
              </div>
            </div>
            <div className="flex items-center mt-2 sm:mt-0 ">
              <h3 className="text-gray-500 mr-2">Show Priority: </h3>
              <div className="space-x-1 text-blue-900 flex bg-indigo-50 rounded-md">
                {priority.map((f) => (
                  <div
                    key={f}
                    className={`px-3  border-black py-1 hover:bg-blue-600 hover:rounded-md hover:text-blue-50 cursor-pointer capitalize ${
                      filter === f ? "bg-blue-600 text-blue-50" : ""
                    }`}
                    onClick={() => setFilter(f === "all" ? null : f)}
                  >
                    {f}
                  </div>
                ))}
                {filter ? (
                  <div
                    className="px-2 py-1 cursor-pointer hover:text-blue-700 rounded-sm"
                    onClick={() => setFilter(null)}
                  >
                    All
                  </div>
                ) : null}
              </div>
            </div>
            <div
              className="text-black bg-indigo-300  transform hover:scale-110 transition-all duration-300 rounded-full fixed bottom-6 right-6 p-2 sm:p-1 sm:static"
              onClick={() => setModal(true)}
            >
              <Add />
            </div>
          </div>
        </div>
      </div>
      <Modal modal={modal} setModal={setModal} ariaText="Add a new task">
        <AddTask allCols={column} close={() => setModal(false)} />
      </Modal>
    </>
  );
};

export default Header;
