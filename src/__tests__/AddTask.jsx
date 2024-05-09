import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import AddTask from "../components/AddTask";

describe("AddTask component", () => {
  const handleClose = jest.fn();
  const setTodoList = jest.fn();
  const setShowAddTaskTemplate = jest.fn();

  test("Renders Add Task modal", () => {
    render(<AddTask open={true} handleClose={() => {}} buttonName="Add" />);
    const addTaskModal = screen.getByTestId("modal");
    expect(addTaskModal).toBeInTheDocument();
  });

  test("Renders Title", () => {
    render(<AddTask open={true} handleClose={() => {}} buttonName="Add" />);
    const addTaskModal = screen.getByText("Add Task");
    expect(addTaskModal).toBeInTheDocument();
  });

  test("Handles input changes and add button", async () => {
    userEvent.setup();
    render(
      <AddTask
        open={true}
        handleClose={handleClose}
        buttonName="Add"
        setTodoList={setTodoList}
        setShowAddTaskTemplate={setShowAddTaskTemplate}
      />
    );

    const allInput = screen.getAllByRole("textbox");
    allInput.forEach((input) => {
      console.log(input.id, input.value);
      expect(input).toBeInTheDocument();
    });

    const titleInput = screen.getByPlaceholderText("Enter Title");
    const descriptionInput = screen.getByPlaceholderText("Enter Description");
    await userEvent.type(titleInput, "Task Title New");
    await userEvent.type(descriptionInput, "Task Description");
    const saveButton = screen.getByText("Add");
    await userEvent.click(saveButton);
    const editButton = screen.queryByText("Edit");

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(editButton).not.toBeInTheDocument();
    expect(handleClose).toHaveBeenCalled();
  });

  test("Handles input changes and edit button", async () => {
    userEvent.setup();
    render(
      <AddTask
        open={true}
        handleClose={handleClose}
        buttonName="Edit"
        setTodoList={setTodoList}
        setShowAddTaskTemplate={setShowAddTaskTemplate}
      />
    );

    const allInput = screen.getAllByRole("textbox");
    allInput.forEach((input) => {
      console.log(input.id, input.value);
      expect(input).toBeInTheDocument();
    });

    const titleInput = screen.getByPlaceholderText("Enter Title");
    const descriptionInput = screen.getByPlaceholderText("Enter Description");
    await userEvent.type(titleInput, "Task Title New");
    await userEvent.type(descriptionInput, "Task Description");
    const editButton = screen.getByText("Edit");
    await userEvent.click(editButton);
    const addButton = screen.queryByText("Add");

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(addButton).not.toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(handleClose).toHaveBeenCalled();
  });
});
