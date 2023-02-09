import { High, Low, Medium } from "./icons";

export const columns = [
  {
    id: "col-1",
    title: "To do",
  },
  {
    id: "col-2",
    title: "In progress",
  },
  {
    id: "col-3",
    title: "Completed",
  },
  {
    id: "col-4",
    title: "In Review",
  },
];

export const tasks = [
  {
    id: "task-1",
    title: "Learn JavaScript",
    column: "col-1",
    priority: "High",
    description: "hi",
  },
  {
    id: "task-2",
    title: "Learn Git",
    column: "col-1",
    priority: "High",
    description: "hi",
  },
  {
    id: "task-3",
    title: "Learn Python",
    column: "col-2",
    priority: "High",
    description: "hi",
  },
  {
    id: "task-4",
    title: "Learn Dsa",
    column: "col-4",
    priority: "High",
    description: "hi",
  },
];

export const extractPriority = (priority) => {
  switch (priority) {
    case "Low": {
      return <Low />;
    }

    case "Medium": {
      return <Medium />;
    }

    case "High": {
      return <High />;
    }

    default:
      return null;
  }
};
