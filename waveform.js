var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 500;
// myCanvas.height = 500;
if  (typeof FSM._outputs === 'string' || FSM._outputs instanceof String) {
    if  (typeof FSM._inputs === 'string' || FSM._inputs instanceof String) {
        myCanvas.height = 300;
    }
    else {
        myCanvas.height = 50* (5+FSM._inputs.length);
    }
}
else    {
    if  (typeof FSM._inputs === 'string' || FSM._inputs instanceof String) {
        myCanvas.height = 50* (5+FSM._outputs.length);
    }
    else{
        myCanvas.height = 50* (4+FSM._inputs.length+FSM._outputs.length);
    }
}
var ctx = myCanvas.getContext("2d");

var inputs = []



var myoptions = {
    labelheight:15,
    clklen:40,
    marginX:50,
    marginY:50,
    textmargin:2,
    titlestart:10,
    transition:3,
    wavedist:50,
    waveheight:15,
    startclock:1,
    font:"15px Arial"
}


function drawLine(ctx, startX, startY, endX, endY,color){

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();

}
function drawDotted(ctx, startX, startY, endX, endY,color){

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.setLineDash([4,16]);
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();

}

var Waveform = function(canvas,binary,options,waveNum,title){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.binary = binary;
    this.ctx.font = options.font;
    this.ctx.textAlign = "left";

    this.draw = function(){
        var current = 0;
        var i = options.startclock - 1;
        var diffX = options.clklen;
        var startX = options.marginX;
        var endX = startX + diffX;
        var heightY = options.waveheight;
        var startY = options.marginY + (options.wavedist * waveNum);
        this.ctx.fillText(title, options.titlestart, startY-options.textmargin);

        while (i < this.binary.length){
            var intBinary= this.binary.charCodeAt(i)-48;
            if (intBinary==current){
                drawLine(
                    this.ctx,
                    startX,
                    startY - heightY * current,
                    endX,
                    startY - heightY * current,
                    "#000000"
                )
            }
            else {
                drawLine(
                    this.ctx,
                    startX,
                    startY - heightY * current,
                    startX + options.transition,
                    startY - heightY * intBinary,
                    "#000000"
                )

                current = intBinary;

                drawLine(
                    this.ctx,
                    startX + options.transition,
                    startY - heightY * current,
                    endX,
                    startY - heightY * current,
                    "#000000"
                )
            }
            startX = endX;
            endX += diffX;
            i++;
        }
        
    }
}

var clock = function(canvas,length,options,waveNum,title){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.length = length;
    this.ctx.font = options.font;
    this.ctx.textAlign = "left";

    this.draw = function(){
        var current = 0;
        var i = options.startclock - 1;
        var diffX = options.clklen;
        var startX = options.marginX;
        var middleX = startX + diffX / 2;
        var endX = startX + diffX;
        var heightY = options.waveheight;
        var startY = options.marginY + (options.wavedist * waveNum);
        this.ctx.fillText(title, options.titlestart, startY-options.textmargin);

        while (i < this.length) {
            drawLine(
                this.ctx,
                startX,
                startY - heightY,
                middleX,
                startY - heightY,
                "#000000"
            )
            drawLine(
                this.ctx,
                middleX,
                startY - heightY,
                middleX,
                startY,
                "#000000"
            )
            drawLine(
                this.ctx,
                middleX,
                startY,
                endX,
                startY,
                "#000000"
            )
            drawLine(
                this.ctx,
                endX,
                startY,
                endX,
                startY - heightY,
                "#000000"
            )
            startX = endX;
            middleX += diffX;
            endX += diffX;
            i++;
        }
    }
}
var stateWave = function(canvas,stateArray,options,waveNum,title){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.stateArray = stateArray;
    this.ctx.font = options.font;
    this.ctx.textAlign = "left";

    this.draw = function(){
        var current = 0;
        var i = options.startclock - 1;
        var diffX = options.clklen;
        var startX = options.marginX;
        var middleX = startX + options.transition;
        var endX = startX + diffX;
        var heightY = options.waveheight;
        var startY = options.marginY + (options.wavedist * waveNum);
        var previous = this.stateArray[i];
        this.ctx.fillText(previous,middleX,startY-options.textmargin);
        this.ctx.fillText(title, options.titlestart, startY-options.textmargin);

        while (i < this.stateArray.length) {
            drawLine(
                this.ctx,
                middleX,
                startY - heightY,
                endX,
                startY - heightY,
                "#000000"
            )
            drawLine(
                this.ctx,
                middleX,
                startY,
                endX,
                startY,
                "#000000"
            )

            current = this.stateArray[i];
            if (previous == current){
                drawLine(
                    this.ctx,
                    startX,
                    startY,
                    middleX,
                    startY,
                    "#000000"
                )
                drawLine(
                    this.ctx,
                    startX,
                    startY - heightY,
                    middleX,
                    startY - heightY,
                    "#000000"
                )
            }
            else {
                drawLine(
                    this.ctx,
                    startX,
                    startY - heightY,
                    middleX,
                    startY,
                    "#000000"
                )
                drawLine(
                    this.ctx,
                    startX,
                    startY,
                    middleX,
                    startY - heightY,
                    "#000000"
                )  
                this.ctx.fillText(current,middleX,startY-options.textmargin);  
            }

            startX = endX;
            middleX += diffX;
            endX += diffX;
            i++;
            previous = current;
        }
    }
}

