// Confetti class
class Confetti {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * -100;
        this.size = Math.random() * (10 - 5) + 5;
        this.speed = Math.random() * (3 - 1) + 1;
    }

    fall() {
        this.y += this.speed;
        if (this.y > window.innerHeight) {
            this.y = Math.random() * -100;
            this.x = Math.random() * window.innerWidth;
        }
    }

    show() {
        let color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
        let confettiElement = document.createElement("div");
        confettiElement.style.position = "absolute";
        confettiElement.style.width = `${this.size}px`;
        confettiElement.style.height = `${this.size}px`;
        confettiElement.style.backgroundColor = color;
        confettiElement.style.borderRadius = "50%";
        confettiElement.style.left = `${this.x}px`;
        confettiElement.style.top = `${this.y}px`;

        document.querySelector(".confetti").appendChild(confettiElement);
    }
}

let confettiArray = [];

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        confettiArray.push(new Confetti());
    }
}

function animateConfetti() {
    document.querySelector(".confetti").innerHTML = ''; // Clear previous confetti
    confettiArray.forEach(confetti => {
        confetti.fall();
        confetti.show();
    });

    requestAnimationFrame(animateConfetti);
}

window.onload = function() {
    // Wait for the container's fade-in animation to finish
    const container = document.querySelector('.container');
    container.addEventListener('animationend', function() {
        // Start the confetti animation after the container has finished fading in
        createConfetti();
        animateConfetti();
    });
};
