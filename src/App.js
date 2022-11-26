import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { Box, Button, Paper, Typography } from "@mui/material";
import Navbar from "./components/Navbar";
import AddIcon from "@mui/icons-material/Add";

const inicialItems = [
  { id: "111", content: "Conteúdo 1" },
  { id: "222", content: "Conteúdo 2" },
  { id: "333", content: "Conteúdo 3" },
];

const inicialColumns = [
  {
    name: "To do",
    id: "123",
    items: inicialItems,
  },
  {
    name: "Doing",
    id: "456",
    items: [],
  },
  {
    name: "Done",
    id: "789",
    items: [],
  },
];

function App() {
  const [columns, setColumns] = useState(inicialColumns);

  const onDragEnd = (result) => {
    console.log(result);
    // var sourceColumnItems = columns[0].items;
    var sourceColumnItems = [];
    var destinationColumnItems = [];
    var draggedItem = {};

    var sourceColumnId = 0;
    var destinationColumnId = 0;

    for (var i in columns) {
      if (columns[i].id == result.source.droppableId) {
        sourceColumnItems = columns[i].items;
        sourceColumnId = i;
      } else if (columns[i].id == result.destination.droppableId) {
        destinationColumnItems = columns[i].items;
        destinationColumnId = i;
      }
    }
    // console.log(sourceColumnItems)
    // console.log(destinationColumnItems)

    for (var i in sourceColumnItems) {
      if (sourceColumnItems[i].id == result.draggableId) {
        draggedItem = sourceColumnItems[i];
      }
    }
    // Excluí o objeto arrastado.
    var filteredSourceColumnItems = sourceColumnItems.filter((item) => item.id != result.draggableId);

    // Adicionar o mesmo na nova posição.
    if (result.source.droppableId == result.destination.droppableId) {
      filteredSourceColumnItems.splice(result.destination.index, 0, draggedItem);

      // Mudar o state
      var columnsCopy = JSON.parse(JSON.stringify(columns));
      columnsCopy[sourceColumnId].items = filteredSourceColumnItems;
      setColumns(columnsCopy);
    } else {
      destinationColumnItems.splice(result.destination.index, 0, draggedItem);
      // Mudar o state
      var columnsCopy = JSON.parse(JSON.stringify(columns));
      columnsCopy[sourceColumnId].items = filteredSourceColumnItems;
      columnsCopy[destinationColumnId].items = destinationColumnItems;
      setColumns(columnsCopy);
    }
  };

  return (
    <Box sx={{ backgroundImage: "linear-gradient(45deg, #8587f3 30%, #fd84ae 100%)" }}>
      <Navbar />
      <Box display="flex" justifyContent="center" height="100vh">
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((column) => (
            <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Droppable droppableId={column.id} key={column.id}>
                {(provided) => (
                  <Box style={{ backgroundColor: "#ebebf1", width: 400, height: "fit-content", padding: 10, margin: 10 }}>
                    <Typography variant="h4">{column.name}</Typography>
                    <Box ref={provided.innerRef} width="100%" height="100%">
                      {column.items.map((item, index) => (
                        <Draggable draggableId={item.id} index={index} key={item.id}>
                          {(provided) => (
                            <Paper
                              elevation={2}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              style={{
                                height: 40,
                                marginTop: 10,
                                padding: 5,
                                ...provided.draggableProps.style,
                              }}
                            >
                              {item.content}
                            </Paper>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      <Button sx={{ marginTop: "10px", color:  "#959dab" }} size="large" startIcon={<AddIcon />}>
                        CARD
                      </Button>
                    </Box>
                  </Box>
                )}
              </Droppable>
            </Box>
          ))}
        </DragDropContext>
      </Box>
    </Box>
  );
}

export default App;
