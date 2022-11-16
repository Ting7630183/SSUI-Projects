
console.log("enter both js")
const canvas_layer = document.querySelector("#canvas_layer");
const svg_layer = document.querySelector("#svg_layer");
const both_layer = document.querySelector("#both_layer");

const workarea_svg = document.querySelector(".workarea-svg");
const workarea_canvas = document.querySelector(".workarea-canvas");
const temp_canvas = document.querySelector(".temp-canvas");

//By default, svg layer is shown and other layers are not shown
workarea_svg.style.display = "block" 
workarea_canvas.style.display = "none" 
temp_canvas.style.display = "none" 

//add event listener to canvas layer
canvas_layer.addEventListener('click', function(event) {
    console.log('enter canvas')
    workarea_svg.style.display = "none" 
    workarea_canvas.style.display = "block" 
    // temp_canvas.style.display = "block" 
}); 

//add event listener to svg layer
svg_layer.addEventListener('click', function(event) {
    console.log('enter svg')
    workarea_svg.style.display = "block" 
    workarea_canvas.style.display = "none" 
    temp_canvas.style.display = "none" 
}); 

//add event listener to both layer
both_layer.addEventListener('click', function(event) {
    console.log("enter both layer")
    workarea_svg.style.display = "block" 
    workarea_canvas.style.display = "block"
    temp_canvas.style.display ="block"
    // disable_selection()
}); 

// function disable_selection() {
//     const mode_div = document.querySelector(".mode");
//     mode_div.disabled = true;
//     mode_div.backgroundColor = "gray"
//     disable_child(mode_div)
//     const border_color_div = document.querySelector(".border-color");
//     border_color_div.disabled = true;
//     border_color_div.backgroundColor = "gray"
//     const border_width_div = document.querySelector(".boarder-width");
//     border_width_div.disabled = true;
//     border_width_div.backgroundColor = "gray"
//     const fill_color_div = document.querySelector(".fill-color-container");
//     fill_color_div.disabled = true
//     fill_color_div.backgroundColor = "gray"

// }

// function disable_child(certain_div) {
//     var nodes = certain_div.getElementsByTagName('*');
//     for(var i = 0; i < nodes.length; i++){
//      nodes[i].disabled = true;
//      nodes[i].backgroundColor = "gray"
//      nodes[i].color = "gray"
//     }  
// }






