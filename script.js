let oldPosition;

function addDivElements() {
  for (let i = 0; i < 392; i++) {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", determineIdValue(i));
    document.getElementById("container").appendChild(newDiv);
  }
}

function newId(x, y) {
  return "" + x + "/" + y;
}

function determineIdValue(number) {
  let xValue = 10 + number - 28 * Math.floor(number / 28);
  let yValue = 10 + Math.floor(number / 28);
  return newId(xValue, yValue);
}

function determinePosition(x, y) {
  let xValue = 10 + Math.floor(x / 50);
  let yValue = 10 + Math.floor(y / 50);
  return newId(xValue, yValue);
}

function orientImpact(idValue, remove) {
  changeColor(idValue, remove, "orange");
  let coordinates = idValue.split("/");
  coordinates[0] > 10 && changeColor(newId(coordinates[0] - 1, coordinates[1]), remove, "yellow");
  coordinates[1] > 10 && changeColor(newId(coordinates[0], coordinates[1] - 1), remove, "yellow");
  coordinates[0] < 37 && changeColor(newId(parseFloat(coordinates[0]) + 1, coordinates[1]), remove, "yellow");
  coordinates[1] < 23 && changeColor(newId(coordinates[0], parseFloat(coordinates[1]) + 1), remove, "yellow");
}

function changeColor(idValue, remove, color) {
  let target = document.getElementById(idValue).classList;
  remove < 0 ? target.remove(color) : target.add(color);
}

document.addEventListener("mouseover", function (e) {
  oldPosition && orientImpact(oldPosition, -1);
  let idValue = determinePosition(e.pageX, e.pageY);
  orientImpact(idValue, 1);
  oldPosition = idValue;
});

addDivElements();
