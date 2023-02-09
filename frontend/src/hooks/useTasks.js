import { useEffect, useState } from "react";
import axios from "axios";

const useTasks = () => {
  const [task, setTask] = useState([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasksFromBackend = await axios.get("api/tasks");

        setTask(tasksFromBackend.data);
        setUpdated(false);
      } catch (error) {
        console.log(error);
      }
    };
    getTasks();
  }, [updated]);

  return [task, setTask, setUpdated];
};

export default useTasks;
