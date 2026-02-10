const music = document.getElementById("bgMusic");
const hint = document.getElementById("hint");
const noBtn = document.getElementById("noBtn");

function switchScreen(n) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("screen" + n).classList.add("active");
}

function start() {
  music.volume = 0.4;
  music.play();
  switchScreen(2);
  revealLetter();
}

function ask() {
  switchScreen(3);
}

/* YES */
function yes() {
  document.getElementById("fade").classList.add("show");

  const glow = document.getElementById("glow");
  glow.style.left = "50%";
  glow.style.top = "50%";
  glow.classList.add("show");

  music.volume = 0.65;

  setTimeout(() => {
    switchScreen(4);
    showFinal();
  }, 2200);
}

/* Letter animation */
function revealLetter() {
  document.querySelectorAll(".letter p").forEach((p, i) => {
    setTimeout(() => p.classList.add("show"), i * 450);
  });
}

/* Final reveal */
function showFinal() {
  const photo = document.querySelector(".photo");
  const text = document.querySelectorAll(".final-letter p");

  setTimeout(() => photo.classList.add("show"), 300);
  text.forEach((p, i) => {
    setTimeout(() => p.classList.add("show"), 1200 + i * 500);
  });
}

/* NO smooth movement + quotes */
const noQuotes = [
  "“Are you sure? My heart is right here.” 💗",
  "“Some stories deserve a yes.” ✨",
  "“This moment is a little special.” 💕",
  "“You’re making my heart wait.” 😌",
  "“Still hoping… still smiling.” 💖",
  "“Love is patient, you know.” 😉",
  "“Every great story starts with courage.” 🌸",
  "“I’d still choose you.” ❤️",
  "“Alright… I’m still here.” 💫"
];

let quoteIndex = 0;

noBtn.addEventListener("mouseenter", () => {
  hint.textContent = noQuotes[quoteIndex % noQuotes.length];
  hint.style.opacity = 1;
  quoteIndex++;

  const x = Math.random() * 180 - 90;
  const y = Math.random() * 90 - 45;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
});
