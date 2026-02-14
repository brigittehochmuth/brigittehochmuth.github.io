function setActiveNav(){
  const links = Array.from(document.querySelectorAll("nav a[href^='#']"));
  const secs  = links
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const obs = new IntersectionObserver((entries) => {
    let best = null;
    for (const e of entries){
      if (e.isIntersecting){
        if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
      }
    }
    if (!best) return;

    links.forEach(a => a.classList.remove("active"));
    const active = links.find(a => a.getAttribute("href") === `#${best.target.id}`);
    if (active) active.classList.add("active");
  }, { rootMargin: "-30% 0px -55% 0px", threshold: [0.15, 0.25, 0.4, 0.6] });

  secs.forEach(s => obs.observe(s));
}

function copyToClipboard(text){
  if (!text) return;
  navigator.clipboard.writeText(text);
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();

  const copyBtn = document.getElementById("copyEmailBtn");
  if (copyBtn){
    copyBtn.addEventListener("click", () => {
      const email = copyBtn.getAttribute("data-email");
      copyToClipboard(email);
      const old = copyBtn.textContent;
      copyBtn.textContent = "copied";
      setTimeout(() => copyBtn.textContent = old, 1200);
    });
  }
});
