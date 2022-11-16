import CommandObject from "./CommandObject";

//let cmdObject = new CreateCommandObject(this.undoHandler,shapeData, this.state.shapes, this.state.shapesMap, id);
export default class DeleteCommandObject extends CommandObject {
    constructor(undoHandler, shapesMap, selectedShapeId, shapes) {
      super(undoHandler, true);
      this.shapesMap = shapesMap
      this.setState = undoHandler.setState
      this.selectedShapeId = selectedShapeId
      this.shapes = shapes
      this.id = selectedShapeId
      this.setModeToSelect = undoHandler.setModeToSelect
      this.cleanRedoStack = undoHandler.cleanRedoStack
      // this.grayRedo = undoHandler.grayRedo
    }

    /* override to execute the action of this command.
     * pass in false for addToUndoStack if this is a command which is NOT
     * put on the undo stack, like Copy, or a change of selection or Save
     */
    
    execute() {
      let shapesMap = { ...this.shapesMap };
      shapesMap[this.id].visible = false;
      this.setState({ shapesMap, selectedShapeId: undefined });
      // this.cleanRedoStack()
      return true
    }
  
    /* override to undo the operation of this command
     */
    undo() {
      let shapesMap = { ...this.shapesMap };
      shapesMap[this.id].visible = true;
      this.setState({ shapesMap, selectedShapeId: this.id });
      this.setState({currFillColor: shapesMap[this.id].fillColor, currBorderColor:shapesMap[this.id].borderColor, currBorderWidth:shapesMap[this.id].borderWidth})
      this.setModeToSelect()

      // maybe also need to fix the palette to show this object's color?
    }
  
    /* override to redo the operation of this command, which means to
     * undo the undo. This should ONLY be called if the immediate
     * previous operation was an Undo of this command. Anything that
     * can be undone can be redone, so there is no need for a canRedo.
     */
    redo() {
      let shapesMap = { ...this.shapesMap };      
      shapesMap[this.id].visible = false;
      this.setState({ shapesMap, selectedShapeId: undefined }); 
      this.setModeToSelect()
      
      // maybe also need to fix the palette to show this object's color?
    }

    getCurrentSelectedShapeId(){
      return this.id
    }
  
    /* override to return true if this operation can be repeated in the
     * current context
     */
    canRepeat() {
    //   return selectedObj !== null;
    }
  
    /* override to execute the operation again, this time possibly on
     * a new object. Thus, this typically uses the same value but a new
     * selectedObject.
     */
    repeat() {
    //   if (selectedObj !== null) {
    //     this.targetObject = selectedObj; // get new selected obj
    //     this.oldValue = selectedObj.fillColor; // object's current color
    //     // no change to newValue since reusing the same color
    //     selectedObj.fillColor = this.newValue; // actually change
  
    //     // Note that this command object must be a NEW command object so it can be
    //     // registered to put it onto the stack
    //     if (this.addToUndoStack) this.undoHandler.registerExecution({ ...this });
    //   }
    }
  }



