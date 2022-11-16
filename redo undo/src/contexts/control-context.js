import { createContext } from "react";

// create a context with default values
const controlContext = createContext({
  currMode: "",
  changeCurrMode: () => {},
  currBorderColor: "",
  changeCurrBorderColor: () => {},
  currBorderWidth: 1,
  changeCurrBorderWidth: () => {},
  getBorderWidthBeforeMove: () => {},
  getFinalBorderWidth: () => {},
  currFillColor: "",
  changeCurrFillColor: () => {},

  shapes: [],
  shapesMap: {},
  addShape: () => {},
  moveShape: () => {},
  moveShapeDown:() => {},
  moveShapeUp: () => {},
  selectedShapeId: "", // a string or undefined
  selectShape: () => {},
  deleteSelectedShape: () => {},

  undo: () => {},
  redo: () => {},
  undoButton: false,
  redoButton: false,
});

export default controlContext;
