const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let baseWidth = 400;
let baseHeight = 400;

// Set canvas width and height explicitly
canvas.width = baseWidth;
canvas.height = baseHeight;

let angle1 = 0;
let angle2 = 0;
let spinning = false;
let lightOn = false;

function scaleToCanvas() {
  // This will scale the content to fit inside the canvas size.
  const scale = Math.min(canvas.clientWidth / baseWidth, canvas.clientHeight / baseHeight);
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Scale the drawing to fit the canvas size
  scaleToCanvas();

  // Set up the drawing styles
  ctx.fillStyle = "BLACK";  
  ctx.font = "30px Arial"; 
  ctx.textAlign = "center";


  // Draw light effect when activated
  if (lightOn) {
    ctx.fillStyle = "rgba(255, 255, 100, 0.75)";
    ctx.beginPath();
    ctx.moveTo(205, 187);
    ctx.lineTo(400, 120);
    ctx.lineTo(400, 255);
    ctx.closePath();
    ctx.fill();
  }

  // Draw rotating objects
  ctx.save();
  ctx.translate(69, 130);
  ctx.scale(0.5, 0.5);
  if (spinning) angle1 += 0.25;
  ctx.rotate(angle1);
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(0, 0, 25, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgb(205, 203, 203)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(15, 0);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.translate(100, 120);
  ctx.scale(0.5, 0.5);
  if (spinning) angle2 += 0.25;
  ctx.rotate(angle2);
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(0, 0, 40, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgb(205, 203, 203)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(30, 0);
  ctx.stroke();
  ctx.restore();

  // Draw additional objects on the canvas
  ctx.fillStyle = "rgb(50, 50, 50)";
  ctx.fillRect(50, 150, 120, 60);
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(200, 185, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgb(70, 70, 70)";
  ctx.fillRect(60, 140, 60, 10);
  ctx.fillStyle = "rgb(20, 20, 20)";
  ctx.beginPath();
  ctx.moveTo(170, 160);
  ctx.lineTo(210, 160);
  ctx.lineTo(220, 185);
  ctx.lineTo(210, 210);
  ctx.lineTo(170, 210);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgb(90, 90, 90)";
  ctx.fillRect(40, 210, 130, 10);
  ctx.fillStyle = "rgb(70, 70, 70)";
  ctx.fillRect(110, 220, 10, 30);

  // Draw more objects on the canvas
  ctx.strokeStyle = "rgb(10, 10, 10)";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(110, 250); ctx.lineTo(90, 390);
  ctx.moveTo(120, 250); ctx.lineTo(140, 390);
  ctx.moveTo(115, 250); ctx.lineTo(115, 390);
  ctx.stroke();

  ctx.fillStyle = "rgb(30, 30, 30)";
  ctx.beginPath();
  ctx.arc(40, 180, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgb(60, 60, 60)";
  ctx.beginPath();
  ctx.arc(40, 180, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.beginPath(); ctx.arc(110, 170, 5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(90, 185, 5, 0, Math.PI * 2); ctx.fill();
}

// Event listeners to control animation state
canvas.addEventListener("mousedown", () => {
  spinning = true;
  lightOn = true;
});

canvas.addEventListener("mouseup", () => {
  spinning = false;
  lightOn = false;
});

// Animation function that runs the drawing loop
function animate() {
  draw();
  requestAnimationFrame(animate);
}

// Start the animation loop
animate();


// Show the overlay with the film details
function showOverlay(film) {
  // Set content based on the clicked film
  if (film === 'inception') {
    document.getElementById('movie-title').innerText = 'Inception';
    document.getElementById('movie-description').innerText = 'A skilled thief, the absolute best in the dangerous art of extraction, steals valuable secrets from deep within the subconscious during the dream state.';
  }

  // Display the overlay
  document.getElementById('overlay').style.display = 'flex';
}

// Close the overlay
function closeOverlay() {
  document.getElementById('overlay').style.display = 'none';
}


watchlistButton.addEventListener('click', () => {
  const movie = {
    title: "Catch Me If You Can",
    image: "../images/catchme.jpg",
    description: "Frank Abagnale Jr., a brilliant teenage con artist...",
    link: "catchme.html"
  };

  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  const alreadyAdded = watchlist.some(item => item.title === movie.title);
  if (!alreadyAdded) {
    watchlist.push(movie);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    alert('Added to Watchlist!');
  } else {
    alert('Already in Watchlist!');
  }
});
