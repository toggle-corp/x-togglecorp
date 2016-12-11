$(document).ready(function() {
    var canvas = document.getElementById("the-canvas");
    window.addEventListener('resize', resizeCanvas, false);
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }
    resizeCanvas();
    draw();

});

var particles = [];

function initParticles() {
    var canvas = document.getElementById("the-canvas");

    // Create particles uniformly with random velocities
    particles = [];
    var numCols = 6;
    var numRows = 6;
    for (var i=0; i<numCols; i++) {
        for (var j=0; j<numRows; j++) {

            var x = i / numCols * canvas.width + canvas.width/numCols*0.5 * (j%2);
            var y = j / numRows * canvas.height;

            var vx = (Math.random()*2-1)/2;
            var vy = (Math.random()*2-1)/2;
            var va = (Math.random()*2-1)*1.23;
            var angle =  Math.random()*200;
            var sx = 0.7;//Math.random()*1.2;
            var sy = 0.7;//Math.random()*1.2;
            var sides = 6; //parseInt(Math.random()*(6-3)+3);
            var alpha = Math.random()*0.5;
            var valpha = 0.004*0.5;

            particles.push({
                x: x + canvas.width/numCols*0.25, y: y + canvas.height/numRows*0.25,
                vx: vx, vy: vy, angle: angle, va: va,
                sx: sx, sy: sy, sides: sides, alpha: alpha, valpha: valpha,
                connector: (i%2 == 0 || j%2 == 0)
            });
        }
    }
}

function draw() {
    var canvas = document.getElementById("the-canvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i=0; i<particles.length; i++) {
        var particle = particles[i];
        // Draw each particle
        context.beginPath();
        // context.arc(particle.x, particle.y, 5, 0, 2 * Math.PI, false);
        context.save();
        context.fillStyle = 'rgba(255,255,255,' + particle.alpha + ')';
        context.translate(particle.x, particle.y);
        context.rotate(particle.angle*Math.PI/180);
        context.scale(particle.sx, particle.sy);
        // context.fillRect(-4, -4, 8, 8);

        context.beginPath();
        context.moveTo (-4 +  8 * Math.cos(0), -4 +  8 *  Math.sin(0));
        for (var k=1; k <= particle.sides; k++) {
            context.lineTo (-4 + 8 * Math.cos(k * 2 * Math.PI / particle.sides), -4 + 8 * Math.sin(k * 2 * Math.PI / particle.sides));
        }
        context.fill();

        context.restore();

        // For connectors, connect with three nearest points
        if (particle.connector) {
            var minDist1 = canvas.width;
            var minParticle1;
            for (var j=0; j<particles.length; j++) {
                var dist = Math.abs(particles[j].x - particle.x) + Math.abs(particles[j].y - particle.y);
                if (minDist1 > dist) {
                    minDist1 = dist;
                    minParticle1 = particles[j];
                }
            }

            var minDist2 = canvas.width;
            var minParticle2;
            for (var j=0; j<particles.length; j++) {
                var dist = Math.abs(particles[j].x - particle.x) + Math.abs(particles[j].y - particle.y);
                if (minDist2 > dist && particles[j] != minParticle1) {
                    minDist2 = dist;
                    minParticle2 = particles[j];
                }
            }

            var minDist3 = canvas.width;
            var minParticle3;
            for (var j=0; j<particles.length; j++) {
                var dist = Math.abs(particles[j].x - particle.x) + Math.abs(particles[j].y - particle.y);
                if (minDist2 > dist && particles[j] != minParticle1 && particles[j] != minParticle2) {
                    minDist3 = dist;
                    minParticle3 = particles[j];
                }
            }

            context.beginPath();
            context.strokeStyle = 'rgba(255,255,255,0.02)';
            if (minParticle1) {
                context.moveTo(particle.x, particle.y);
                context.lineTo(minParticle1.x, minParticle1.y);
            }
            if (minParticle2) {
                context.moveTo(particle.x, particle.y);
                context.lineTo(minParticle2.x, minParticle2.y);
            }
            if (minParticle3) {
                context.moveTo(particle.x, particle.y);
                context.lineTo(minParticle3.x, minParticle3.y);
            }
            context.stroke();
        }

        // Animate by velocity
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x >= canvas.width)
            particle.vx *= -1;
        if (particle.y < 0 || particle.y >= canvas.height)
            particle.vy *= -1;
        particle.angle += particle.va;

        particle.alpha += particle.valpha;
        if (particle.alpha <= 0 || particle.alpha >= 0.5)
            particle.valpha *= -1;
    }

    window.setTimeout(draw, 1000/60);
}
