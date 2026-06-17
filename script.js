const levels = [
  "photo1.png",
  "photo2.png",
  "photo3.png",
  "photo4.png"
];

// I decided to go for 4 different stages for this puzzle. So I used 4 different photos of my dog. This is so the game isn't too long and repetitive because of the 2x2 puzzles. //

const tray = document.querySelector("#tray");
const pieceLayer = document.querySelector("#piece-layer");
const slots = document.querySelectorAll(".slot");

let currentLevel = 0;
loadLevel();
function loadLevel() {
  pieceLayer.innerHTML = "";
  let trayRect = tray.getBoundingClientRect();
  for (let i = 0; i < 4; i++) {

    // crops the img 2x2 into 4 pieces as I don't want the puzzle to be any larger. I think this is nice and simple, and it is easy to work with. //

    let piece = document.createElement("div");

    piece.classList.add("piece");
    piece.dataset.correct = i;
    piece.style.backgroundImage =
      "url(" + levels[currentLevel] + ")";

    piece.style.backgroundSize = "400px 400px";
    if (i == 0) {
      piece.style.backgroundPosition = "0px 0px";
    }
    if (i == 1) {
      piece.style.backgroundPosition = "-200px 0px";
    }
    if (i == 2) {
      piece.style.backgroundPosition = "0px -200px";
    }
    if (i == 3) {
      piece.style.backgroundPosition = "-200px -200px";
    }

// I got this information from the previous prompt that was used on the index.html file. Some things weren't working correctly so I had to use AI again to assist me on what I was doing wrong and why the code wasn't working properly. // 
// most of code I used I had to seek assistance outside of the course // 
//images were cropped inside the code instead of using external apps to insert images. I wanted to know if there was any way this could be done inside the code rather than using a different app because I didnt want 16 different image files in my code, I htought it could potentially be very confusing to work with and I wanted a clear structure to make it easy for my eyes so again, I had to search for resources to help with this part of the code. //

    piece.style.left = trayRect.left + 20 + "px";
    piece.style.top = trayRect.top + 10 + (i * 45) + "px";

    let dragging = false;
    let mouseX = 0;
    let mouseY = 0;

    piece.addEventListener("mousedown", (event) => {

      if (piece.dataset.locked == "true") {
        return;
      }

      dragging = true;
      let box = piece.getBoundingClientRect();

      mouseX = event.clientX - box.left;
      mouseY = event.clientY - box.top;

      piece.classList.add("dragging");
    });

    document.addEventListener("mousemove", (event) => {

      if (!dragging) {
        return;
      }

      piece.style.left =
        event.clientX - mouseX + "px";
      piece.style.top =
        event.clientY - mouseY + "px";
    });

    document.addEventListener("mouseup", () => {

      if (!dragging) {
        return;
      }

      dragging = false;
      piece.classList.remove("dragging");

      let correctSlot =
        slots[piece.dataset.correct];
      let slotRect =
        correctSlot.getBoundingClientRect();
      let pieceRect =
        piece.getBoundingClientRect();
      let x =
        pieceRect.left - slotRect.left;
      let y =
        pieceRect.top - slotRect.top;
      let distance =
        Math.sqrt(x * x + y * y);

      if (distance < 60) {

        piece.style.left =
          slotRect.left + "px";
        piece.style.top =
          slotRect.top + "px";
        piece.dataset.locked = "true";

        let lockedPieces =
          document.querySelectorAll(
            '[data-locked="true"]'
          );

        if (lockedPieces.length == 4) {

          setTimeout(() => {

            currentLevel++;

            if (currentLevel < levels.length) {

              loadLevel();

            } else {

              document.querySelector(
                "#complete-screen"
              ).style.display = "flex";
            }

          }, 700);
        }
      }
    });

    pieceLayer.appendChild(piece);
  }
}