var grid = function (canvas,options) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = options.font;
    this.ctx.textAlign = "center";

    this.draw = function() {
        var startX = options.marginX;
        var startY = 500;
        var endX = this.canvas.width;
        var endY = 0;
        var diffX = options.clklen;
        var count = options.startclock - 1;

        drawLine(
            this.ctx,
            startX,
            startY,
            startX,
            endY,
            "#000000"
        )

        startX += diffX; 
        while (startX  < endX){
            drawDotted(
                this.ctx,
                startX,
                startY,
                startX,
                endY,
                "#808080"
            )           
            count++;
            this.ctx.fillText(count.toString(), startX - diffX / 2, options.labelheight-options.textmargin);
            
            startX += diffX;
        }
    }
}

function drawAll (canvas,options,inputs){
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.clearRect(0,0,myCanvas.width,myCanvas.height);

    var wavecount = 0;
    var i=0;
    var graphgrid = new grid(myCanvas,myoptions)
    graphgrid.draw();

    var clockWave = new clock(
        myCanvas,
        // inputs[0].length,
        102,
        options,
        wavecount,
        "CLK"
    )
    wavecount++;
    clockWave.draw();
    var resetStr = "100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    var reset = new Waveform(
        myCanvas,
        resetStr,
        options,
        wavecount,
        "RST"
    )
    wavecount++;
    reset.draw();

    if (!(typeof FSM._inputs == 'string' || FSM._inputs instanceof String)){
        var n = FSM._inputs.length;
        for (var i=0; i<n;i++){
            inputWave = new Waveform(
                myCanvas,
                inputs[i],
                options,
                wavecount,
                FSM._inputs[i]
            )
            wavecount++;
            inputWave.draw();
        }
    }
    else {
        inputWave = new Waveform(
            myCanvas,
            inputs[0],
            options,
            wavecount,
            FSM._inputs
        )
        wavecount++;
        inputWave.draw();
    }


    var stateArr = [];
    var stateName = [];

    var outputs = [];
    stateArr[0] = FSM._resetState;
    stateArr[1] = FSM._resetState;
    stateName[0] = "?";
    stateName[1] = stateArr[1]._name;
    if  (typeof FSM._outputs === 'string' || FSM._outputs instanceof String) {
        outputs[0] = "?";
    }
    else {
        var outputstr = "";
        for (var i=0;i<FSM._outputs.length;i++){
            outputstr += "?";
        }
        outputs[0]= outputstr;
    }
    if (FSM._type == "Moore"){
        outputs[1] =  getOutput(stateArr[1], "0");
    }


    for (var j=1;j<inputs[0].length;j++){
        var inputstr= "";
        for (var i=0; i<inputs.length; i++){
            inputstr = inputstr + inputs[i][j];
        }
        // var inputstr= inputs[0][j]+inputs[1][j];
        stateName[j+1] = readTable (stateArr[j]._transition, inputstr);
        stateArr[j+1] = FSM._stateObj[stateName[j+1]];
        if (FSM._type == "Moore"){
            outputs[j+1] = getOutput(stateArr[j+1], "0");
        }
        else {
            outputs[j] = getOutput(stateArr[j], inputstr);
        }
    }


    var curState = new stateWave(
        myCanvas,
        stateName,
        options,
        wavecount,
        "S"
    )
    wavecount++;
    curState.draw();
    
    if (!(typeof FSM._outputs == 'string' || FSM._outputs instanceof String)) {
        for (var i =0;i<FSM._outputs.length;i++){
            var splitoutputs = [];
            for (var j=0; j<outputs.length; j++){
                splitoutputs[j] = outputs[j][i];
            }
            var outputWave = new stateWave(
                myCanvas,
                splitoutputs,
                options,
                wavecount,
                FSM._outputs[i]
            )
            wavecount++;
            outputWave.draw();
        }
    }
    else{
        var outputWave = new stateWave(
            myCanvas,
            outputs,
            options,
            wavecount,
            FSM._outputs
        )
    }
    // var outputWave1 = new stateWave(
    //     myCanvas,
    //     outputA,
    //     options,
    //     wavecount,
    //     "LA"
    // )
    // wavecount++;
    // outputWave1.draw();

    // var outputWave2 = new stateWave(
    //     myCanvas,
    //     outputB,
    //     options,
    //     wavecount,
    //     "LB"
    // )
    // wavecount++;
    // outputWave2.draw();
    // }
}

