import React, { useContext, useState } from "react";
import {
  Modal,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import { BoardContext } from "../context/app";
import { v4 as uuidv4 } from "uuid";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 20,
  p: 4,
  borderRadius: "10px",
};
const AddTask = ({ open, handleClose, buttonName }) => {
  const boardContext = useContext(BoardContext);
  const {
    title,
    setTitle,
    description,
    setDescription,
    setTodoList,
    setShowAddTaskTemplate,
    todoList,
  } = boardContext;
  const [baseTodo] = useState({ title: title, description: description });
  const handleInputChange = (value, inputType) => {
    switch (inputType) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };
  const handleSave = () => {
    const obj = {
      title: title,
      description: description,
      id: uuidv4(),
      completed: false,
    };
    if (buttonName === "Add") {
      setTodoList((list) => [...list, obj]);
    } else {
      const newList =
        todoList &&
        todoList?.map((todo) => {
          if (
            todo.title === baseTodo.title &&
            todo.description === baseTodo.description
          ) {
            return {
              title: title,
              description: description,
              id: uuidv4(),
              completed: todo.completed,
            };
          } else {
            return todo;
          }
        });
      setTodoList(newList);
    }

    setTitle("");
    setDescription("");
    setShowAddTaskTemplate(false);
    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose} data-testid="modal">
      <Box sx={style}>
        <Box className="addTask-container">
          <h2 className="addTask-header">Add Task</h2>
          <Box className="addTask-details-container">
            <FormControl sx={{ m: 1, width: "500px" }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Enter Title
              </InputLabel>
              <OutlinedInput
                id="outlined-title"
                data-testid="input-title"
                placeholder="Enter Title"
                label="Enter Title"
                value={title}
                onChange={(e) => handleInputChange(e.target.value, "title")}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "500px" }}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Enter Description
              </InputLabel>
              <OutlinedInput
                id="outlined-description"
                data-testid="input-description"
                placeholder="Enter Description"
                label="Enter Description"
                value={description}
                onChange={(e) =>
                  handleInputChange(e.target.value, "description")
                }
              />
            </FormControl>
          </Box>
          <Button variant="contained" size="medium" onClick={handleSave}>
            {buttonName}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddTask;
