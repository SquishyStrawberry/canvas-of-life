/* jshint undef: true, unused: true */
/* globals document, window*/

var __updateEvery = 0.20,
    __changeBy = 0,
    __paused = false;

document.addEventListener("DOMContentLoaded", function() {
    var canvas, context, lastCall;
    var interval = 0;
    var board = {
        width: 10,
        height: 10,
        map: [],
        getCell: function(y, x) {
            return this.map[y * this.height + x];
        },
        setCell: function(y, x, v) {
            this.map[y * this.height + x] = v;
        },
        getAliveNeighbors: function(y, x) {
            var total = 0;
            for (var i=-1; i < 2; ++i) {
                for (var j=-1; j < 2; ++j) {
                    if (i === 0 && j === 0) continue;
                    var ny = y + i;
                    var nx = x + j;
                    if (ny < 0 || nx < 0 || ny >= this.height || nx >= this.width) continue;
                    total += this.getCell(ny, nx) ? 1 : 0;
                }
            }
            return total;
        }
    };
    board.tsize = board.width * board.height;

    window.addEventListener("resize", function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    window.addEventListener("click", function(e) {
        var r = canvas.getBoundingClientRect();
        var y = e.clientY - r.top;
        var x = e.clientX - r.left;
        var rect = {
            width: canvas.width / board.width,
            height: canvas.height / board.height
        };
        var boardY = ~~(y / rect.height);
        var boardX = ~~(x / rect.width);
        board.setCell(boardY, boardX, !board.getCell(boardY, boardX));
        __changeBy = 1;
    });

    window.addEventListener("keypress", function(e) {
        if (e.key === " ") __paused = !__paused;
    });

    function init() {
        canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        context = canvas.getContext("2d");
        document.body.appendChild(canvas);
        for (var i=0; i < board.tsize; ++i) {
            board.map.push(0);
        }
        window.requestAnimationFrame(loop);
    }

    function updateBoard() {
        var newMap = [];
        for (var y=0; y < board.height; ++y) {
            for (var x=0; x < board.width; ++x) {
                var cellIsAlive = board.getCell(y, x);
                var neighbors = board.getAliveNeighbors(y, x);
                if (cellIsAlive) {
                    newMap.push((neighbors === 2 || neighbors === 3) ? 1 : 0);
                }
                else {
                    newMap.push((neighbors === 3) ? 1: 0);
                }
            }
        }
        board.map = newMap;
    }

    function update(dt) {
        if (interval >= __updateEvery + __changeBy) {
            if(!__paused) updateBoard();
            interval = 0;
            __changeBy = 0;
        }
        interval += dt;
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        var rect = {
            width: canvas.width / board.width,
            height: canvas.height / board.height
        };
        for (var y=0; y < board.height; ++y) {
            for (var x=0; x < board.width; ++x) {
                if (board.getCell(y, x)) {
                    context.fillStyle = __paused ? "tomato" : "rebeccapurple";
                    context.fillRect(rect.width * x, rect.height * y, rect.width, rect.height);
                }
                context.strokeRect(rect.width * x, rect.height * y, rect.width, rect.height);
            }
        }
        context.stroke();
    }

    function loop(timestamp) {
        if (typeof lastCall !== "undefined") {
            update((timestamp - lastCall) / 1000.0);
            draw();
        }
        lastCall = timestamp;
        window.requestAnimationFrame(loop);
    }

    init();
});
