import React from "react";
import { render, screen } from "@testing-library/react";
import KanbanBoard from "../components/KanbanBoard";
import { BoardContext } from "../context/app";
import userEvent from "@testing-library/user-event";

const mockContextValues = {
  todoList: [
    { id: "1", title: "Task 1", description: "Description 1" },
    { id: "2", title: "Task 2", description: "Description 2" },
  ],
  setTodoList: jest.fn(),
  setShowAddTaskTemplate: jest.fn(),
  setTitle: jest.fn(),
  setDescription: jest.fn(),
};

// Mock the implementation of AddTask component
jest.mock("./AddTask", () => {
  return jest.fn(() => <div data-testid="mocked-add-task"></div>);
});

describe("KanbanBoard", () => {
  test("renders properly", () => {
    render(
      <BoardContext.Provider value={mockContextValues}>
        <KanbanBoard />
      </BoardContext.Provider>
    );
    const heading = screen.getByText("Kanban Board");
    expect(heading).toBeInTheDocument();

    const addTask = screen.getByText("Add Task");
    expect(addTask).toBeInTheDocument();
  });
  test("renders addTask", async () => {
    render(
      <BoardContext.Provider value={mockContextValues}>
        <KanbanBoard />
      </BoardContext.Provider>
    );
    const heading = screen.getByText("Kanban Board");
    expect(heading).toBeInTheDocument();

    const addTask = screen.getByText("Add Task");
    await userEvent.click(addTask);
    expect(addTask).toBeInTheDocument();
    screen.queryByTestId("mocked-add-task");
  });
});
