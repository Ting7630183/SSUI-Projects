
console.log("enter svg layer")
const space = document.querySelector(".workarea-svg");
var mode ="rect"
var border_color = "black"
var border_width = "3"
var fill_color = "lightgreen"
var select_mode = "none";
var selected_boarder_color_button = "none"
var selected_fill_color_button = "none"
var selected_svg = "none"
var drag_object = "none"
var mouse_down = false
var mouse_down_offset = [0,0];

disable_delete()
/* Disable the delete button */
function disable_delete() {
  const delete_button = document.querySelector(".delete-button");
  delete_button.disabled = true;
  delete_button.backgroundColor = "gray"
}

/* Enable the delete button */
function enable_delete(){
  const delete_button = document.querySelector(".delete-button");
  delete_button.disabled = false;
  delete_button.backgroundColor = "none"
}

/* Disable the None button in border color */
function disable_border_color_none() {
  const border_color_none_button = document.querySelector("#color-none1");
  border_color_none_button.disabled = true;
  border_color_none_button .backgroundColor = "gray"
}

/* Enable the None button in border color */
function enable_border_color_none() {
  const border_color_none_button = document.querySelector("#color-none1");
  border_color_none_button.disabled = false;
  border_color_none_button .backgroundColor = "none"
}

/* Disable the None button in fill color */
function disable_fill_color_none() {
  const fill_color_none_button = document.querySelector("#color-none2");
  fill_color_none_button.disabled = true;
  fill_color_none_button .backgroundColor = "gray"
}

/* Enable the None button in fill color */
function enable_fill_color_none() {
  const fill_color_none_button = document.querySelector("#color-none2");
  fill_color_none_button.disabled = false;
  fill_color_none_button .backgroundColor = "none"
}

/* A helper function to change the frame of a button */
function change_frame(parent) {
  parent.style.borderWidth = "2px";
  parent.style.borderStyle = "solid";
  parent.style.borderColor = "blue";
  parent.style.borderRadius = "4px";
}

set_default_border_and_fill()
/* Set the default border_color and fill_color */
function set_default_border_and_fill(){
    const black = document.querySelector("#color-black1");
    const black_parent = black.parentNode;
    change_frame(black_parent)
    selected_boarder_color_button = black;

    const green = document.querySelector("#color-green2");
    const green_parent = green.parentNode;
    change_frame(green_parent);
    selected_fill_color_button = green;
}

const rectangle_mode_div = document.querySelector("#rectange_mode");
const circle_mode_div = document.querySelector("#circle_mode");

/* Get the seleted mode from the palette */
const mode_button = document.querySelectorAll(".mode-button");
let mode_buttons = Array.prototype.slice.call(mode_button);

for(var i = 0; i < mode_buttons.length; i++) {
    //add event listener to evey target div
    mode_buttons[i].addEventListener('click', function(event) {
        mode = event.target.value
        if(select_mode != "none") {
            select_mode.parentNode.style.borderStyle = "none"
        }
        select_mode = event.target;
        console.log("mode is " + mode)
        const parent = event.target.parentNode;
        change_frame(parent)
        
        if(event.target.value === "rect" || event.target.value === "circle") {
            event.target.style.backgroundColor = fill_color;
            event.target.style.borderStyle = "solid";
            event.target.style.borderColor = border_color;
            event.target.style.borderWidth = "2px";
        }
    });  
}

/* Get the seleted border color from the palette */
const boarder_color_button = document.querySelectorAll(".boarder-color");
let boarder_color_buttons = Array.prototype.slice.call(boarder_color_button);

for(var i = 0; i < boarder_color_buttons.length; i++) {
    //add event listener to evey target div 
    boarder_color_buttons[i].addEventListener('click', function(event) {
        border_color = event.target.value
        if(selected_boarder_color_button != "none") {
            selected_boarder_color_button.parentNode.style.borderStyle = "none"
        }
        /* Disable fill color if border color is none */
        if(border_color === "none") {
          disable_fill_color_none()
        } else{
          enable_fill_color_none();
        }
        rectangle_mode_div.style.borderColor = border_color
        circle_mode_div.style.borderColor = border_color

        selected_boarder_color_button = event.target;
        const parent = event.target.parentNode;
        change_frame(parent)

        match_selected_border_color(border_color);
    });  
}

