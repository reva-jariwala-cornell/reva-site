// Update active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveNav() {
  const scrollY = window.scrollY;
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === "#" + current) link.classList.add("active");
  });
}

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);

// Cursor bulb + fairy dust
const wrap = document.querySelector(".cursor-cursor-wrap");
const bulb = document.querySelector(".cursor-bulb");
const dustEl = document.getElementById("cursor-dust");

const purpleShades = ["#9b8ab5", "#7c6b9a", "#b8a9c9", "#6b5b8a", "#a78bba", "#c4b5d4"];
const sparkleChars = ["✦", "✧", "∗", "⁕", "✺", "✹"];

if (wrap && bulb && dustEl) {
  // Create purple sparkles
  const sparkleCount = 14;
  for (let i = 0; i < sparkleCount; i++) {
    const s = document.createElement("span");
    s.className = "sparkle";
    s.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
    const left = 30 + (Math.random() - 0.5) * 40;
    const top = 30 + (Math.random() - 0.5) * 40;
    s.style.left = left + "px";
    s.style.top = top + "px";
    s.style.color = purpleShades[Math.floor(Math.random() * purpleShades.length)];
    s.style.animationDelay = Math.random() * 1.2 + "s";
    dustEl.appendChild(s);
  }

  let mouseX = -100, mouseY = -100;
  let x = -100, y = -100;
  let dx = -100, dy = -100;
  let started = false;
  const easeBulb = 0.14;
  const easeDust = 0.07;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!started) {
      x = mouseX;
      y = mouseY;
      dx = mouseX;
      dy = mouseY;
      started = true;
    }
    wrap.classList.add("visible");
  });

  function animate() {
    x += (mouseX - x) * easeBulb;
    y += (mouseY - y) * easeBulb;
    dx += (x - dx) * easeDust;
    dy += (y - dy) * easeDust;

    bulb.style.left = x + "px";
    bulb.style.top = y + "px";
    dustEl.style.left = dx + "px";
    dustEl.style.top = dy + "px";
    requestAnimationFrame(animate);
  }
  animate();
}
