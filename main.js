
/*
A few things to do:
1. Try to do the merge/quick sort algorithm
2. Try to add the drag bar
3. Try to add the animation of a button being compressed
easylang.online  for soring algo references!
https://easylang.online/apps/tutorial_sorting.html
*/

var DEFAULT_COLOR = '#777';
var COMPARE_COLOR = '#00F';
var SWAP_COLOR = '#F00';
const canvas = document.querySelector("canvas");
var pen = canvas.getContext('2d');
var genArray = document.getElementById("genArray");
var selectionSort = document.getElementById("sSort");
var insertSort = document.getElementById("insertSort");



var rectArray=[]; //just to test it.
var rectArrayCopy =[];
var rectColor = [];

//function to generate a random number:
function randomInteger(low, high){
	//returns a random integer in the range [low, high] inclusive.
	return low + Math.floor((high-low+1)*Math.random());  //note the floor part generates a random from 0 to high-low.
	
}

function generateArray(a){
	for (var i = 0; i<=a; i++){
		rectArray[i] = randomInteger(30, 600);
        rectArrayCopy[i] = rectArray[i];
        rectColor.push(DEFAULT_COLOR);
	}

}

function drawArray(canvas, array, colors){ //canvas here is important? maybe we'd wanna draw on different canvases...
	var ctx = canvas.getContext('2d');
	ctx.fillStyle='#92a8d1';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	var spacing = canvas.width / (3*array.length-1);  //*********** Why is this (3*array.length -1)??
	var barWidth = spacing*2; //2 of spacing is the width of 1 bar.  Now this words cause array.length*(barWidth + spacing) = canvas.width (work this out!)
	var x = 0;
	for (var i = 0; i < array.length; i++){
		ctx.fillStyle = colors[i];
		ctx.fillRect(x, canvas.height-array[i], barWidth, array[i]);
		x += barWidth+spacing;
	}
}

/*
//OK SO FAR SO GOOD!
generateArray(80);
var Animate = new AnimateArray(rectArray, canvas);
Animate.selectionSort();
window.setInterval(function(){
    Animate.step();
}, 10);
*/
genArray.onclick = function(){
    generateArray(80);
    drawArray(canvas, rectArray, rectColor);
}

selectionSort.onclick = function(){
    var Animate = new AnimateArray(rectArray, canvas);
    Animate.selectionSort();
    window.setInterval(function(){
        Animate.step();
    }, 5);
}
insertSort.onclick = function(){
    var Animate = new AnimateArray(rectArray, canvas);
    Animate.insertionSort();
    window.setInterval(function(){
        Animate.step();
    }, 5);
}

//So let's try to heap sort the random array, and then log its values before and after it.

function logArray(a){
	a.forEach(element => console.log(element));
}

generateArray(200);


logArray(rectArray);
console.log("-------------");
var Animate = new AnimateArray(rectArray, canvas);

Animate.heapSort();

window.setInterval(function(){
	Animate.step();
}, 1);

logArray(Animate.array);


//So idea behind heapsort: We need to build the heap first from an array.  What is a heap?  and how to represent a heap using
//an array?  That is where heapify comes in!  

//Now that the array is in a heap structure, we can start sorting it!  Code is in geeks for geeks

/*
//So now let's run heapSort on it!
function heapify(array, n, i){
	var largest = i;
	var left = 2*i+1;
	var right = 2*i+2;
	if (left < n && array[left] > array[largest]){
		largest = left;
	}
	if (right < n && array[right] > array[largest]){
		largest = r;
	}
	if (largest != i){
		var temp = array[i];
		array[i] = array[largest];
		array[largest] = temp;

		heapify(array, n, largest);
	}
}
*/