/* A helper function to change the seleted object's border color by clicking on palette's border color */
function match_selected_border_color(color) {
  if(mode === "cursor") {
    if(selected_svg != "none") {
      selected_svg.setAttribute('stroke', color);
    }
  }
}

/* Get the boarder width from the palette */
const boarder_width_slider = document.querySelector(".slider")
boarder_width_slider.addEventListener('mousemove', function(event) {
    border_width = event.target.value; 
    const slider_number = document.querySelector(".slider-number")
    slider_number.innerHTML = event.target.value;
    match_selected_border_width(border_width)
})

/* A helper function to change the seleted object's border color by clicking on palette's fill color */
function match_selected_border_width(num) {
  if(mode === "cursor") {
    if(selected_svg != "none") {
      selected_svg.setAttribute('stroke-width', num);
    }
  }
}

/* Get the fill color from the palette */
const fill_color_button = document.querySelectorAll(".fill-color");
let fill_color_buttons = Array.prototype.slice.call(fill_color_button);

for(var i = 0; i < fill_color_buttons.length; i++) {
    //add event listener to evey target div
    fill_color_buttons[i].addEventListener('click', function(event) {
        fill_color = event.target.value
        if(selected_fill_color_button != "none") {
            selected_fill_color_button.parentNode.style.borderStyle = "none"
        }

        if(fill_color === "none") {
          disable_border_color_none()
        }else{
          enable_border_color_none()
        }
        selected_fill_color_button = event.target;
        
        rectangle_mode_div.style.backgroundColor = fill_color
        circle_mode_div.style.backgroundColor = fill_color

        const parent = event.target.parentNode;
        change_frame(parent)
        match_selected_fill_color(fill_color)
    });  
}

/* A helper function to change the seleted object's border color by clicking on palette's fill color */
function match_selected_fill_color(color) {
  if(mode === "cursor") {
    if(selected_svg != "none") {
      selected_svg.setAttribute('fill', color);
    }
  }
}

/* A helper function to draw a svg */
const svg = space
const svgPoint = (elem, x, y) => {
  const p = svg.createSVGPoint();
  p.x = x;
  p.y = y;
  return p.matrixTransform(elem.getScreenCTM().inverse());
};

/* Draw rect or circle according to the selection on the palette */
svg.addEventListener('mousedown', (event) => {
    if(mode === "rect") {
        draw_rect(event)
    }else if(mode === "circle") {
        draw_circle(event)
    } 
});

/* The method to draw a rectangle, the starting point is the orgin point and the end point is where we realease the mouse */
function draw_rect(event) {
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  const start = svgPoint(svg, event.clientX, event.clientY);
  const drawRect = (e) => {
    const p = svgPoint(svg, e.clientX, e.clientY);
    const w = Math.abs(p.x - start.x);
    const h = Math.abs(p.y - start.y);
    if (p.x > start.x) {
      p.x = start.x;
    }
    if (p.y > start.y) {
      p.y = start.y;
    }
    rect.setAttributeNS(null, 'x', p.x);
    rect.setAttributeNS(null, 'y', p.y);
    rect.setAttributeNS(null, 'width', w);
    rect.setAttributeNS(null, 'height', h);
    rect.setAttribute( 'fill', fill_color);
    rect.setAttribute( 'stroke', border_color);
    rect.setAttribute( 'stroke-width', border_width);
    svg.appendChild(rect);
  };

  const endDraw = (e) => {
    svg.removeEventListener('mousemove', drawRect);
    svg.removeEventListener('mouseup', endDraw);
  };
  
  svg.addEventListener('mousemove', drawRect);
  svg.addEventListener('mouseup', endDraw);
}

