const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "green";
ctx.lineJoin = "round";

const alphas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function startNewPath(numberPoints) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  points = [];
  const enventId = canvas.addEventListener("click", function (event) {
    const point = {
      x: event.offsetX,
      y: event.offsetY,
      name: "City " + alphas[points.length],
    };
    ctx.font = "12px Arial";
    ctx.fillText(point.name, point.x + 10, point.y + 10);

    points.push(point);

    ctx.beginPath();
    ctx.arc(point.x, point.y, 3.5, 0, 2 * Math.PI);
    ctx.fill();

    if (points.length === numberPoints) {
      canvas.removeEventListener("click", event);
      const start = points[0];
      const path = littleTSP(points, start);
      console.log(path);
      drawArrowsBetweenPoints(path);
      // console.log(tour);
    }
  });
}

function drawArrowsBetweenPoints(path) {
  for (let i = 0; i < path.length - 1; i++) {
    currX = path[i].x;
    currY = path[i].y;
    nextPointX = path[i + 1] ? path[i + 1].x : undefined;
    nextPointY = path[i + 1] ? path[i + 1].y : undefined;
    if (nextPointX) {
      ctx.beginPath();
      ctx.lineWidth = i;
      ctx.moveTo(currX, currY);
      ctx.lineTo(nextPointX, nextPointY);
      ctx.stroke();
    }
  }
}

function littleTSP(cities, start) {
  // Initialize the tour with the starting city
  let tour = [start];
  // Create a set of unvisited cities
  let unvisited = new Set(cities);
  // Remove the starting city from the set of unvisited cities
  unvisited.delete(start);

  // While there are still unvisited cities
  while (unvisited.size > 0) {
    // Initialize the nearest city and distance to null
    let nearestCity = null;
    let nearestDistance = null;

    // Find the nearest unvisited city
    for (const city of unvisited) {
      const distance = getDistance(tour[tour.length - 1], city);
      if (nearestDistance === null || distance < nearestDistance) {
        nearestCity = city;
        nearestDistance = distance;
      }
    }

    // Add the nearest city to the tour and remove it from the set of unvisited cities
    tour.push(nearestCity);
    unvisited.delete(nearestCity);
  }

  // Return the final tour
  return tour;
}

function getDistance(city1, city2) {
  // Calculate the distance between city1 and city2 using the Euclidean distance formula
  const xDistance = city1.x - city2.x;
  const yDistance = city1.y - city2.y;
  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}

// // Example usage
// const cities = [
//   { name: "City A", x: 0, y: 0 },
//   { name: "City B", x: 10, y: 10 },
//   { name: "City C", x: 20, y: 20 },
//   { name: "City D", x: 30, y: 30 },
// ];
// const start = cities[0];
// const tour = littleTSP(cities, start);
// console.log(tour);

const toggle = document.querySelector(".toggle");
toggle.addEventListener("click", (e) => {
  const primary = getComputedStyle(document.documentElement).getPropertyValue("--primary");
  const darkButton = document.querySelector(".dark");
  const lightButton = document.querySelector(".light");
  const overLay = document.querySelector(".overlay");
  if (primary === " 255, 255, 255") {
    darkButton.style.display = "none";
    lightButton.style.display = "inline";
    document.documentElement.style.setProperty("--primary", " 51, 51, 51");
    document.documentElement.style.setProperty("--secondary", " 255, 255, 255");
    overLay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    canvas.style.backgroundImage = "url('./pic_white.png')";
  } else {
    darkButton.style.display = "inline";
    lightButton.style.display = "none";
    document.documentElement.style.setProperty("--primary", " 255, 255, 255");
    document.documentElement.style.setProperty("--secondary", " 51, 51, 51");
    overLay.style.backgroundColor = "rgba(0, 0, 0, 0.05)";
    canvas.style.backgroundImage = "url('./pic_black.png')";
  }
});

const generateButton = document.querySelector(".generate");
generateButton.addEventListener("click", (e) => {
  e.preventDefault();
  const numberPoints = document.querySelector(".numberCities").value;
  startNewPath(+numberPoints);
});
