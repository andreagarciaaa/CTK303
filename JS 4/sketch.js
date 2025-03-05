let stars = [];
let numStars = 300; // Number of stars
let shootingStar;
let shootingStarActive = false;

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.id('canvas3');
    cnv.parent('movecanvas');

    // Create regular stars
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }

    // Initialize shooting star
    shootingStar = new ShootingStar();

    // Trigger shooting star every 15 seconds (15,000 ms)
    setInterval(() => {
        shootingStar = new ShootingStar(); // Create new shooting star
        shootingStarActive = true; // Activate it
    }, 15000); // 15 seconds
}

function draw() {
    background(0); // Black background

    // Update and display regular stars
    for (let star of stars) {
        star.update();
        star.display();
    }

    // Shooting star logic
    if (shootingStarActive) {
        shootingStar.update();
        shootingStar.display();

        // Deactivate once it leaves the screen
        if (shootingStar.isOffScreen()) {
            shootingStarActive = false;
        }
    }
}

// Resize canvas dynamically
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Regular Star Class
class Star {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(20, 60);
        this.speed = random(1, 5);
        this.opacity = 255;
    }

    update() {
        this.y += this.speed;

        if (this.y > height) {
            this.y = -this.size;
            this.x = random(width);
        }

        if (this.y > height / 2) {
            this.opacity = map(this.y, height / 3, height, 255, 0);
        } else {
            this.opacity = 255;
        }
    }

    display() {
        fill(255, 255, 100, this.opacity); // Soft yellow stars
        textSize(this.size);
        text("⋆", this.x, this.y);
    }
}

// Shooting Star Class with fading trail
class ShootingStar {
    constructor() {
        this.x = random(-200, -50); // Start off-screen to the left
        this.y = random(height / 4); // Random vertical starting point
        this.speedX = random(10, 15); // Horizontal speed
        this.speedY = random(2, 5);  // Slight downward diagonal
        this.size = random(20, 40);  // Slightly larger for impact
        this.trail = [];
        this.angle = random(PI / 6, PI / 4); // Diagonal angle
    }

    update() {
        // Add current position to trail
        this.trail.push({ x: this.x, y: this.y, alpha: 255 });

        // Limit trail length
        if (this.trail.length > 20) {
            this.trail.shift();
        }

        // Move shooting star at an angle
        this.x += this.speedX * cos(this.angle);
        this.y += this.speedY * sin(this.angle);

        // Fade trail over time
        for (let point of this.trail) {
            point.alpha -= 10; // Faster fade for the trail
        }
    }

    display() {
        // Draw fading trail
        for (let point of this.trail) {
            fill(255, 255, 255, point.alpha); // White trail
            noStroke();
            textSize(this.size / 2);
            text("⋆", point.x, point.y);
        }

        // Draw the shooting star itself (white star shape)
        fill(255);
        textSize(this.size);
        text("⋆", this.x, this.y);
    }

    isOffScreen() {
        return this.x > width || this.y > height;
    }
}
