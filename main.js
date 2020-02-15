
var DEFAULT_COLOR = '#777';
var COMPARE_COLOR = '#00F';
var SWAP_COLOR = '#F00';
const canvas = document.querySelector("canvas");
var pen = canvas.getContext('2d');

var rectArray=[]; //just to test it.
var rectArrayCopy =[];



//function to generate a random number:
function randomInteger(low, high){
	//returns a random integer in the range [low, high] inclusive.
	return low + Math.floor((high-low+1)*Math.random());  //note the floor part generates a random from 0 to high-low.
	
}

function generateArray(a){
	for (var i = 0; i<=a; i++){
		rectArray[i] = randomInteger(30, 600);
		rectArrayCopy[i] = rectArray[i];
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
	var spacing = canvas.width / (3*array.length-1);  //*********** Why is this (3*array.length -1)??
	var barWidth = spacing*2; //2 of spacing is the width of 1 bar.  Now this words cause array.length*(barWidth + spacing) = canvas.width (work this out!)
	//now draw rectangles:

	var x = 0;
	for (var i = 0; i < array.length; i++){
		ctx.fillStyle = colors[i];
		ctx.fillRect(x, canvas.height-array[i], barWidth, array[i]);
		x += barWidth+spacing;
	}
}
//Now I wish to populate the actions array.

class AnimateArray{
    //note the array that AnimateArray takes in should be the randomly generated unsorted array.
    /*
    constructor(array, canvas, interval){
        this.array = array;
        this.canvas = canvas;
        this.diplayArray = [];
        this.colorArray = [];
        this.actions = [];
        for (var i = 0; i < this.array.length; i++){  //displayArray is a copy of the original randomly generated array.
            this.displayArray[i] = this.array[i];
            this.colorArray.push(DEFAULT_COLOR);
        }
        drawArray(this.canvas, this.array, this.colorArray); //drawing the canvas initially when constructor.
        this.id = window.setInterval(function () {
            this.step();
        }, interval);
    }*/
    constructor(array, canvas){
        this.array = array;
        this.canvas = canvas;
        this.displayArray=[];  //This is now a copy of the generated array
        this.colorArray=[];  //This is just the color array.  
        this.actions=[];
        for (var i = 0; i < this.array.length; i++){
            this.displayArray[i] = this.array[i];
            this.colorArray.push(DEFAULT_COLOR);
        }
        drawArray(this.canvas, this.array, this.colorArray);
        
        
    }

    compare(i, j){
        this.actions.push(['compare', i, j]);
        return this.array[i] - this.array[j];  //positive means value at index i > value at index j.
    }

    lessThan(i, j){ //return true or false
        return this.compare(i, j) <0; //true means value at first index is < value at second index.
    }

    swap(i, j){  //So here we are simply swapping i and j.  
        console.log(this.array[i]);
        this.actions.push(['swap', i, j]);
        var temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;
    }

    selectionSort(){
        var n = this.array.length;
        for (var i = 0; i < n; i++){
            var minJ = i;
            for (var j = i; j < n; j++){
                if (this.lessThan(j, minJ)){  //current j is less than the previous minJ, reset minJ to be current j.
                    minJ = j;
                }
            }
            this.swap(i, minJ);
        }
    }

    step(){
        //console.log("running");
        
        if (this.actions.length == 0){
            drawArray(this.canvas, this.displayArray, this.colorArray);
            return;
        }
        
        var action = this.actions.shift();  //action is now an array.  
        var i = action[1];
        var j = action[2];
        if (action[0] === 'compare'){
            this.colorArray[i] = COMPARE_COLOR;
            this.colorArray[j] = COMPARE_COLOR;
            
        }else if (action[0] === 'swap'){
            this.colorArray[i]=SWAP_COLOR;
            this.colorArray[j]=SWAP_COLOR;
            var temp = this.displayArray[i];
            this.displayArray[i] = this.displayArray[j];
            this.displayArray[j] = temp;
        }
        drawArray(this.canvas, this.displayArray, this.colorArray);
        this.colorArray[i] = DEFAULT_COLOR;
        this.colorArray[j] = DEFAULT_COLOR;
        
    }
}


//OK SO FAR SO GOOD!
generateArray(80);
var Animate = new AnimateArray(rectArray, canvas);
Animate.selectionSort();
window.setInterval(function(){
    Animate.step();
}, 10);