/* The method to draw an ellipse, the starting point is the orgin point and the end point is where we release the mouse */
function draw_circle(event) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    const start = svgPoint(svg, event.clientX, event.clientY);
    const drawCircle = (e) => {
    const p = svgPoint(svg, e.clientX, e.clientY);
    const w = Math.abs(p.x - start.x);
    const h = Math.abs(p.y - start.y);
    if (p.x > start.x) {
      p.x = start.x;
    }
    if (p.y > start.y) {
      p.y = start.y;
    }
    circle.setAttribute( 'cx', p.x );
    circle.setAttribute( 'cy', p.y );
    circle.setAttribute( 'rx', w );
    circle.setAttribute( 'ry', h );

    circle.setAttribute( 'fill', fill_color);
    circle.setAttribute( 'stroke', border_color);
    circle.setAttribute( 'stroke-width', border_width);
    svg.appendChild(circle);
  };

  const endDraw = (e) => {
    svg.removeEventListener('mousemove', drawCircle);
    svg.removeEventListener('mouseup', endDraw);
  };
  
  svg.addEventListener('mousemove', drawCircle);
  svg.addEventListener('mouseup', endDraw);
}

/* Implement the select function. If a object is selected, add shadow to the object. If click on the background,
the object is de-selected */
const cursor = document.querySelector("#arrow_mode");
cursor.addEventListener('click', function(event){
  var svg_children = space.children;
  let svg_childrenn = Array.prototype.slice.call(svg_children);

  //add click event lisener for every svg div
  space.addEventListener('click', function(event){
    
    if (svg_childrenn.includes(event.target)) {
      enable_delete()
      if(selected_svg != "none") {
        selected_svg.removeAttribute("filter", `url(#f2)`);
      }
      selected_svg = event.target;
      selected_svg.setAttribute("filter", `url(#f2)`);
      change_palette_by_selected_object(selected_svg)  
    } else {
      if(selected_svg != "none") {
        selected_svg.removeAttribute("filter", `url(#f2)`);
      }
      console.log("click on the background")
      selected_svg = "none";
      disable_delete()
    }
  })
  drag(svg_childrenn)
})

/* Implement dragging functionality for all svg elements */
var click = false; // flag to indicate when shape has been clicked
var clickX, clickY; // stores cursor location upon first click
var moveX = 0,
  moveY = 0; // keeps track of overall transformation
var lastMoveX = 0,
  lastMoveY = 0; // stores previous transformation (move)
var currentTarget = null


function drag(svg_childrenn) {
  for(var i = 0; i < svg_childrenn.length; i++) {
    svg_childrenn[i].addEventListener('mousedown', function(evt){
      if(drag_object != "none") {
        drag_object.removeAttribute("filter", `url(#f2)`);
      }
      click = true;
      clickX = evt.clientX;
      clickY = evt.clientY;
      currentTarget = evt.target
      svg.addEventListener("mousemove", move)
      svg.addEventListener("mouseup", endMove)
   })
  } 
}


function move(evt) {
  evt.preventDefault();
  if (click) {
    moveX = lastMoveX + (evt.clientX - clickX);
    moveY = lastMoveY + (evt.clientY - clickY);
    currentTarget.setAttribute("transform", "translate(" + moveX + "," + moveY + ")");
  }
}

function endMove(evt) {
  click = false;
  lastMoveX = 0;
  lastMoveY = 0;
  moveX = 0; 
  moveY = 0;
  svg.removeEventListener("mousemove", move)
  svg.removeEventListener("mouseup", endMove)
}

/* A helper function to change the palette according to the selected object */
function change_palette_by_selected_object(selected_obj) {
  var selected_boarder_color_button_parent = selected_boarder_color_button.parentNode;
  selected_boarder_color_button_parent.style.borderStyle = "none";
  
  if(selected_fill_color_button != "none") {
    var selected_fill_color_button_parent = selected_fill_color_button.parentNode;
    selected_fill_color_button_parent.style.borderStyle = "none"
  }

  var border_color = selected_obj.getAttribute("stroke");
  change_the_palette_border_color_frame(border_color)
  var fill_color = selected_obj.getAttribute("fill");
  change_the_palette_fill_color_frame(fill_color)
  var slider_number = selected_obj.getAttribute("stroke-width");
  change_the_slider_number(slider_number)
}

