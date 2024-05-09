import React from "react";
import { render, screen } from "@testing-library/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "../components/Column";

// Mock the Task component
jest.mock("./Task", () => {
  return function MockTask(props) {
    return (
      <div data-testid="mock-task">
        {props.task.title} - {props.task.id}
      </div>
    );
  };
});

describe("Column", () => {
  test("Renders tasks and droppable area correctly", () => {
    const tasks = [
      { id: "task1", title: "Task 1" },
      { id: "task2", title: "Task 2" },
      { id: "task3", title: "Task 3" },
    ];

    render(
      <DragDropContext>
        <Droppable droppableId="test-droppable" type="task">
          {(provided) => (
            <div
              data-testid="droppable-area"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Column title="Test Column" tasks={tasks} id="test-column" />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );

    // Check if the tasks are rendered correctly
    tasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });

    expect(screen.getByText("Test Column")).toBeInTheDocument();
    expect(screen.getByTestId("droppable-area")).toBeInTheDocument();
  });
  test("Renders todo and done column", () => {
    const todoTasks = [{ id: "task1", title: "Task 1" }];
    const doneTasks = [
      { id: "task2", title: "Task 2" },
      { id: "task3", title: "Task 3" },
    ];

    render(
      <DragDropContext>
        <Droppable droppableId="test-droppable" type="task">
          {(provided) => (
            <div
              data-testid="droppable-area"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Column title="Todo" tasks={todoTasks} id="todo" />
              <Column title="Done" tasks={doneTasks} id="done" />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
    todoTasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
    doneTasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
    // Check if the title is rendered correctly
    expect(screen.getByText("Todo")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();

    expect(screen.getByTestId("droppable-area")).toBeInTheDocument();
  });
});
