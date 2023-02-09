import { useEffect, useState } from "react";
import axios from "axios";
const useCols = () => {
  const [column, setColumn] = useState([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const getColumns = async () => {
      try {
        const columnsFromBackend = await axios.get("api/status");
        setColumn(columnsFromBackend.data);
        setUpdated(false);
      } catch (error) {
        console.log(error);
      }
    };
    getColumns();
  }, []);

  return [column, updated, setUpdated];
};
export default useCols;
