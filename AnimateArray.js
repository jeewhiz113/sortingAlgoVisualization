//So now this is the animatearray object:  It takes an array, a canvas and an interval as parameter.

//It has the following state variables:
/*
	-this.array (array)
	-this.canvas
	-this.id = window.setInterval(
	-this.displayArray (array)
	-this.colors (array)
	-this.action (array)
	-once made, we are going to run a for loop and and the following:
		*this.displayArray will be a dedicated copy of the array that is passed in.
		*this.colors will be initialized to take on the DEFAULT_COLOR.

	
*/ 
//Now the following seems to be at a point where I would like to try the code.  Lets go to main.js


function AnimateArray2(array, canvas, interval){
    this.array = array;
    this.canvas = canvas;
    this.displayArray=[];
	this.colorArray = [];
	this.actions=[];
    this.id = window.setInterval(stepfunction, interval);
    for (var i = 0; i < array.length; i++){
    	this.displayArray.push(array[i]); //copy the previously generated array
    	this.colorArray.push(DEFAULT_COLOR);  //Ok so the color array takes on the initial color.
	}
	drawArray(this.canvas, this.array, this.colorArray);
}
//So this works, which means I do get access to the rectArray here.

function compare(i, j){
	this.actions.push(["compare", i, j]);
	return this.array[i]-this.array[j];
}

function lessThan(i, j){
	return this.compare(i,j)<0;  //ith value is smaller than the jth value
}

function swap(i, j){
	this.actions.push(['swap', i, j]);
	var temp = this.array[i];
	this.array[i] = this.array[j];
	this.array[j] = temp;
}

var actions = [];
actions.push(['swap',8,12]);
console.log(actions[0]);
actions.push(['Second',8,12]);

console.log(actions[1]);
actions.shift();
console.log(actions[0]);
actions.shift();
console.log(actions[0]);
console.log("Stop Here");
console.log(rectArray[0]);
