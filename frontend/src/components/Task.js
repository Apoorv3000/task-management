import React, { useState } from "react";
import { Description } from "../constants/icons";
import { extractPriority } from "../constants/mockData";
import Modal from "./Modal";
import TaskDetails from "./TaskDetails";

const Task = ({ task }) => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      <Modal modal={modal} setModal={setModal} ariaText="Task Details">
        <TaskDetails
          taskDetails={task}
          closeModal={() => setModal(false)}
          columnDetails={task.column}
        />
      </Modal>
      <div
        className="bg-indigo-200
     text-black p-5
      m-5 flex flex-col 
      items-center 
      rounded-md
      shadow-lg
      justify-center cursor-pointer"
        onClick={() => setModal(true)}
      >
        {task.title}
        <div className="flex mt-2 space-x-3 sm:space-x-5">
          {extractPriority(task.priority)}
          {task.description !== null && task.description?.length > 1 ? (
            <Description />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Task;
