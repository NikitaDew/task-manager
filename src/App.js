import "./App.css";
import KanbanBoard from "./components/KanbanBoard";
import { Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<KanbanBoard />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
