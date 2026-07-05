/* ============================================================
   HAPPY BIRTHDAY // DARSHAN — interactions
   ============================================================ */

/* ---------- 1. Scroll reveal ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.14 });
  items.forEach((el) => io.observe(el));
}

/* ---------- 3. Engine audio (real Yamaha RX-100 / Kawasaki clips) ---------- */
const rev = document.getElementById("bikeRev");
const idle = document.getElementById("bikeIdle");
const toggle = document.getElementById("soundToggle");
const soundState = document.getElementById("soundState");
let soundOn = false;

function setSound(on) {
  soundOn = on;
  toggle.setAttribute("aria-pressed", String(on));
  soundState.textContent = on ? "ON" : "OFF";
  if (idle) {
    idle.volume = 0.18;
    if (on) { idle.play().catch(() => {}); } else { idle.pause(); }
  }
}
function revEngine() {
  if (!soundOn || !rev) return;
  try { rev.currentTime = 0; rev.volume = 0.9; rev.play().catch(() => {}); } catch (_) {}
}

/* ---------- 4. Confetti (angular red / mint / cream shards) ---------- */
const canvas = document.getElementById("confetti");
const ctx = canvas ? canvas.getContext("2d") : null;
let pieces = [];
let rafId = null;
const COLORS = ["#ff4655", "#18e5c4", "#ece8e1", "#ff6f7b"];

function sizeCanvas() { if (canvas) { canvas.width = innerWidth; canvas.height = innerHeight; } }

function burst(count = 150) {
  if (!ctx) return;
  const cx = innerWidth / 2;
  for (let i = 0; i < count; i++) {
    pieces.push({
      x: cx + (Math.random() - 0.5) * 260,
      y: -20 - Math.random() * innerHeight * 0.25,
      w: 3 + Math.random() * 4, h: 8 + Math.random() * 12,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      vx: (Math.random() - 0.5) * 4, vy: 3 + Math.random() * 5,
      rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
    });
  }
  if (!rafId) loop();
}
function loop() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach((p) => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.rot += p.vr;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  });
  pieces = pieces.filter((p) => p.y < canvas.height + 40);
  if (pieces.length) rafId = requestAnimationFrame(loop);
  else { rafId = null; ctx.clearRect(0, 0, canvas.width, canvas.height); }
}

/* ---------- Init ---------- */
addEventListener("resize", sizeCanvas);
document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  sizeCanvas();

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) setTimeout(() => burst(170), 450);

  if (toggle) toggle.addEventListener("click", () => setSound(!soundOn));

  // Any [data-rev] control fires the engine + a confetti pop
  document.querySelectorAll("[data-rev]").forEach((el) => {
    el.addEventListener("click", () => { revEngine(); burst(120); });
  });
});
