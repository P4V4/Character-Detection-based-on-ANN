// script by Paco van der Putten
// copyright 2014, Paco van der Putten

$(document).ready(function () {

    $.getJSON("dataset/dataset.json", function (brain) {
        console.log("got " + brain.data.length + " letters from brain dataset");
    });

    // vars
    var mousePressed = false;
    var ctx, lastX, lastY;
    var yCounter = 0;
    var yCoord = 0;
    var minY = 120;
    var minX = 120;
    var maxX = 0;
    var maxY = 0;
    var characterData = [];
    var blockData = [];

    // pixel to block counters
    var xPixel = 0;
    var yPixel = 0;
    var xBlock = 1;
    var yBlock = 1;

    // the block with 80 datasets
    var id = 0;
    var theBlock = [];

    for (c = 0; c < 80; c++) {
        theBlock.push({color: 0});
    }

    function initDrawing() {
        ctx = document.getElementById('canvas').getContext("2d");

        $('#canvas').mousedown(function (e) {
            mousePressed = true;
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
        });

        $('#canvas').mousemove(function (e) {
            if (mousePressed) {
                Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
            }
        });

        $('#canvas').mouseup(function (e) {
            mousePressed = false;
        });
        $('#canvas').mouseleave(function (e) {
            mousePressed = false;
        });
    }

    function Draw(x, y, isDown) {
        if (isDown) {
            ctx.beginPath();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 5;
            ctx.lineJoin = "round";
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
        }
        lastX = x; lastY = y;
    }

    initDrawing();

    function initProcess() {
        for (a = 0; a < 12000; a++) {
            if (yCounter == 100) {
                yCoord += 1;
                yCounter = 0;
            }
            if (ctx.getImageData(yCounter, yCoord, 1, 1).data[3] >= 1) {
                //colorset.push({ x: yCounter, y: yCoord });
                //console.log(colorset[a])
                if (minX >= yCounter) {
                    minX = yCounter;
                }
                if (minY >= yCoord) {
                    minY = yCoord;
                }
                if (maxX <= yCounter) {
                    maxX = yCounter;
                }
                if (maxY <= yCoord) {
                    maxY = yCoord;
                }
            }
            yCounter += 1;
        }
        
        // display max and min X/Y canvas values
        //console.log(colorset);
        console.log("Min X: " + minX);
        console.log("Min Y: " + minY);
        console.log("Max X: " + maxX);
        console.log("Max Y: " + maxY + "\n");

        ctx.lineWidth = 1;
        ctx.beginPath();

        ctx.moveTo(minX, minY);
        ctx.lineTo(minX, maxY);

        ctx.moveTo(minX, minY);
        ctx.lineTo(maxX, minY);

        ctx.moveTo(maxX, minY);
        ctx.lineTo(maxX, maxY);

        ctx.moveTo(minX, maxY);
        ctx.lineTo(maxX, maxY);

        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 2;
        ctx.stroke();

        // calculate width/height
        characterData.width = maxX - minX;
        characterData.height = maxY - minY;

        console.log("Character Width: " + characterData.width + " pixels");
        console.log("Character Height: " + characterData.height + " pixels \n");

        // calculate block values
        blockData.blockWidth = characterData.width / 8;
        blockData.blockHeight = characterData.height / 10;

        console.log("Block Width: " + blockData.blockWidth + " pixels");
        console.log("Block Height: " + blockData.blockHeight + " pixels \n");

        console.log("Rounded Block Width: " + Math.round(blockData.blockWidth) + " pixels");
        console.log("Rounded Block Height: " + Math.round(blockData.blockHeight) + " pixels \n");

        checkBlocks();
    }

    // In the following function the script checks which blocks are set with the value 1.

    // CODE NOTE: 80 blocks to check from canvas data

    function checkBlocks() {
        
        // ctx.fillRect(99, 10, 1, 1);

        for (b = 0; b < characterData.width * characterData.height; b++) {

            // pixel and block calcs here
            if (characterData.width * (yPixel + 1) == b) {
                yPixel++;
                xPixel = 0;
                xBlock = 0;
                if (yPixel == Math.round(blockData.blockHeight) * yBlock) {
                    yBlock++;
                    if (yBlock == 11) {
                        yBlock = 10;
                    }
                }
            }
            if (xPixel == Math.round(blockData.blockWidth) * xBlock) {
                xBlock++;
            }

            // block exec code here
            // ----------------------------------------------------------------------------------------------- //

            //console.log("xPixel: " + xPixel + " xBlock: " + xBlock + " yBlock: " + yBlock);

            //console.log("xPixel: " + xPixel + " yPixel: " + yPixel);
            // add minX and minY
            //console.log(ctx.getImageData(xPixel + minX, yPixel + minY, 1, 1).data);
            
            if (ctx.getImageData(xPixel + minX, yPixel + minY, 1, 1).data[3] == 255 && ctx.getImageData(xPixel + minX, yPixel + minY, 1, 1).data[0] == 000) {
                id = (xBlock + (yBlock - 1) * 8) - 1;
                theBlock[id] = { color: 1, x: xBlock, y: yBlock };
            }
            
            

            xPixel++;

        }

        console.log(theBlock);

        for (d = 0; d < 80; d++) {
            if (theBlock[d].color == 1) {
                ctx.fillStyle = "#FF0000";
                ctx.fillRect(theBlock[d].x * Math.round(blockData.blockWidth) + minX - Math.round(blockData.blockWidth), theBlock[d].y * Math.round(blockData.blockHeight) + minY - Math.round(blockData.blockHeight), Math.round(blockData.blockWidth), Math.round(blockData.blockHeight));
            }
        }

        brain();

    }

    function brain() {
        // this is the brain function which processes all inputs based on an artificial neural network with 80 input nodes and 1 output node (winner takes all) 
    }

    $("#startProcess").click(function () {
        initProcess();
    });
});