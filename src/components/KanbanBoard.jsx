import React, { useEffect, useState, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { Box, Button } from "@mui/material";
import { BoardContext } from "../context/app";
import AddTask from "./AddTask";

const KanbanBoard = () => {
  const boardContext = useContext(BoardContext);
  const [showAddTaskTemplate, setShowAddTaskTemplate] = useState(
    boardContext.showAddTaskTemplate
  );
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState(boardContext.title);
  const [description, setDescription] = useState(boardContext.description);

  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (storedTodoList) {
      setTodoList(storedTodoList);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    const completedTask = todoList?.filter((task) => task.completed);
    const incompletedTask = todoList?.filter((task) => !task.completed);
    setCompleted(completedTask);
    setIncomplete(incompletedTask);
  }, [todoList]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      return;
    }

    // Find the dragged task
    const draggedTask = todoList?.find((task) => {
      console.log(task.id, draggableId);
      return task.id === draggableId;
    });

    // Update the todoList based on the destination
    const updatedTodoList = todoList?.map((task) => {
      if (task?.id === draggedTask.id) {
        return { ...task, completed: destination.droppableId === "2" };
      }
      return task;
    });

    // Update the state
    setTodoList(updatedTodoList);

    // If the destination is "2" (Done), move the task to completed array
    if (destination.droppableId === "2") {
      setCompleted([...completed, draggedTask]);
    } else {
      // If the destination is not "2" (Done), remove the task from completed array
      const updatedCompleted = completed.filter(
        (task) => task.id !== draggedTask.id
      );
      setIncomplete(updatedCompleted);
    }
  };

  return (
    <BoardContext.Provider
      value={{
        showAddTaskTemplate,
        setShowAddTaskTemplate,
        todoList,
        setTodoList,
        title,
        setTitle,
        description,
        setDescription,
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Kanban Board</h2>
        <Button
          variant="contained"
          size="small"
          sx={{ margin: "5px" }}
          onClick={handleOpen}
        >
          Add Task
        </Button>
        {open && (
          <AddTask open={open} handleClose={handleClose} buttonName="Add" />
        )}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              margin: "20px 100px",
            }}
          >
            <Column id={"1"} title={"Todo"} tasks={incomplete} />
            <Column id={"2"} title={"Done"} tasks={completed} />
          </Box>
        </DragDropContext>
      </Box>
    </BoardContext.Provider>
  );
};

export default KanbanBoard;
