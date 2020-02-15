//idea:
/*
pass an array to this class.  then displayArray is then the copy and we'd initiallly draw
with the original array.  Then we simply draw this array using the original array.

Then in this method, one should have a method called selectionsort that populate the actions
array, which would use this.array and changes it.  

Then I would simply put the window.setInterval method in a separate function and call it to
run it!

*/

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
        this.displayArray=[];
        this.colorArray=[];
        this.actions=[];
        for (var i = 0; i < this.array.length;i++){
            this.displayArray[i] = this.array[i];
            this.colorArray.push(DEFAULT_COLOR);
        }
        drawArray(this.canvas, this.array, this.colorArray);
        
    }

    compare(i, j){
        this.actions.push(['compare', i, j]);
        return this.array[j] - this.array[i];  //returns the value of index j - value of index i.
    }
}