/* A helper function to change the palette's border_width with the selected object's border width */
function change_the_slider_number(slider_number){
  const number = document.querySelector(".slider-number")
  number.innerHTML = slider_number;
  const slider_bar = document.querySelector(".slider")
  slider_bar.value = slider_number;
}

/* change the palette's fill color to match with the selected object's fill color */
function change_the_palette_fill_color_frame(fill_color){
  switch(fill_color){
    case "none":
      const none1 = document.querySelector("#color-none2");
      selected_fill_color_button = none1;
      const none1_parent = none1.parentNode;
      change_frame(none1_parent)
      break;
    case "white":
      const white1 = document.querySelector("#color-white2");
      selected_fill_color_button = white1;
      white1_parent = white1.parentNode;
      change_frame(white1_parent)
      break;
    case "lightgray":
      const gray1 = document.querySelector("#color-gray2");
      selected_fill_color_button = gray1;
      gray1_parent = gray1.parentNode;
      change_frame(gray1_parent)
      break;
    case "black":
      const black = document.querySelector("#color-black2");
      selected_fill_color_button = black;
      black_parent = black.parentNode;
      change_frame(black_parent);
      break;
    case "yellow":
      const yellow = document.querySelector("#color-yellow2");
      selected_fill_color_button = yellow;
      yellow_parent = yellow.parentNode;
      change_frame(yellow_parent);
      break;
    case "red":
      const red = document.querySelector("#color-red2");
      selected_fill_color_button = red;
      red_parent = red.parentNode;
      change_frame(red_parent);
      break;
    case "lightblue":
      const blue = document.querySelector("#color-blue2");
      selected_fill_color_button = blue;
      blue_parent = blue.parentNode;
      change_frame(blue_parent);
      break;
    case "lightgreen":
      const green = document.querySelector("#color-green2");
      selected_fill_color_button = green;
      green_parent = green.parentNode;
      change_frame(green_parent);
      break;
  }
}


/* change the palette's border color to match with the selected object's border color */
function change_the_palette_border_color_frame(border_color){
  switch (border_color) {
    case "none":
      const none1 = document.querySelector("#color-none1");
      selected_boarder_color_button = none1;
      const none1_parent = none1.parentNode;
      change_frame(none1_parent)
      break;
    case "white":
      const white1 = document.querySelector("#color-white1");
      selected_boarder_color_button = white1;
      white1_parent = white1.parentNode;
      change_frame(white1_parent)
      break;
    case "lightgray":
      const gray1 = document.querySelector("#color-gray1");
      selected_boarder_color_button = gray1;
      gray1_parent = gray1.parentNode;
      change_frame(gray1_parent)
      break;
    case "black":
      const black = document.querySelector("#color-black1");
      selected_boarder_color_button = black;
      black_parent = black.parentNode;
      change_frame(black_parent);
      break;
    case "yellow":
      const yellow = document.querySelector("#color-yellow1");
      selected_boarder_color_button = yellow;
      yellow_parent = yellow.parentNode;
      change_frame(yellow_parent);
      break;
    case "red":
      const red = document.querySelector("#color-red1");
      selected_boarder_color_button = red;
      red_parent = red.parentNode;
      change_frame(red_parent);
      break;
    case "lightblue":
      const blue = document.querySelector("#color-blue1");
      selected_boarder_color_button = blue;
      blue_parent = blue.parentNode;
      change_frame(blue_parent);
      break;
    case "lightgreen":
      const green = document.querySelector("#color-green1");
      selected_boarder_color_button = green;
      green_parent = green.parentNode;
      change_frame(green_parent);
      break;
  }
}

/*Implement the delete function, if an object is selected, we click delete button, this object will be deleted, 
if on object is selected, nothing would be deleted*/
const delete_button = document.querySelector(".delete-button");

