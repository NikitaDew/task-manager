import "../style.css";
import { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Box, Button } from "@mui/material";
import { BoardContext } from "../context/app";
import AddTask from "./AddTask";

export const Task = ({ task, index }) => {
  const boardContext = useContext(BoardContext);
  const {
    todoList,
    setTodoList,
    setShowAddTaskTemplate,
    setTitle,
    setDescription,
  } = boardContext;
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleDelete = (todo) => {
    const newTodo =
      todoList && todoList.filter((val) => val.title !== todo.title);
    setTodoList(newTodo);
  };
  const handleEdit = (todo) => {
    setShowAddTaskTemplate(true);
    setOpen(true);
    setTitle(todo.title);
    setDescription(todo.description);
  };
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className="task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box sx={{ display: "flex", justifyContent: "start", padding: 2 }}>
            <span style={{ fontWeight: 600 }}>
              <small>#{task.id}: </small>
              <span>{task.title}</span>
            </span>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "start", padding: 2 }}>
            <span>{task.description}</span>
          </Box>

          <Box sx={{ display: "flex", placeContent: "flex-end" }}>
            <Button
              variant="contained"
              size="small"
              sx={{ margin: "5px" }}
              onClick={() => handleEdit(task)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              sx={{ margin: "5px" }}
              onClick={() => handleDelete(task)}
            >
              Delete
            </Button>
            {open && (
              <AddTask
                open={open}
                handleClose={handleClose}
                buttonName={"Edit"}
              />
            )}
          </Box>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};
