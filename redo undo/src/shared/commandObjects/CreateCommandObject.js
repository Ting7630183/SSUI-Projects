import CommandObject from "./CommandObject";

//let cmdObject = new CreateCommandObject(this.undoHandler,shapeData, this.state.shapes, this.state.shapesMap, id);
export default class CreateCommandObject extends CommandObject {
    constructor(undoHandler, shapeData, shapes, shapesMap, id) {
      super(undoHandler, true);
      this.shapeData = shapeData
      this.shapes = shapes
      this.shapesMap = shapesMap
      this.id = id
      this.setState = undoHandler.setState
      this.deleteHelper = undoHandler.deleteHelper
      this.undoDeleteHelper = undoHandler.undoDeleteHelper
      this.setModeToSelect = undoHandler.setModeToSelect
      this.cleanRedoStack = undoHandler.cleanRedoStack
      this.grayRedo = undoHandler.grayRedo
    }

    /* override to execute the action of this command.
     * pass in false for addToUndoStack if this is a command which is NOT
     * put on the undo stack, like Copy, or a change of selection or Save
     */
    execute() {
    let shapes = [...this.shapes];
    let shapesMap = { ...this.shapesMap };
    let shapeData = this.shapeData
    const id = this.id;
    shapesMap[id] = {
      ...shapeData,
      id,
    };
    shapes.push(id);
    this.setState({ shapes: shapes, shapesMap: shapesMap, selectedShapeId: undefined });
    this.shapesMap = shapesMap
    this.shapes = shapes
    this.cleanRedoStack()
    this.grayRedo()
    return true; 
    }
  
    /* override to undo the operation of this command
     */
    undo() {
      this.deleteHelper(this.id)
      this.setModeToSelect()
      // maybe also need to fix the palette to show this object's color?
    }
  
    /* override to redo the operation of this command, which means to
     * undo the undo. This should ONLY be called if the immediate
     * previous operation was an Undo of this command. Anything that
     * can be undone can be redone, so there is no need for a canRedo.
     */
    redo() {
      this.undoDeleteHelper(this.id)
      this.setState({ selectedShapeId: this.id }); 
      this.setModeToSelect()
      
      // maybe also need to fix the palette to show this object's color?
    }

    //TODO: how to deal with selectedId for create
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



