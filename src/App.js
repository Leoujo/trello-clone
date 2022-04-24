import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";

const inicialItems = [
  { id: "1", content: "Conteúdo 1" },
  { id: "2", content: "Conteúdo 2" },
  { id: "3", content: "Conteúdo 3" },
];

const inicialColumns = [
  {
    name: "To do",
    id: "123",
    items: inicialItems,
  },
];

function App() {
  const [columns, setColumns] = useState(inicialColumns);

  return (
    <div className="App">
      <DragDropContext>
        {inicialColumns.map((column) => (
          <Droppable droppableId={column.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <h1>{column.name}</h1>
                <div style={{ backgroundColor: "lightblue", width: 250, height: 500, padding: 10 }}>
                  {column.items.map((item, index) => (
                    <Draggable draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: "gray",
                            height: 40,
                            marginBottom: 10,
                            ...provided.draggableProps.style,
                          }}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;
