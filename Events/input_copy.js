/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/
const MODE = {
    IDLE: "idle",
    PRESS_DOWN: "press_down",
    MOVING: "moving",
    DOUBLE_CLICK_MOVING: "double_click_moving",
    ABORTING: "aborting"
}

const target = document.querySelector("#target");
const workspace = document.querySelector("#workspace");

var selected_object = "none";
var object_being_dragged_around;
var double_click_origin_position = [0, 0];
var double_click_mode = false;
var object_being_resized;
var touch_count = 0;
var touch_point_delta;
var origin_size_position;
let mode = MODE.IDLE;
var is_down = false;
var offset = [0,0];
var move_div; 

//mouse-click method, single click

// Get all the class div of target
let target_class = document.querySelectorAll('.target');
let target_array = Array.prototype.slice.call(target_class);

// Listen for click events on body
document.body.addEventListener('click', function (event) {
    click_or_tap(event);
});

function click_or_tap(event) {
    console.log("single click");
    if(!double_click_mode) {
        if(mode === MODE.PRESS_DOWN){
            if (target_array.includes(event.target)) {
    
                if(selected_object != "none") {
                    selected_object.style.backgroundColor = "red";
                }
                event.target.style.backgroundColor = "blue";
                selected_object = event.target;
            } else {
                if(selected_object != "none") {
                    selected_object.style.backgroundColor = "red";
                    selected_object = "none";
                }
            }
        } else if (mode === MODE.MOVING) {
            mode = MODE.IDLE;
        }
    } else{
        mode = MODE.IDLE;
    }

}

//Mouse down on a div and move, should not change color of the div
for(var i = 0; i < target_array.length; i++) {
    target_array[i].addEventListener('mousedown', function(event) {
        mode = MODE.PRESS_DOWN;
        move_div = event.target;
        is_down = true;
        offset = [
            move_div.offsetLeft - event.clientX,
            move_div.offsetTop - event.clientY
        ];
    }, true);  
}

document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    // keyPress(event);
    mousePosition = {
        x : event.clientX,
        y : event.clientY
    };
    if(!double_click_mode) {
        if (is_down) {
            move_div.style.left = (mousePosition.x + offset[0]) + 'px';
            move_div.style.top  = (mousePosition.y + offset[1]) + 'px';
            mode = MODE.MOVING;
        }
    } else {
        if (is_down) {
            object_being_dragged_around.style.left = (mousePosition.x + offset[0]) + 'px';
            object_being_dragged_around.style.top  = (mousePosition.y + offset[1]) + 'px';
        }  
    }
}, true);

document.addEventListener('mouseup', function() {
    is_down = false;
    offset = [0,0];
    move_div = "none";
}, true);


//Mouse double click
for(var i = 0; i < target_array.length; i++) {
    console.log(target_array[i]);
    target_array[i].addEventListener('dblclick', function(event) {
        
        console.log("inside double click");

        if(selected_object != "none") {
            selected_object.style.backgroundColor = "red";
        }
        event.target.style.backgroundColor = "blue";
        selected_object = event.target;

        mode = MODE.DOUBLE_CLICK_MOVING;
        object_being_dragged_around = event.target;
        is_down = true;
        double_click_mode = true;
        double_click_origin_position = [
            object_being_dragged_around.offsetLeft, 
            object_being_dragged_around.offsetTop
        ]
        offset = [
            object_being_dragged_around.offsetLeft - event.clientX,
            object_being_dragged_around.offsetTop - event.clientY
        ];
        // keyPress(event);
    }, true);  
}

document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        console.log("inside key press function");
        object_being_dragged_around.style.left = double_click_origin_position[0] + 'px';
        object_being_dragged_around.style.top  = double_click_origin_position[1] + 'px';
        mode = MODE.IDLE;
    }
  });

//One fingure tap
document.body.addEventListener('touchstart', function (event) {
    click_or_tap(event);
});