function prevCycle() {
    if (myoptions.startclock > 10) {
        myoptions.startclock = myoptions.startclock - 10;
        drawAll(myCanvas,myoptions,inputs);
    }
    else alert("Limit reached");
}

function nextCycle() {
    if (myoptions.startclock == 91) alert("Limit reached");
    else if (inputs[0].length - myoptions.startclock >= 10){
        myoptions.startclock = myoptions.startclock + 10;
        drawAll(myCanvas,myoptions,inputs);
    }
    else alert("Limit reached");
}

function updateWave() {
    var container = document.getElementById("container");
    var numInputEl = 3;
    if (!(typeof FSM._inputs == 'string' || FSM._inputs instanceof String)){
        var n = FSM._inputs.length;
    }
    else var n = 1;
    var test = 1;
    var length = container.childNodes[1].value.length;
    for (var i=0; i<n;i++){
        test = test && isBinaryString(container.childNodes[i*numInputEl+1].value) && (length == container.childNodes[i*numInputEl+1].value.length);
    }

    if (!test)
        alert("Input(s) invalid");
    else {
        for (var i=0; i<n;i++){
            inputs[i] = container.childNodes[i*numInputEl+1].value;
        }

        drawAll(myCanvas,myoptions,inputs);
    }
}
function isBinaryString (InString)  {
    if(InString.length==0) return (false);
    var RefString="10";
    for (Count=0; Count < InString.length; Count++)  {
        TempChar= InString.substring (Count, Count+1);
        if (RefString.indexOf (TempChar, 0)==-1)  
            return (false);
    }
    return (true);
}
function isNumberString (InString)  {
    if(InString.length==0) return (false);
    var RefString="1234567890";
    for (Count=0; Count < InString.length; Count++)  {
        TempChar= InString.substring (Count, Count+1);
        if (RefString.indexOf (TempChar, 0)==-1)  
            return (false);
    }
    return (true);
}
function addFields(){    
    var container = document.getElementById("container");
    if (!(typeof FSM._inputs == 'string' || FSM._inputs instanceof String)){
        var n = FSM._inputs.length;
        for (var i=0;i<n;i++){
            container.appendChild(document.createTextNode(FSM._inputs[i]+" "));
            var input = document.createElement("input");
            input.type = "text";
            input.name = FSM._inputs[i];
            input.value = "0";
            container.appendChild(input);
            container.appendChild(document.createElement("br"));
            inputs[i]="0";
        }
    }
    else {
        container.appendChild(document.createTextNode(FSM._inputs+" "));
        var input = document.createElement("input");
        input.type = "text";
        input.name = FSM._inputs;
        input.value = "0";
        container.appendChild(input);
        container.appendChild(document.createElement("br"));
        inputs[0]="0";
    }
    
    // var button = document.createElement("input");
    // button.name = "button";
    // button.type = "button";
    // button.value = "submit";
    // button.onclick = "updateWave()";
    // container.appendChild(button);
    // container.appendChild(document.createElement("br"));
}
function toggleOptions(button){
    var optionbtn = button;
    var container = document.getElementById("moreoptions");

    if (optionbtn.value == "more input options") {
        optionbtn.value = "hide input options";
        if (!(typeof FSM._inputs == 'string' || FSM._inputs instanceof String)){
            container.appendChild(document.createElement("br"));
            container.appendChild(document.createTextNode("Append patterns or randomize"));
            var randomBtn = document.createElement("input");
            randomBtn.type = "button";
            randomBtn.name = "randomBtn";
            randomBtn.value = "Randomize";
            // randomBtn.addEventListener("click", randomize, false);
            randomBtn.onclick = function(){
                if (!(typeof FSM._inputs == 'string' || FSM._inputs instanceof String)){
                    var n = FSM._inputs.length;
                }
                else var n = 1;
            
                var container = document.getElementById("moreoptions");
                
                for (var i=0;i<n;i++){  
                    var inputstr = "";
                    var numClk = container.childNodes[n*3+3].value;
            
                    for (var j=0; j< numClk ;j++) {
                        
                        inputstr += String.fromCharCode(48+(Math.floor(Math.random()*2)));
                    }      
                     
                    inputs[i] = inputstr; 
                } 
                myoptions.startclock = 1;   
                drawAll(myCanvas,myoptions,inputs);

                container = document.getElementById("container");
                for (var i=0; i<n;i++){
                    container.childNodes[i*3+1].value = inputs[i];
                }
            }

            var n = FSM._inputs.length;
            for (var i=0;i<n;i++){
                container.appendChild(document.createElement("br")); 
                container.appendChild(document.createTextNode(FSM._inputs[i]+": "));
                var input = document.createElement("input");
                input.type = "text";
                input.name = FSM._inputs[i]+"pattern";
                input.value = "";
                input.size = "10";
                container.appendChild(input);              
            }

            container.appendChild(document.createTextNode(" for "));

            var clockcycle = document.createElement("input");
            clockcycle.type = "text";
            clockcycle.name = "clockcycle";
            clockcycle.value = "";
            clockcycle.size = "3";
            container.appendChild(clockcycle);
            container.appendChild(document.createTextNode(" clock cycles"));
            container.appendChild(document.createElement("br"));

            var appendBtn = document.createElement("input");
            appendBtn.type = "button";
            appendBtn.name = "appendBtn";
            appendBtn.value = "Append";
            // appendBtn.addEventListener("click", appendPattern, false);
            appendBtn.onclick = function(){
                var container = document.getElementById("moreoptions");
                var numInputEl = 3;
                if (!(typeof FSM._inputs == 'string' || FSM._inputs instanceof String)){
                    var n = FSM._inputs.length;
                }
                else var n = 1;

                for (var i=0;i<n;i++){           
                    var pattern =  container.childNodes[i*3+4].value;
                    var clockcycle = container.childNodes[n*3+3].value;
                    var numClk = parseInt(clockcycle);
                    var inputstr = "";
                    var k = 0;
                    
                    
                    for (var j=0;j< numClk;j++){
                        inputstr += pattern[k];
                        k++;
                        if (k == pattern.length){
                            k=0;
                        }
                    
                    }
                    inputs[i]= inputs[i]+inputstr;
                }
                drawAll(myCanvas,myoptions,inputs);
                container = document.getElementById("container");
                for (var i=0; i<n;i++){
                    container.childNodes[i*numInputEl+1].value = inputs[i];
                }

            } 
            container.appendChild(appendBtn);
            container.appendChild(document.createTextNode("         "));
            container.appendChild(randomBtn);
            container.appendChild(document.createTextNode("         "));

            var clearBtn = document.createElement("input");
            clearBtn.type = "button";
            clearBtn.name = "clearBtn";
            clearBtn.value = "Clear";
            // clearBtn.addEventListener("click", clearinputs, false);
            clearBtn.onclick = function(){
                if (!(typeof FSM._inputs == 'string' || FSM._inputs instanceof String)){
                    var n = FSM._inputs.length;
                }
                else var n = 1;
                for (var i=0;i<n;i++){           
                    inputs[i] = "0";
                }
                myoptions.startclock = 1;
                drawAll(myCanvas,myoptions,inputs);
                var container = document.getElementById("container");
                for (var i=0; i<n;i++){
                    container.childNodes[i*3+1].value = inputs[i];
                }
            }
            container.appendChild(clearBtn);

            // container.appendChild(document.createTextNode("         "));
            // var updateBtn = document.createElement("input");
            // updateBtn.type = "button";
            // updateBtn.name = "updateBtn";
            // updateBtn.value = "Update fields";
            // updateBtn.onclick = function(){
            //     var container = document.getElementById("container");
            //     var numInputEl = 3;
            //     if (!(typeof FSM._inputs == 'string' || FSM._inputs instanceof String)){
            //         var n = FSM._inputs.length;
            //     }
            //     else var n = 1;
            //     for (var i=0; i<n;i++){
            //         container.childNodes[i*numInputEl+1].value = inputs[i];
            //     }
            // }
            // container.appendChild(updateBtn);
        }
        else {
            container.appendChild(document.createElement("br"));
            container.appendChild(document.createTextNode("Append patterns or randomize"));
            var randomBtn = document.createElement("input");
            randomBtn.type = "button";
            randomBtn.name = "randomBtn";
            randomBtn.value = "Randomize";
            // randomBtn.addEventListener("click", randomize, false);
            randomBtn.onclick = function(){
                if (!(typeof FSM._inputs == 'string' || FSM._inputs instanceof String)){
                    var n = FSM._inputs.length;
                }
                else var n = 1;
            
                var container = document.getElementById("moreoptions");
                
                for (var i=0;i<n;i++){  
                    var inputstr = "";
                    var numClk = container.childNodes[n*3+3].value;
            
                    for (var j=0; j< numClk ;j++) {
                        
                        inputstr += String.fromCharCode(48+(Math.floor(Math.random()*2)));
                    }      
                     
                    inputs[i] = inputstr; 
                } 
                myoptions.startclock = 1;   
                drawAll(myCanvas,myoptions,inputs);

                container = document.getElementById("container");
                for (var i=0; i<n;i++){
                    container.childNodes[i*3+1].value = inputs[i];
                }
            }

            container.appendChild(document.createElement("br"));
            container.appendChild(document.createTextNode(FSM._inputs+": "));

            var input = document.createElement("input");
            input.type = "text";
            input.name = FSM._inputs+"pattern";
            input.value = "";
            container.appendChild(input);
            container.appendChild(document.createTextNode(" for "));

            var clockcycle = document.createElement("input");
            clockcycle.type = "text";
            clockcycle.name = "clockcycle";
            clockcycle.value = "";
            clockcycle.size = "3";
            container.appendChild(clockcycle);
            container.appendChild(document.createTextNode(" clock cycles"));
            container.appendChild(document.createElement("br"));

            var appendBtn = document.createElement("input");
            appendBtn.type = "button";
            appendBtn.name = "appendBtn";
            appendBtn.value = "Append";
            // appendBtn.addEventListener("click", appendPattern, false);
            appendBtn.onclick = function(){
                var container = document.getElementById("moreoptions");
                var numInputEl = 3;
                if (!(typeof FSM._inputs == 'string' || FSM._inputs instanceof String)){
                    var n = FSM._inputs.length;
                }
                else var n = 1;

                for (var i=0;i<n;i++){           
                    var pattern =  container.childNodes[i*3+4].value;
                    var clockcycle = container.childNodes[n*3+3].value;
                    var numClk = parseInt(clockcycle);
                    var inputstr = "";
                    var k = 0;
                    
                    
                    for (var j=0;j< numClk;j++){
                        inputstr += pattern[k];
                        k++;
                        if (k == pattern.length){
                            k=0;
                        }
                    
                    }
                    inputs[i]= inputs[i]+inputstr;
                }
                drawAll(myCanvas,myoptions,inputs);
                container = document.getElementById("container");
                for (var i=0; i<n;i++){
                    container.childNodes[i*numInputEl+1].value = inputs[i];
                }

            } 
            container.appendChild(appendBtn);
            container.appendChild(document.createTextNode("         "));
            container.appendChild(randomBtn);
            container.appendChild(document.createTextNode("         "));

            var clearBtn = document.createElement("input");
            clearBtn.type = "button";
            clearBtn.name = "clearBtn";
            clearBtn.value = "Clear";
            // clearBtn.addEventListener("click", clearinputs, false);
            clearBtn.onclick = function(){
                if (!(typeof FSM._inputs == 'string' || FSM._inputs instanceof String)){
                    var n = FSM._inputs.length;
                }
                else var n = 1;
                for (var i=0;i<n;i++){           
                    inputs[i] = "0";
                }
                myoptions.startclock = 1;
                drawAll(myCanvas,myoptions,inputs);
                var container = document.getElementById("container");
                for (var i=0; i<n;i++){
                    container.childNodes[i*numInputEl+1].value = inputs[i];
                }
            }
            container.appendChild(clearBtn);

            // container.appendChild(document.createTextNode("         "));
            // var updateBtn = document.createElement("input");
            // updateBtn.type = "button";
            // updateBtn.name = "updateBtn";
            // updateBtn.value = "Update fields";
            // updateBtn.onclick = function(){
            //     var container = document.getElementById("container");
            //     var numInputEl = 3;
            //     if (!(typeof FSM._inputs == 'string' || FSM._inputs instanceof String)){
            //         var n = FSM._inputs.length;
            //     }
            //     else var n = 1;
            //     for (var i=0; i<n;i++){
            //         container.childNodes[i*numInputEl+1].value = inputs[i];
            //     }
            // }
            // container.appendChild(updateBtn);
        }
    }
    else {
        optionbtn.value = "more input options";
        while (container.hasChildNodes()){
            container.removeChild(container.lastChild);
        }
    }
}
// function appendPattern(){
//     var container = document.getElementById("moreoptions");