delete_button.addEventListener('click', function(event){
  if(selected_svg != "none") {
    var selected_svg_parent = selected_svg.parentNode;
    selected_svg_parent.removeChild(selected_svg);
    disable_delete()
  }
})


/*******************************************************************************************
 * *****************************************************************************************
 * ***************************** This Part is For Canvas ***********************************
 * *****************************************************************************************
 * ****************************************************************************************/
 console.log("enter canvas")

 const canvas = document.querySelector(".workarea-canvas");
 const ctx = canvas.getContext("2d");
 var canvas_temp = document.querySelector(".temp-canvas");
 var sCtx = canvas_temp.getContext("2d");

let down = false;
let start;
/* Add an event listner for mousedown */
canvas.addEventListener("mousedown", (e) => {
	sCtx.drawImage(canvas, 0, 0)
  down = true
  start = [e.offsetX, e.offsetY]
  ctx.fillStyle = fill_color
})

/* Add an event listner for mouseupe */
canvas.addEventListener("mouseup", (e) => {
  down = false
  sCtx.drawImage(canvas, 0, 0)
})

/* Add an event listner for mousemove */
canvas.addEventListener("mousemove", (e) => {
  if (down) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  	ctx.drawImage(canvas_temp, 0, 0)
    if(mode === "rect") {
      draw_rect_canvas(e)
    }else if(mode === "circle") {
      draw_circle_canvas(e)
    } 
  }
})

/* A Function to draw a rectangle on the canvas */ 
function draw_rect_canvas(e){
  ctx.fillStyle = border_color
  ctx.fillRect(start[0], start[1], e.offsetX - start[0], e.offsetY - start[1])
  ctx.fillStyle = fill_color
  ctx.fillRect(start[0]+parseInt(border_width), start[1]+parseInt(border_width), e.offsetX - start[0]-(parseInt(border_width)*2), e.offsetY - start[1]-(parseInt(border_width)*2))
}

/* A Function to draw a circle on the canvas */ 
function draw_circle_canvas(e){
  ctx.fillStyle = fill_color
  ctx.strokeStyle = border_color
  ctx.lineWidth = parseInt(border_width)

  ctx.beginPath();
  ctx.ellipse(start[0] + (e.offsetX - start[0])/2, start[1] + (e.offsetY - start[1])/2, (e.offsetX - start[0])/2, (e.offsetY - start[1])/2, 0, 0, 2 * Math.PI)
  ctx.fill();
  ctx.stroke()
}


/* Implement the function of flood fill */ 
canvas.addEventListener('click', (event)=>{
  if(mode === "cursor") {
    var rgb_color = convert_to_rgb(fill_color)
    floodFill(event, canvas, rgb_color)
  }
})

/* A helper function to convert a color to rgb color format */
function convert_to_rgb(fill_color) {
  switch (fill_color) {
    case "none":
      return "(255, 255, 255)"
    case "white":
      return "(255, 255, 255)"
    case "lightgray":
      return "(211, 211, 211)"
    case "black":
      return "(0, 0, 0)"
    case "yellow":
      return "(255, 255, 0)"
    case "red":
      return "(255, 0, 0)"
    case "lightblue":
      return "(173, 216, 230)"
    case "lightgreen":
      return "(144, 238, 144)"
  }
}

/* Implement the delete all function which will delete all elements in canvas and svg */
const delete_all_button = document.querySelector(".delete-all-button");
delete_all_button.addEventListener('click', function(event){
  delete_svg_elements()
  delete_canvas_elements()
})

/* A helper function to delete all elements in the svg */
function delete_svg_elements(){
  var svg_children = space.children;
  let svg_childrenn = Array.prototype.slice.call(svg_children);
  for(var i = 1; i < svg_childrenn.length; i++) {
    var i_parent = svg_childrenn[i].parentNode;
    i_parent.removeChild(svg_childrenn[i])
  }
}

/* A helper function to delete all elements in the canvas */
function  delete_canvas_elements(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  sCtx.clearRect(0, 0, canvas_temp.width, canvas_temp.height)
}






  



 








