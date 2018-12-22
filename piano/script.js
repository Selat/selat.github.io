var id = 0;
var canvas = null;
var context = null;

function renderNotes() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.lineWidth = 5;
  for (var a = 0; a < 5; ++a) {
    context.beginPath();
    context.moveTo(0.1 * canvas.width, 0.1 * canvas.height * a + 0.2 * canvas.height);
    context.lineTo(0.9 * canvas.width, 0.1 * canvas.height * a + 0.2 * canvas.height);
    context.stroke();
  }

  var noteId = Math.floor(Math.random() * 11);
  context.beginPath();
  var arcCenterX = 0.4 * canvas.width + 0.2 * canvas.width * id;
  var arcCenterY = 0.15 * canvas.height + 0.05 * canvas.height * noteId;
  var noteRadius = 0.034 * canvas.width;
  context.arc(arcCenterX, arcCenterY, noteRadius, 0, 2 * Math.PI);
  context.moveTo(arcCenterX + noteRadius, arcCenterY);
  var topY = arcCenterY - 0.21 * canvas.height;
  if (noteId < 5) {
    topY = arcCenterY + 0.21 * canvas.height;
  }
  context.lineTo(arcCenterX + noteRadius, topY);
  context.stroke();

  id += 1;
  id %= 2;
}

function startApp() {
  var tempo = document.getElementById("tempo").value;
  var element = document.getElementById("tempo-menu");
  element.parentNode.removeChild(element);

  canvas = document.createElement("canvas");
  var minSide = Math.min(document.documentElement.clientWidth,
                         document.documentElement.clientHeight);
  canvas.width = minSide;
  canvas.height = minSide;
  document.body.insertBefore(canvas, document.body.childNodes[0]);

  context = canvas.getContext("2d");

  window.setInterval(renderNotes, 1000 * 60 / tempo);
  renderNotes();
}
