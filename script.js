const music = document.getElementById("bgMusic");
const hint = document.getElementById("hint");
const noBtn = document.getElementById("noBtn");

/* Screen switch */
function switchScreen(n) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );
  document.getElementById("screen" + n).classList.add("active");
}

/* Start */
function start() {
  music.volume = 0.4;
  music.play();
  switchScreen(2);
  revealLetter();
}

function ask() {
  switchScreen(3);
}

/* YES – cinematic + heart sparks */
function yes() {
  document.getElementById("fade").classList.add("show");

  const glow = document.getElementById("glow");
  glow.style.left = "50%";
  glow.style.top = "50%";
  glow.classList.add("show");

  music.volume = 0.65;

  // 💥 heart firecrackers
  heartSparks(1);
  setTimeout(() => heartSparks(0.6), 300);

  setTimeout(() => {
    switchScreen(4);
    showFinal();
  }, 2200);
}

/* Letter reveal */
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

/* 💥 Heart spark firecrackers */
function heartSparks(intensity = 1) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const isLowEnd =
    window.innerWidth < 420 || navigator.hardwareConcurrency <= 4;

  const baseCount = isLowEnd ? 10 : 22;
  const count = Math.floor(baseCount * intensity);

  const hearts = ["💖", "💗", "💘", "❤️"];

  for (let i = 0; i < count; i++) {
    const spark = document.createElement("div");
    spark.className = "heart-spark";
    spark.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = (80 + Math.random() * 120) * intensity;

    spark.style.left = centerX + "px";
    spark.style.top = centerY + "px";
    spark.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 900);
  }
}
