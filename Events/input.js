/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/
const target = document.querySelector("#target");
const workspace = document.querySelector("#workspace");

// Get all the class div of target
let target_class = document.querySelectorAll('.target');
let target_array = Array.prototype.slice.call(target_class);

var selected_object = "none";
var object_of_mouse_down = "none";
var object_of_double_click = "none";
var event_now = "none";
var move = "none";

var mouse_down_offset = [0,0];
var double_click_offset = [0, 0];
var double_click_original_position = [0, 0];

var is_mouse_down = false;
var dragging = false;
var double_click_mode = false;


//Single mouse click
document.body.addEventListener('click', function (event) {
    single_click_tap_helper(event);
});

//One fingure tap
document.body.addEventListener('touchstart', function (event) {
    single_click_tap_helper(event);
});

function single_click_tap_helper(event) {
    if(event_now === "none") {
        change_color(event);
        is_mouse_down = false;
    } else {
        is_mouse_down = false;
        event_now = "none";
        dragging = false;
        mouse_down_offset = [0,0];
        object_of_mouse_down = "none";
    }
}

function change_color(event) {
    if (target_array.includes(event.target)) {
        if(selected_object != "none") {
            selected_object.style.backgroundColor = "red";
        }
        event.target.style.backgroundColor = "blue";
        selected_object = event.target;
    } else {
        if(selected_object != "none") {
            selected_object.style.backgroundColor = "red";
        }
        selected_object = "none";
    }
}

//Mouse down on a div and move, should not change color of the div
for(var i = 0; i < target_array.length; i++) {
    //add event listener to evey target div
    target_array[i].addEventListener('mousedown', function(event) {
        mouse_down_touch_start(event)
    }, true);  

    target_array[i].addEventListener('touchstart', function(event) {
        mouse_down_touch_start(event)
    }, true); 
}

function mouse_down_touch_start(event) {
    move = "press_down";
    is_mouse_down = true;
    object_of_mouse_down = event.target;
    mouse_down_offset = [
        object_of_mouse_down.offsetLeft - event.clientX,
        object_of_mouse_down.offsetTop - event.clientY
    ];  
}

// mouse move, update the postion of the div
document.body.addEventListener('mousemove', function(event) {
    console.log("inside mouse move");
    event.preventDefault();
    mousePosition = {
        x : event.clientX,
        y : event.clientY
    };
    move_update();
   
}, true);

document.body.addEventListener('touchmove', function(event) {
    console.log("inside mouse move");
    event.preventDefault();
    mousePosition = {
        x : event.clientX,
        y : event.clientY
    };
    move_update();
   
}, true);

function move_update() {
    if(is_mouse_down) {
        if(move === "press_down") {
            object_of_mouse_down.style.left = (mousePosition.x + mouse_down_offset[0]) + 'px';
            object_of_mouse_down.style.top  = (mousePosition.y + mouse_down_offset[1]) + 'px'; 
            dragging = true; 

        } else if(move === "double_click") {
            object_of_double_click.style.left = (mousePosition.x + double_click_offset[0]) + 'px';
            object_of_double_click.style.top  = (mousePosition.y + double_click_offset[1]) + 'px'; 
            dragging = true; 
        }  
    } 
}


// mouse up event, reset the MODE and offset
document.body.addEventListener('mouseup', function() {
    mouse_up_touch_end();
}, true);

document.body.addEventListener('touchend', function() {
    mouse_up_touch_end();
}, true);



function mouse_up_touch_end() {
    if(is_mouse_down) {
        if(dragging) {
            event_now = "press_down_and_move";
        }  
    }
}

//Mouse double click
for(var i = 0; i < target_array.length; i++) {
    target_array[i].addEventListener('dblclick', function(event) {
        move = "double_click";
        if(selected_object != "none") {
            selected_object.style.backgroundColor = "red";
        }
        event.target.style.backgroundColor = "blue";
        selected_object = event.target;

        object_of_double_click = event.target;
        is_mouse_down = true;
        double_click_mode = true;

        double_click_original_position = [
            object_of_double_click.offsetLeft, 
            object_of_double_click.offsetTop
        ]
        double_click_offset = [
            object_of_double_click.offsetLeft - event.clientX,
            object_of_double_click.offsetTop - event.clientY
        ];
    }, true);  
}

document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        console.log("inside key press function");
        if(move === "double_click") {
            object_of_double_click.style.left = double_click_original_position[0] + 'px';
            object_of_double_click.style.top  = double_click_original_position[1] + 'px';
            // set_cursor();
        } 
        
    }
  });

//   function set_cursor(){
//     console.log("inside set coursor");
//     const el = object_of_double_click;
//     console.log(el);
//     const selection = window.getSelection();
//     const range = document.createRange();
//     selection.removeAllRanges();
//     range.selectNodeContents(el);
//     range.collapse(false);
//     selection.addRange(range);
//     el.focus();
//   }
  
 














