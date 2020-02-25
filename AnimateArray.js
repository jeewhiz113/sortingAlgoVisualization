class AnimateArray{
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
        //console.log(this.array[i]);
        this.actions.push(['swap', i, j]);
        var temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;
    }
    
    heapify(index, length){   //heapify to keep the min-heap property
        var largest = index;
        var left = 2*index+1;
        var right = 2*index+2;
        if (left < length && this.lessThan(largest,left)){  //<length is important.
            //console.log("changed");
            largest = left;
        }
        if (right < length && this.lessThan(largest, right)){
            //console.log("changed");
            largest = right;
        }
        if (largest != index){
            /*var temp = this.array[smallest];
            this.array[smallest] = this.array[index];
            this.array[index] = temp;
            */
            this.swap(largest, index)
            this.heapify(largest, length);

        }
    }

    buildHeap(){  //rearranging the array so that it has the min-heap property.
        var startIndex = Math.floor(this.array.length/2)-1;  //JS does not have integer division, so without Math.floor will often run into this.array[4.8] or something.
        for (var i = startIndex; i>=0; i--){
            this.heapify(i, this.array.length);
        }
    }

    heapSort(){
        this.buildHeap();  //so this.array has now changed. 
        for (var j = this.array.length -1; j>=0; j--){
            this.swap(j, 0);
            this.heapify(0, j);//call heapify on the remaining?
            
        }
    }

    //Now we test heapify to make sure it works!
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
    
    insertionSort(){
        var n = this.array.length;
        for (var i = 0; i < n; i++){
            var j = i;
            while (j > 0 && !this.lessThan(j-1, j)){  //this does the pushing of compare, figure out why this is !less than!
                this.swap(j-1, j);
                j = j-1;
            }
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