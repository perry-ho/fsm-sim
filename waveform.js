var myCanvas = document.getElementById("myCanvas");
myCanvas.width = 500;
myCanvas.height = 500;
  
var ctx = myCanvas.getContext("2d");
// var inputs = ["11100011100","00111100000"]
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
    // var resetStr = inputs[0];
    // resetStr = (resetStr.replace(/1/g, "0")).replace("0","1");
    // var reset = new Waveform(
    //     myCanvas,
    //     resetStr,
    //     options,
    //     wavecount,
    //     "RST"
    // )
    // wavecount++;
    // reset.draw();

    // var Ta = new Waveform(
    //     myCanvas,
    //     input1,
    //     options,
    //     wavecount,
    //     "Ta"
    // )
    // wavecount++;
    // Ta.draw();

    // var Tb = new Waveform(
    //     myCanvas,
    //     input2,
    //     options,
    //     wavecount,
    //     "Tb"
    // )
    // wavecount++;
    // Tb.draw();

    // var nextState = new stateWave(
    //     myCanvas,
    //     "00012230011",
    //     options,
    //     wavecount,
    //     "S'"
    // )
    // wavecount++;
    // nextState.draw();

    // var curState = new stateWave(
    //     myCanvas,
    //     "?0001223001",
    //     options,
    //     wavecount,
    //     "S"
    // )
    // wavecount++;
    // curState.draw();

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
    // n = FSM._states.length;
    // for (var i=0; i<n;i++){
    var stateArr = [];
    var stateName = [];
    // var outputA = [];
    // var outputB = [];
    var outputs = [];
    
    stateArr[0] = FSM._resetState;
    stateName[0] = stateArr[0]._name;

    outputs[0] =  getOutput(stateArr[0], inputs[0][0]);
    // for (var i =0;i<FSM._outputs.length;i++){
    //     outputs[i][0] = outputstr[i];
    // }
    // outputA[0] = stateArr[0]._outputs.slice(0,2);
    // outputB[0] = stateArr[0]._outputs.slice(2);


    for (var j=0;j<inputs[0].length;j++){
        var inputstr= "";
        for (var i=0; i<inputs.length; i++){
            inputstr = inputstr + inputs[i][j];
        }
        // var inputstr= inputs[0][j]+inputs[1][j];
        stateName[j+1] = readTable (stateArr[j]._transition, inputstr);
        stateArr[j+1] = FSM._stateObj[stateName[j+1]];
        if (FSM._type == "Moore"){
            outputs[j+1] = getOutput(stateArr[j+1], inputs[0][0]);
        }
        else {
            outputs[j] = getOutput(stateArr[j], inputs[0][j]);
        }
        // for (var i =0;i<FSM._outputs.length;i++){
        //     outputs[i][j+1] = outputstr[i];
        // }
        // outputA[j+1] = stateArr[j+1]._outputs.slice(0,2);
        // outputB[j+1] = stateArr[j+1]._outputs.slice(2);
    }

    // stateName[1] = readTable (stateArr[0]._transition, inputs[0][0]+inputs[1][0]);
    // stateArr[1] = FSM._stateObj[stateName[1]];
    // stateName[2] = readTable (stateArr[1]._transition, inputs[0][1]+inputs[1][1]);    
    // readTable(FSM._curState._transition, curIn)
    var curState = new stateWave(
        myCanvas,
        stateName,
        options,
        wavecount,
        "S"
    )
    wavecount++;
    curState.draw();
    
    if (!(typeof FSM._outputs === 'string' || FSM._outputs instanceof String)) {
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
    var n = FSM._inputs.length;
    var test = 1;
    var length = container.childNodes[1].value.length;
    for (var i=0; i<n;i++){
        test = test && isNumberString(container.childNodes[i*3+1].value) && (length == container.childNodes[i*3+1].value.length);
    }
    // var test = isNumberString(form.inputbox1.value) && isNumberString(form.inputbox2.value) && (form.inputbox1.value.length == form.inputbox2.value.length);
    if (!test)
        alert("Input(s) invalid");
    else {
        for (var i=0; i<n;i++){
            inputs[i] = container.childNodes[i*3+1].value;
        }
        // inputs[0] = form.inputbox1.value;
        // inputs[1] = form.inputbox2.value;
        drawAll(myCanvas,myoptions,inputs);
    }
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
    // var button = document.createElement("input");
    // button.name = "button";
    // button.type = "button";
    // button.value = "submit";
    // button.onclick = "updateWave()";
    // container.appendChild(button);
    // container.appendChild(document.createElement("br"));
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