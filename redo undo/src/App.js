import React, { Component } from "react";

import ControlPanel from "./containers/ControlPanel/ControlPanel";
import Workspace from "./containers/Workspace/Workspace";

import ControlContext from "./contexts/control-context";
import { genId, defaultValues } from "./shared/util";

import "./App.css";
import ChangeFillColorCommandObject from "./shared/commandObjects/ChangeFillColorCommandObject";
import ChangeBorderWidthCommandObject from "./shared/commandObjects/ChangeBorderWidthCommandObject";
import ChangeBorderColorCommandObject from "./shared/commandObjects/ChangeBorderColorCommandObject";
import MoveCommandObject from "./shared/commandObjects/MoveCommandObject";
import CreateCommandObject from "./shared/commandObjects/CreateCommandObject";
import DeleteCommandObject from "./shared/commandObjects/DeleteCommandObject";

class App extends Component {
  state = {
    // controls
    currMode: defaultValues.mode,
    currBorderColor: defaultValues.borderColor,
    currBorderWidth: defaultValues.borderWidth,
    finalBorderWidth: defaultValues.borderWidth,
    currFillColor: defaultValues.fillColor,
    oldBorderWidth: defaultValues.borderWidth,
    orginalMovePosition: {},

    // workspace
    shapes: [],
    shapesMap: {},
    selectedShapeId: undefined,

    // handling undo/redo
    commandList: [],
    redoCommandList: [],
    currCommand: -1,
    undoButton: false,
    redoButton:false,
  };

  constructor() {
    super();
    this.setState = this.setState.bind(this); 


    /*
     * pass this undoHandler into command object constructors:
     *  e.g. let cmdObj = new ChangeFillColorCommandObject(this.undoHandler);
     */
    this.undoHandler = {
      registerExecution: this.registerExecution,
      updateShape: this.updateShape,
      deleteHelper: this.deleteHelper,
      undoDeleteHelper: this.undoDeleteHelper,
      setState: this.setState,
      currFillColor: this.state.currFillColor,
      setModeToSelect: this.setModeToSelect,
      cleanRedoStack: this.cleanRedoStack,
      grayRedo: this.grayRedo,
    };
  }
 
  //Implement undo to undo previous operation
  undo = () => {
    if(this.state.commandList.length !== 0) {
      var commandObject = this.state.commandList.pop()
      
      this.state.redoCommandList.push(commandObject)
      this.state.currCommand = commandObject

      if(commandObject != null) {
        commandObject.undo()
        let selectedShapeId = commandObject.getCurrentSelectedShapeId()
        // this.setState(selectedShapeId)
        this.state.selectedShapeId = selectedShapeId
      } 

      if(this.state.commandList.length === 0) {
        this.state.undoButton = true
      }
      this.ungrayRedo()
    } 
  };

  //Implement redo to redo previous undo
  redo = () => {
    if(this.state.redoCommandList.length !== 0) {
      var commandObject = this.state.redoCommandList.pop()
      this.state.commandList.push(commandObject)
      commandObject.redo()
      let selectedShapeId = commandObject.getCurrentSelectedShapeId()
      this.state.selectedShapeId = selectedShapeId
      this.ungrayUndo()
      if(this.state.redoCommandList.length === 0) {
        this.state.redoButton = true
      }
    }
  };

  //A helper function to get the current Object being selected. 
  getCurrentObject = () =>{
    if(this.state.shapes.length !== 0) {
      if (this.state.selectedShapeId) {
        return this.state.shapesMap[this.state.selectedShapeId];;
      }
    } 
  };

  //A helper function to grey out the undo button
  ungrayUndo = () => {
    if(this.state.commandList.length !== 0) {
      this.state.undoButton = false
    }
  }

  //A helper function to grey out the redo button
  ungrayRedo = () =>{
    if(this.state.redoCommandList.length !== 0) {
      this.state.redoButton = false
    }
  }

  grayRedo = () =>{
    if(this.state.redoCommandList.length === 0) {
      this.state.redoButton = true
    }
  }

  setModeToSelect = () =>{
    this.state.currMode = "select"
  }

  cleanRedoStack = () =>{
    this.state.redoCommandList = []
  }

  // add the shapeId to the array, and the shape itself to the map
  addShape = (shapeData) => {
    const id = genId();
    let cmdObject = new CreateCommandObject(this.undoHandler, shapeData, this.state.shapes, this.state.shapesMap, id);
    if(cmdObject.execute()){
      this.state.commandList.push(cmdObject)
    }
    this.ungrayUndo()
  };

  //A helper function to reverse create, that is to make the created object become invisible.
  deleteHelper = (id) => {
    let shapesMap = { ...this.state.shapesMap };
    shapesMap[id].visible = false;
    this.setState({ shapesMap, selectedShapeId: undefined });
  }

  //A helper function to reverse delete of a create object, that is to make the created object visible again.
  undoDeleteHelper = (id) => {
    let shapesMap = { ...this.state.shapesMap };
    shapesMap[id].visible = true;
    this.setState({ shapesMap, selectedShapeId: undefined });
    this.setState({currFillColor: shapesMap[id].fillColor, currBorderColor:shapesMap[id].borderColor, currBorderWidth:shapesMap[id].borderWidth})
  }

   // deleting a shape sets its visibility to false, rather than removing it
   deleteSelectedShape = () => {  
    let cmdObject = new DeleteCommandObject(this.undoHandler, this.state.shapesMap, this.state.selectedShapeId, this.state.shapes);
    if(cmdObject.execute()){
      this.state.commandList.push(cmdObject)
    }
    this.ungrayUndo()
  };

