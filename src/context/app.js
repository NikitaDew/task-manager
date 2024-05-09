import { createContext } from "react";
export const BoardContext = createContext({
  showAddTaskTemplate: false,
  setShowAddTaskTemplate: () => null,
  todoList: [],
  setTodoList: () => null,
  title: "",
  setTitle: () => null,
  description: "",
  setDescription: () => null,
});
