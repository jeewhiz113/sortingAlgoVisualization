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
var i =0;
var j = i;
AnimateArray2(rectArray, canvas, 100);

function AnimateArray2(array, canvas, interval){
    this.array = array;
    this.canvas = canvas;
    this.displayArray=[];
	this.colorArray = [];
	this.actions=[];
    
    for (var i = 0; i < array.length; i++){
    	this.displayArray.push(array[i]); //copy the previously generated array
    	this.colorArray.push(DEFAULT_COLOR);  //Ok so the color array takes on the initial color.
	}
	drawArray(this.canvas, this.array, this.colorArray);
	this.id = window.setInterval(function() {
		this.step();
	}, interval);  //change 1000 later
	
}
//So this works, which means I do get access to the rectArray here.
var Anime = new AnimateArray2(rectArray, canvas, 12);
function step(){

	
	this.colorArray[i] = COMPARE_COLOR;
	this.colorArray[j] = COMPARE_COLOR;
	//console.log(colorArray[i]);
	drawArray(canvas,this.array, this.colorArray);
	j++;
	this.colorArray[i]= DEFAULT_COLOR;
	this.colorArray[j-1]= DEFAULT_COLOR;
	
	/*
	if (this.actions.length == 0){
		drawArray(this.canvas, this.displayArray, this.colorArray);
		return;
	}
	var action = this.actions.shift();
	var i = action[1];
	var j = action[2];
	if(actions[0] == 'compare'){
		this.colorArray[i] = COMPARE_COLOR;
		this.colorArray[j] = COMPARE_COLOR;
	}else if (action[0] == 'swap'){
		this.colorArray[i] = SWAP_COLOR;
		this.colorArray[j] = SWAP_COLOR;
		var temp = this.displayArray[i];
		this.displayArray[i] = this.displayArray[j];
		this.displayArray[j] = temp;
		
	}
	drawArray(this.canvas, this.displayArray, this.colorArray);
	this.colorArray[i] = DEFAULT_COLOR;
	this.colorArray[j] = DEFAULT_COLOR;*/
}

//Idea: I will populate the this.actions array.
function selectionSort(aa){
	var n = aa.length;
	for (var i = 0; i < n-1; i++){
		var minj = i;
		for (var j = i; j< n; j++){
			if (lessThan(j, minj)){
				minj = j;
			}
		}
		swap(i, minj);
	}
}



function compare(i, j){
	this.testActions.push(["compare", i, j]);
	return this.rectArray[i]-this.rectArray[j];
}

function lessThan(i, j){
	return this.compare(i,j)<0;  //ith value is smaller than the jth value
}

function swap(i, j){
	this.testActions.push(['swap', i, j]);
	var temp = this.rectArray[i];
	this.rectArray[i] = this.rectArray[j];
	this.rectArray[j] = temp;
}