  // get the shape by its id, and update its properties
  updateShape = (shapeId, newData) => {
    let shapesMap = { ...this.state.shapesMap };
    let targetShape = shapesMap[shapeId];
    shapesMap[shapeId] = { ...targetShape, ...newData };
    this.setState({ shapesMap });
    this.ungrayUndo()
  };

  //Chnage the mode of the palette
  changeCurrMode = (mode) => {
    if (mode === "line") {
      this.setState({
        currMode: mode,
        currBorderColor: defaultValues.borderColor,
      });
    } else {
      this.setState({ currMode: mode });
    }
  };

  //Change the selected object's border color
  changeCurrBorderColor = (borderColor) => {
    if(this.state.currMode === "select") {
      let oldColor = this.getCurrentObject().borderColor;
      let cmdObject = new ChangeBorderColorCommandObject(this.undoHandler, oldColor, borderColor, this.state.selectedShapeId);
      if(cmdObject.execute()){
        this.state.commandList.push(cmdObject)
      }
      this.ungrayUndo()
    } else{
      this.setState({ currBorderColor: borderColor });
      if (this.state.selectedShapeId) {
       this.updateShape(this.state.selectedShapeId, { borderColor });
      }
    }
  };

  //Set the border width of the selected object when moving the slider of border width
  changeCurrBorderWidth = (borderWidth) => {
    this.setState({ currBorderWidth: borderWidth });
    if (this.state.selectedShapeId) {
      this.updateShape(this.state.selectedShapeId, { borderWidth });
    }
  };

  //Get the border width of the selected object before the slider is moved
  getBorderWidthBeforeMove = (widthBefore) =>{
    this.state.oldBorderWidth = widthBefore
  }

  //Get the border width of the selected object after mouse up from the slider
  getFinalBorderWidth = (borderWidth) => {
    if(this.state.currMode === "select") {
      let oldWidth = this.state.oldBorderWidth
      let cmdObject = new ChangeBorderWidthCommandObject(this.undoHandler, oldWidth, borderWidth, this.state.selectedShapeId);
      if(cmdObject.execute()){
        this.state.commandList.push(cmdObject)
      }
      this.ungrayUndo()
    }  
  };

  //Get the selected object's original position when mouse down on the object
  moveShapeDown = (targetId) => {
    let shapesMap = { ...this.state.shapesMap };
    let targetShape = shapesMap[targetId];
    let init = targetShape.initCoords
    let final = targetShape.finalCoords
    let origin ={initCoords: init, finalCoords:final}
    this.state.orginalMovePosition = origin
  }

  //Update the position of the selected object when the objected is being moved
  moveShape = (newData) => {
    if (this.state.selectedShapeId) {
      this.updateShape(this.state.selectedShapeId, newData);
    }
  };
  
  //When moving a shape and the mouse up, trigger this event to create only one object in one movement
  moveShapeUp = (newData) => {
    let cmdObject = new MoveCommandObject(this.undoHandler,this.state.orginalMovePosition, newData, this.state.selectedShapeId);
    if(cmdObject.execute()){
      this.state.commandList.push(cmdObject)
    }
    this.ungrayUndo()
  };

  //Change the current fill color of the selected object
  changeCurrFillColor = (fillColor) => {   
    if(this.state.currMode === "select") {
      let oldColor = this.getCurrentObject().fillColor
      let cmdObject = new ChangeFillColorCommandObject(this.undoHandler, oldColor, fillColor, this.state.selectedShapeId);
      if(cmdObject.execute()){
        this.state.commandList.push(cmdObject)
        this.ungrayUndo()
      }
    } else {
      this.setState({ currFillColor: fillColor });
      if (this.state.selectedShapeId) {
        this.updateShape(this.state.selectedShapeId, { fillColor });
      }
    }
  };

  render() {
    const {
      currMode,
      currBorderColor,
      currBorderWidth,
      currFillColor,
      shapes,
      shapesMap,
      selectedShapeId,
      undoButton,
      redoButton,
    } = this.state;

    // update the context with the functions and values defined above and from state
    // and pass it to the structure below it (control panel and workspace)
    return (
      <React.Fragment>
        <ControlContext.Provider
          value={{
            currMode,
            changeCurrMode: this.changeCurrMode,
            currBorderColor,
            changeCurrBorderColor: this.changeCurrBorderColor,
            currBorderWidth,
            changeCurrBorderWidth: this.changeCurrBorderWidth,
            getFinalBorderWidth: this.getFinalBorderWidth,
            getBorderWidthBeforeMove: this.getBorderWidthBeforeMove,
            currFillColor,
            changeCurrFillColor: this.changeCurrFillColor,

            shapes,
            shapesMap,
            addShape: this.addShape,
            moveShape: this.moveShape,
            moveShapeDown: this.moveShapeDown,
            moveShapeUp: this.moveShapeUp,
            selectedShapeId,
            selectShape: (id) => {
              this.setState({ selectedShapeId: id });
              if (id) {
                const { borderColor, borderWidth, fillColor } = shapesMap[
                  shapes.filter((shapeId) => shapeId === id)[0]
                ];
                this.setState({
                  currBorderColor: borderColor,
                  currBorderWidth: borderWidth,
                  currFillColor: fillColor,
                });
              }
            },
            deleteSelectedShape: this.deleteSelectedShape,

            undo: this.undo,
            redo: this.redo,
            undoButton,
            redoButton
          }}
        >
          <ControlPanel />
          <Workspace />
        </ControlContext.Provider>
      </React.Fragment>
    );
  }
}

export default App;