//     if (!(typeof FSM._inputs == 'string' || FSM._inputs instanceof String)){
//         var n = FSM._inputs.length;
//     }
//     else {
//         var n = 1;
//     }
//     for (var i=0;i<n;i++){           
//         var pattern =  container.childNodes[i*3+4].value;
//         var clockcycle = container.childNodes[n*3+3].value;
//         var numClk = parseInt(clockcycle);
//         var inputstr = "";
//         var k = 0;
        
        
//         for (var j=0;j< numClk;j++){
//             inputstr += pattern[k];
//             k++;
//             if (k == pattern.length){
//                 k=0;
//             }
        
//         }
//         inputs[i]= inputs[i]+inputstr;
//     }
//     drawAll(myCanvas,myoptions,inputs);
// }

// function clearinputs(){
//     if (!(typeof FSM._inputs == 'string' || FSM._inputs instanceof String)){
//         var n = FSM._inputs.length;
//     }
//     else var n = 1;
//     for (var i=0;i<n;i++){           
//         inputs[i] = "0";
//     }
//     myoptions.startclock = 1;
//     drawAll(myCanvas,myoptions,inputs);
// }

// function randomize(){

//     if (!(typeof FSM._inputs == 'string' || FSM._inputs instanceof String)){
//         var n = FSM._inputs.length;
//     }
//     else var n = 1;

