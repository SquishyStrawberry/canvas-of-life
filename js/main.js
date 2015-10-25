/* jshint undef: true, unused: true */
/* globals document, window */
document.addEventListener("DOMContentLoaded", function() {
    var canvas, context, lastCall;
    var board = {
        width: 10,
        height: 10,
        map: [],
        getCell: function(y, x) {
            return this.map[y * this.height + x];
        }
    };
    board.tsize = board.width * board.height;

    window.addEventListener("resize", function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    function init() {
        canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        context = canvas.getContext("2d");
        document.body.appendChild(canvas);
        for (var i=0; i < board.tsize; ++i) {
            board.map.push(~~(Math.random() * 2));
        }
        window.requestAnimationFrame(loop);
    }

    function update() {

    }

    function draw() {
        context.beginPath();
        var rect = {
            width: canvas.width / board.width,
            height: canvas.height / board.height
        };
        for (var y=0; y < board.height; ++y) {
            for (var x=0; x < board.width; ++x) {
                var method = board.getCell(y, x) ? context.fillRect : context.strokeRect;
                method.call(context, rect.width * x, rect.height * y, rect.width, rect.height);
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
