import React from "react";
import { render, screen } from "@testing-library/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BoardContext } from "../context/app";
import { Task } from "../components/Task";
import userEvent from "@testing-library/user-event";
// Mock the context provider
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

describe("Task component", () => {
  test("Renders task correctly", () => {
    const task = { id: "1", title: "Task 1", description: "Description 1" };
    const index = 0;

    render(
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    className="task"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task task={task} index={index} />
                  </div>
                )}
              </Draggable>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
  });

  test("Handles delete button click", async () => {
    const task = { id: "1", title: "Task 1", description: "Description 1" };
    const index = 0;

    render(
      <BoardContext.Provider value={mockContextValues}>
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable
                  draggableId={`${task.id}`}
                  key={task.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      className="task"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task task={task} index={index} />
                    </div>
                  )}
                </Draggable>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </BoardContext.Provider>
    );
    const deleteBtn = screen.getByText("Delete");
    await userEvent.click(deleteBtn);
    expect(mockContextValues.setTodoList).toHaveBeenCalled();
  });

  test("Handles edit button click", async () => {
    const task = { id: "1", title: "Task 1", description: "Description 1" };
    const index = 0;

    render(
      <BoardContext.Provider value={mockContextValues}>
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable
                  draggableId={`${task.id}`}
                  key={task.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      className="task"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task task={task} index={index} />
                    </div>
                  )}
                </Draggable>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </BoardContext.Provider>
    );
    const editBtn = screen.getByText("Edit");
    await userEvent.click(editBtn);
    expect(mockContextValues.setTitle).toHaveBeenCalledWith("Task 1");
    expect(mockContextValues.setDescription).toHaveBeenCalledWith(
      "Description 1"
    );
    expect(mockContextValues.setShowAddTaskTemplate).toHaveBeenCalledWith(true);
  });
});