//     var container = document.getElementById("moreoptions");

//     for (var i=0;i<n;i++){  
//         var inputstr = "";
//         var numClk = container.childNodes[n*3+3].value;

//         for (var j=0; j< numClk ;j++) {
            
//             inputstr += String.fromCharCode(48+(Math.floor(Math.random()*2)));
//         }      
         
//         inputs[i] = inputstr; 
//     } 
//     myoptions.startclock = 1;   
//     drawAll(myCanvas,myoptions,inputs);
// }
function writeTBCode(){
    var timescale = document.getElementById("timescale").value;
    var timeprec = document.getElementById("timeprec").value;
    var clockspd = document.getElementById("clockspd").value;
    var num = 1000 / (2*timescale*clockspd);
    var delay1 = num.toString() ;
    num = 1000 / (timescale*clockspd);
    var delay2 = num.toString() ;

    var code =
    "'timescale " + timescale + " ns / " + timeprec + " ps\n\n" +
    "module fsm ();\n\n" +
    "reg clk, reset, " + FSM._inputs.join(", ") + ";\n" +
    "wire " + FSM._outputs.join(", ") + ";\n\n" +
    "fsm dut(\n" +
    "\tclk, reset, " + FSM._inputs.join(", ") + ",\n" +
    "\t" + FSM._outputs.join(", ") + "\n);\n\n" +
    "always\n#" + delay1 + " clk = ~clk\n\n" +
    "initial\nbegin\n\n" +
    "clk = 1'b0;\n\n";
    
    for (var j=0; j<inputs[0].length; j++){
        if (inputs.length > 1){
            for (var i=0; i<inputs.length; i++){
                code += FSM._inputs[i] + "=" + inputs[i][j] + ";#" + delay2 + ";\n";
            }
        }
        else {
            code += FSM._inputs + "=" + inputs[0][j] + ";#" + delay2 + ";\n";
        }
    }

    code += "\nend\n\n" +
    "endmodule\n";

    return code;
}

function getOutput(state,curIn) {
    if (FSM._type == "Moore") {
        return state._outputs;
    } else {
        if (curIn == "undefined") {
            return "undefined";
        } else {
            return readTable(state._outputs, curIn);
        }
    }
}
function displayTBCode() {
    document.getElementById("TBCode").innerHTML = writeTBCode();

}
// function readTable(table, curIn) {
//     for (var input in table) {
//         var pattern = new RegExp(input.replace(/X/g, "[01]"));
//         if (pattern.test(curIn)) {
//             return table[input];
//         }
//     }
//     return "undefined"; // in case there are input combinations that are not covered in transition/output table
// }

addFields();
drawAll(myCanvas,myoptions,inputs);

document.getElementById("TBBtn").onclick = displayTBCode;