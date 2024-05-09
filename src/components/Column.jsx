import "../style.css";
import { Droppable } from "react-beautiful-dnd";
import Container from "@mui/material/Container";
import { Task } from "./Task";

const Column = ({ title, tasks, id }) => {
  return (
    <Container className="column">
      <h3>{title}</h3>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: snapshot.isDraggingOver ? "lightblue" : "white",
              minHeight: "100px",
            }}
          >
            {tasks &&
              tasks.length > 0 &&
              tasks?.map((task, index) => {
                return (
                  <Task key={`${task.id} + ${id}`} task={task} index={index} />
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
