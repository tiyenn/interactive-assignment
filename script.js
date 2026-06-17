const levels = [
  "photo1.png",
  "photo2.png"
];

const board = document.getElementById("board");
const tray = document.getElementById("tray");
const pieceLayer = document.getElementById("piece-layer");
const slots = document.querySelectorAll(".slot");

let currentLevel = 0;

loadLevel();

function loadLevel(){

  pieceLayer.innerHTML = "";

  const trayRect = tray.getBoundingClientRect();

  for(let i = 0; i < 4; i++){

    const piece = document.createElement("div");

    piece.classList.add("piece");

    piece.dataset.correct = i;

    piece.style.backgroundImage =
      `url(${levels[currentLevel]})`;

    piece.style.backgroundSize = "400px 400px";

    const bgX = (i % 2) * 200;
    const bgY = Math.floor(i / 2) * 200;

    piece.style.backgroundPosition =
      `-${bgX}px -${bgY}px`;

    piece.style.left =
      `${trayRect.left + 20}px`;

    piece.style.top =
      `${trayRect.top + 10 + (i * 45)}px`;

    enableDrag(piece);

    pieceLayer.appendChild(piece);
  }
}

function enableDrag(piece){

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  piece.addEventListener("pointerdown", e => {

    if(piece.dataset.locked) return;

    dragging = true;

    piece.classList.add("dragging");

    const rect = piece.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

  });

  document.addEventListener("pointermove", e => {

    if(!dragging) return;

    piece.style.left =
      `${e.clientX - offsetX}px`;

    piece.style.top =
      `${e.clientY - offsetY}px`;

  });

  document.addEventListener("pointerup", () => {

    if(!dragging) return;

    dragging = false;

    piece.classList.remove("dragging");

    snapPiece(piece);

  });

}

function snapPiece(piece){

  const targetSlot =
    slots[piece.dataset.correct];

  const slotRect =
    targetSlot.getBoundingClientRect();

  const pieceRect =
    piece.getBoundingClientRect();

  const distance = Math.hypot(
    pieceRect.left - slotRect.left,
    pieceRect.top - slotRect.top
  );

  if(distance < 60){

    piece.style.left =
      `${slotRect.left}px`;

    piece.style.top =
      `${slotRect.top}px`;

    piece.dataset.locked = "true";

    checkWin();
  }
}

function checkWin(){

  const locked =
    document.querySelectorAll(
      '[data-locked="true"]'
    );

  if(locked.length !== 4) return;

  setTimeout(() => {

    currentLevel++;

    if(currentLevel < levels.length){

      loadLevel();

    }
    else{

      document.getElementById(
        "complete-screen"
      ).style.display = "flex";

    }

  }, 700);

}