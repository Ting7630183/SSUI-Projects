// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages

let initProducts = () => {

    const listContainer = document.querySelector('#shirt-list')

    console.log(listContainer)
    for(var i = 0; i < shirts.length; i++) {
        var shirt = shirts[i];
        
        var shirtDiv = document.createElement('div');
        shirtDiv.setAttribute("class", "shirtDive");
        var picutureDiv= document.createElement('div');
        var element = document.createElement('img');
        
        element.src = shirt.colors.white.front;
        
        picutureDiv.appendChild(element);
        shirtDiv.appendChild(picutureDiv);

        var nameDiv= document.createElement('div');
        var nameElement = document.createTextNode(shirt.name);
        nameDiv.setAttribute("class", "nameDive");
        nameDiv.appendChild(nameElement);
        shirtDiv.appendChild(nameDiv);

        var availabeDiv= document.createElement('div');
        var nameElement = document.createTextNode("Availabe in " + Object.keys(shirt["colors"]).length + " colors");
        availabeDiv.setAttribute("class", "availabeDiv")
        availabeDiv.appendChild(nameElement);
        shirtDiv.appendChild(availabeDiv);

        var buttonDiv = document.createElement('button'); 
        buttonDiv.textContent = 'See Page';
        buttonDiv.setAttribute("class", "buttonDiv");
        buttonDiv.setAttribute("value", shirt.name);

        buttonDiv.addEventListener("click", function(e){
            location =  './details.html';
            var namee = e.target.value;
            localStorage.setItem('name', namee);
        });

        shirtDiv.appendChild(buttonDiv);
        console.log(shirtDiv);
    
        listContainer.appendChild(shirtDiv);
    }
};

let initDetails = () => {
    localStorage.setItem('colorr', "white");
    var shirtName = localStorage.getItem('name');
    console.log(shirtName);
    const shirt = shirts.filter((s) => s.name === shirtName)[0];

    const shirtContainer = document.querySelector('#shirt-detail');

    var nameDiv = document.createElement('h1');
    nameDiv.textContent = shirt.name;
    shirtContainer.appendChild(nameDiv);

    var contentDiv = document.createElement('div');
    contentDiv.setAttribute("class", "contentDiv"); 
    
    var pictureDiv = document.createElement('div');
    var element = document.createElement('img');
    element.setAttribute("class", "picture-show");
    element.src = shirt.colors.white.front;
    pictureDiv.appendChild(element);
    contentDiv.appendChild(pictureDiv);

    var selectionDiv = document.createElement('div');
    selectionDiv.setAttribute("class", "selectionDiv");
    var priceDiv = document.createElement('h2');
    priceDiv.textContent = shirt.price;
    priceDiv.setAttribute("class", "priceDiv");

    selectionDiv.appendChild(priceDiv);

    var illustrationDiv = document.createElement('div');
    illustrationDiv.textContent = shirt.description;
    illustrationDiv.setAttribute("class", "illustrationDiv");

    selectionDiv.appendChild(illustrationDiv);

    var sideDiv = document.createElement('div');
    sideDiv.setAttribute("class", "sideDiv");
    var sidetextDiv = document.createElement('div');
    selectionDiv.setAttribute("class", "selectionDiv"); 
    sidetextDiv.textContent = "Side:";

    sideDiv.appendChild(sidetextDiv);

    var frontButton = document.createElement('button');
    frontButton.textContent = "Front";
    frontButton.setAttribute("class", "frontButton");

    frontButton.setAttribute("value", "front");
    sideDiv.appendChild(frontButton);
    
    frontButton.addEventListener("click", e =>{
        const p = document.images[2];
        var colorr = localStorage.getItem('colorr');
        p.src = shirt.colors[colorr].front;
        console.log(shirt.colors[colorr].front);
    });
    

    var backButton = document.createElement('button');
    backButton.textContent = "Back";
    backButton.setAttribute("class", "backButton");

    backButton.setAttribute("value", "back");
    sideDiv.appendChild(backButton);
    backButton.addEventListener("click", function(e){
        const p = document.images[2];
        var colorr = localStorage.getItem('colorr');
        console.log(shirt.colors[colorr].back);
        p.src = shirt.colors[colorr].back;
    });

    var colorDiv = document.createElement('div');
    colorDiv.setAttribute("class", "colorDiv");
    var colortextDiv = document.createElement('div');
    colortextDiv.textContent = "Color:";
    colortextDiv.setAttribute("class", "colortextDiv");
    colorDiv.appendChild(colortextDiv);

    for(var i = 0; i < Object.keys(shirt["colors"]).length; i++) {
        var colorButton = document.createElement('button');
        colorButton.textContent = Object.keys(shirt["colors"])[i];
        colorButton.setAttribute("class", "colorButton"); 
        colorButton.style.background = Object.keys(shirt["colors"])[i];
        var col = Object.keys(shirt["colors"])[i];
        console.log(col);
        colorButton.setAttribute("value", col);
        colorDiv.appendChild(colorButton);
        colorButton.addEventListener("click", function(e){
            const p = document.images[2];
            var colorr = e.target.value;
            console.log(colorr);
            localStorage.setItem('colorr', colorr);
            p.src = shirt.colors[colorr].front;
        });
    }
    
    selectionDiv.appendChild(sideDiv);
    selectionDiv.appendChild(colorDiv);
    contentDiv.appendChild(selectionDiv);
    
    shirtContainer.appendChild(contentDiv);

    // To see the shirts object, run:
    // console.log(shirts);

    // Your Code Here

    // const urlParams = new URLSearchParams(window.location.search);
    // const myParam = urlParams.get('name');
    // console.log(shirts)
    // const shirt = shirts.filter((s) => s.name === myParam)[0]
    // console.log(shirt)
    // const listContainer = document.querySelector('#shirt-list')
    // listContainer.innerHTML = `<div>${shirt.name}</div>`
};
