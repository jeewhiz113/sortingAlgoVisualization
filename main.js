var DEFAULT_COLOR = '#777';
var COMPARE_COLOR = '#00F';
var SWAP_COLOR = '#F00';
const canvas = document.querySelector("canvas");
var pen = canvas.getContext('2d');

var rectArray=[]; //just to test it.
var colorArray=[];
//function to generate a random number:
function randomInteger(low, high){
	//returns a random integer in the range [low, high] inclusive.
	return low + Math.floor((high-low+1)*Math.random());  //note the floor part generates a random from 0 to high-low.
	
}

function generateArray(){
	for (var i = 0; i<=30; i++){
		rectArray[i] = randomInteger(30, 600);
	}
	for (var i = 0; i <= 30; i++){
		colorArray[i] = DEFAULT_COLOR;
	}
}

function drawArray(canvas, array, colors){ //canvas here is important? maybe we'd wanna draw on different canvases...
	//Draw an array on a canvas.
	/*
		- Canvas: a DOM canvas object
		- ary: An array of numbers to draw
		- colors: an array storing strings that corresponds to the color for the ith element of array.
	*/
	//clear the canvas here:
	var ctx = canvas.getContext('2d');
	ctx.fillStyle='#92a8d1';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//next we figure out the spacing: So idea here is the spacing is going to be canvas.width/(3*n)
	var spacing = canvas.width / (3*array.length);  //So the spacing the going to take up 1/3 of total width
	var barWidth = spacing*2; //2 of spacing is the width of 1 bar.  Now this words cause array.length*(barWidth + spacing) = canvas.width (work this out!)
	//now draw rectangles:

	var x = 0;
	for (var i = 0; i < array.length; i++){
		ctx.fillStyle = colors[i];
		ctx.fillRect(x, canvas.height-array[i], barWidth, array[i]);
		x += barWidth+spacing;
	}
	
	
}
generateArray();
for (var i = 0; i <=100; i++){
	console.log(rectArray[i]);
	console.log(colorArray[i]);
}
drawArray(canvas, rectArray, colorArray);
