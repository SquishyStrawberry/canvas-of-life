/* jshint undef: true, unused: true */
/* globals document, window */
document.addEventListener("DOMContentLoaded", function() {
    var canvas, context;
    var board, lastCall;

    function init() {
        canvas = document.createElement("canvas");
        context = canvas.getContext("2d");
        document.body.appendChild(canvas);
        window.requestAnimationFrame(loop);
    }

    function update(dt) {

    }

    function draw() {

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
