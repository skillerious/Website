/**
 * scripts.js – Markiva master enhancements
 * 2025‑04‑19  (mini‑game in Konami overlay)
 */
(() => {
  /* ────────────────────────────────────────────────────────────────
     DOM READY
  ───────────────────────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    console.log("Markiva enhanced script loaded.");

    /* Core UX */
    typeHeroTitle();
    setupSmoothScroll();
    setupScrollToTop();
    showRandomMarkivaTip();
    setupFeatureLikes();
    setupMarkivaShortcut();     // “markiva”
    setupKonamiEasterEgg();     // ↑↑↓↓←→←→BA + mini‑game
    setupReadingProgressBar();
    setupLazyLoadingImages();
    setupSectionHighlight();
    addCopyButtonsToCode();
    scheduleReadTimeBadge();    // docs page only

    /* Download‑page extras */
    detectOSAndHighlight();
    restoreRatings();
    animateInstallCounters();
  });

  /* ────────────────────────────────────────────────────────────────
     1) Typewriter hero effect
  ───────────────────────────────────────────────────────────────── */
  const typeHeroTitle = () => {
    const el = document.getElementById("heroTitle");
    if (!el) return;
    const txt = "Welcome to Markiva";
    let i = 0;
    (function tick() {
      if (i < txt.length) { el.textContent += txt[i++]; setTimeout(tick, 100); }
    })();
  };

  /* ────────────────────────────────────────────────────────────────
     2) Smooth scroll
  ───────────────────────────────────────────────────────────────── */
  const setupSmoothScroll = () => {
    document.querySelectorAll('a[href*="#"]').forEach(link => {
      link.addEventListener("click", e => {
        const href = link.getAttribute("href") || "";
        if (!href.includes("#")) return;
        const id = href.split("#")[1];
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
        }
      });
    });
  };

  /* ────────────────────────────────────────────────────────────────
     3) Scroll‑to‑top
  ───────────────────────────────────────────────────────────────── */
  const setupScrollToTop = () => {
    const btn = document.createElement("button");
    btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    btn.className = "btn btn-success";
    btn.style.cssText = "position:fixed;bottom:20px;right:20px;display:none;z-index:1050;";
    document.body.appendChild(btn);
    window.addEventListener("scroll", () => btn.style.display = window.pageYOffset > 300 ? "flex" : "none");
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  /* ────────────────────────────────────────────────────────────────
     4) Console tip
  ───────────────────────────────────────────────────────────────── */
  const showRandomMarkivaTip = () => {
    const tips = [
      "Tip: Explore Markiva's plugin system to expand capabilities!",
      "Tip: Keep your markdown well‑structured for collaboration.",
      "Tip: Use Markiva's dark theme for late‑night sessions.",
      "Tip: Advanced formatting: code blocks & syntax highlighting.",
      "Tip: Contribute on GitHub—your ideas are welcome!"
    ];
    console.log("\n---\nMarkiva Tip: " + tips[Math.floor(Math.random() * tips.length)] + "\n---\n");
  };

  /* ────────────────────────────────────────────────────────────────
     5) Feature‑card likes
  ───────────────────────────────────────────────────────────────── */
  const setupFeatureLikes = () => {
    document.querySelectorAll(".like-btn").forEach((btn, idx) => {
      const liked = localStorage.getItem(`featureLiked-${idx}`) === "true";
      updateLike(btn, liked);
      btn.addEventListener("click", () => {
        const now = !(localStorage.getItem(`featureLiked-${idx}`) === "true");
        localStorage.setItem(`featureLiked-${idx}`, now);
        updateLike(btn, now);
      });
    });
  };
  const updateLike = (btn, liked) => {
    btn.innerHTML = liked ? 'Liked <i class="bi bi-heart-fill"></i>' : 'Like <i class="bi bi-heart"></i>';
    btn.classList.toggle("btn-success", liked);
    btn.classList.toggle("btn-outline-success", !liked);
  };

  /* ────────────────────────────────────────────────────────────────
     6) “markiva” shortcut
  ───────────────────────────────────────────────────────────────── */
  const setupMarkivaShortcut = () => {
    const seq = "markiva";
    let typed = "";
    document.addEventListener("keydown", e => {
      typed += e.key.toLowerCase();
      if (!seq.startsWith(typed)) typed = "";
      if (typed === seq) { typed = ""; fireConfetti(); }
    });
  };
  const fireConfetti = () => {
    if (window.confetti) window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  /* ────────────────────────────────────────────────────────────────
     7) KONAMI CODE – now with mini‑game
  ───────────────────────────────────────────────────────────────── */
  const setupKonamiEasterEgg = () => {
    const canonical = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown",
                       "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let buffer = [];
    document.addEventListener("keydown", e => {
      buffer.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
      if (buffer.length > canonical.length) buffer.shift();
      if (canonical.every((v,i) => v.toLowerCase() === (buffer[i]||"").toLowerCase())) {
        buffer.length = 0; launchKonamiOverlay();
      }
    });
  };

  /* ------ Konami overlay & mini‑game ------ */
  const launchKonamiOverlay = () => {
    inject8bitCSS();
    play8bitBeep();

    const ov = document.createElement("div");
    ov.className = "pixel-rainbow";
    ov.style.cssText = "position:fixed;inset:0;display:flex;flex-direction:column;" +
                       "align-items:center;justify-content:center;font-family:'Press Start 2P',monospace;" +
                       "color:#fff;text-shadow:2px 2px #000;z-index:1200;padding:2rem;text-align:center;";
    ov.innerHTML = `
      <h1 style="font-size:2rem;">🚀 DEV PORTAL UNLOCKED 🚀</h1>
      <p style="margin:1rem 0 1.5rem;font-size:0.85rem;">Greetings, code ninja!</p>
      <div class="d-flex flex-wrap gap-3 justify-content-center">
        <button id="konFireworks" class="btn btn-warning btn-lg mb-2">
          Fireworks <i class="bi bi-stars"></i>
        </button>
        <button id="konRoadmap" class="btn btn-success btn-lg mb-2">
          Open Roadmap <i class="bi bi-github"></i>
        </button>
        <button id="konGame" class="btn btn-info btn-lg mb-2">
          Play Mini‑Game 🎮
        </button>
      </div>
      <p style="margin-top:2rem;font-size:0.7rem;">(Click anywhere or press ESC to close)</p>`;
    document.body.appendChild(ov);

    const close = () => ov.remove();
    ov.addEventListener("click", close);
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); }, { once: true });
    setTimeout(close, 15000);

    /* button actions */
    ov.querySelector("#konFireworks").addEventListener("click", burstConfetti);
    ov.querySelector("#konRoadmap").addEventListener("click",
      () => window.open("https://github.com/skillerious/markiva#roadmap", "_blank"));
    ov.querySelector("#konGame").addEventListener("click", e => {
      e.stopPropagation();
      startMiniGame(ov);   // convert overlay into game mode
    });
  };

  /* mini‑game implementation */
  const startMiniGame = overlay => {
    overlay.innerHTML = `
      <canvas id="gameCanvas" width="300" height="200"
              style="background:#000;border:3px solid #fff;border-radius:6px;"></canvas>
      <p id="scoreText" style="margin:0.5rem 0 1rem;font-size:0.8rem;">Score: 0</p>
      <button id="exitGame" class="btn btn-outline-light btn-sm">Exit Game</button>`;
    const cvs    = overlay.querySelector("#gameCanvas");
    const ctx    = cvs.getContext("2d");
    const scoreT = overlay.querySelector("#scoreText");
    const exitB  = overlay.querySelector("#exitGame");

    /* game state */
    const paddle = { w: 60, h: 8, x: 120, y: 180, speed: 4 };
    const ball   = { r: 5, x: 150, y: 100, dx: 2, dy: -2 };
    let score = 0, playing = true, keys = {};

    /* input */
    const keydown = e => keys[e.key.toLowerCase()] = true;
    const keyup   = e => keys[e.key.toLowerCase()] = false;
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup",   keyup);

    exitB.onclick = () => { playing = false; document.removeEventListener("keydown", keydown); document.removeEventListener("keyup", keyup); launchKonamiOverlay(); };

    /* game loop */
    const loop = () => {
      if (!playing) return;
      /* move paddle */
      if (keys["arrowleft"] || keys["a"]) paddle.x -= paddle.speed;
      if (keys["arrowright"] || keys["d"]) paddle.x += paddle.speed;
      paddle.x = Math.max(0, Math.min(cvs.width - paddle.w, paddle.x));

      /* move ball */
      ball.x += ball.dx; ball.y += ball.dy;
      /* wall bounce */
      if (ball.x < ball.r || ball.x > cvs.width - ball.r) ball.dx *= -1;
      if (ball.y < ball.r) ball.dy *= -1;

      /* paddle collision */
      if (ball.y + ball.r >= paddle.y &&
          ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
        ball.dy *= -1;
        ball.y = paddle.y - ball.r;
        score++; scoreT.textContent = `Score: ${score}`;
      }
      /* miss => game over */
      if (ball.y - ball.r > cvs.height) {
        playing = false;
        scoreT.textContent = `Game Over – Final Score: ${score}`;
        exitB.classList.add("btn-danger");
        return;
      }

      /* draw */
      ctx.fillStyle = "#000"; ctx.fillRect(0,0,cvs.width,cvs.height);
      ctx.fillStyle = "#fff";
      ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
      ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2); ctx.fill();

      requestAnimationFrame(loop);
    };
    loop();
  };

  /* helpers used by overlay */
  const inject8bitCSS = () => {
    if (document.getElementById("konami-style")) return;
    const s = document.createElement("style");
    s.id = "konami-style";
    s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    @keyframes pixelRainbow{0%{background-position:0 0;}100%{background-position:400% 0;}}
    .pixel-rainbow{
      background:linear-gradient(270deg,#ff0000,#ffa500,#ffff00,#00ff00,#00bfff,#8a2be2,#ff1493,#ff0000);
      background-size:400% 100%;
      animation:pixelRainbow 8s linear infinite;
    }`;
    document.head.appendChild(s);
  };
  const play8bitBeep = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.18);
    } catch (_) { /* no sound */ }
  };
  const burstConfetti = () => {
    if (!window.confetti) return;
    const end = Date.now() + 2000;
    (function frame() {
      window.confetti({ particleCount: 30, startVelocity: 25, spread: 360,
                        origin: { x: Math.random(), y: Math.random() - 0.2 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  /* ────────────────────────────────────────────────────────────────
     8) Reading progress bar
  ───────────────────────────────────────────────────────────────── */
  const setupReadingProgressBar = () => {
    const bar = document.getElementById("readingProgressBar");
    if (!bar) return;
    window.addEventListener("scroll", () => {
      const max = document.body.scrollHeight - window.innerHeight;
      bar.style.width = `${(document.documentElement.scrollTop / max) * 100}%`;
    });
  };

  /* ────────────────────────────────────────────────────────────────
     9) Lazy images
  ───────────────────────────────────────────────────────────────── */
  const setupLazyLoadingImages = () => {
    const imgs = document.querySelectorAll(".lazy-image");
    if (!imgs.length) return;
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          const src = img.getAttribute("data-src");
          if (src) img.src = src;
          img.removeAttribute("data-src");
          obs.unobserve(img);
        }
      });
    }, { threshold: 0.1 });
    imgs.forEach(img => io.observe(img));
  };

  /* ────────────────────────────────────────────────────────────────
     10) Section highlight nav
  ───────────────────────────────────────────────────────────────── */
  const setupSectionHighlight = () => {
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll('.navbar-nav a[href*="#"]');
    if (!sections.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          const id = ent.target.id;
          links.forEach(l => l.classList.toggle("active", l.hash.slice(1) === id));
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(sec => io.observe(sec));
  };

  /* ────────────────────────────────────────────────────────────────
     11) Copy‑code buttons
  ───────────────────────────────────────────────────────────────── */
  const addCopyButtonsToCode = () => {
    document.querySelectorAll("pre > code").forEach(code => {
      const btn = document.createElement("button");
      btn.className = "btn btn-sm btn-outline-success copy-btn";
      btn.style.cssText = "position:absolute;top:8px;right:8px;z-index:1;";
      btn.innerHTML = '<i class="bi bi-clipboard"></i>';
      btn.onclick = () => {
        navigator.clipboard.writeText(code.innerText)
          .then(() => btn.innerHTML = '<i class="bi bi-clipboard-check"></i>')
          .catch(() => alert("Copy failed"));
        setTimeout(() => btn.innerHTML = '<i class="bi bi-clipboard"></i>', 2000);
      };
      code.parentElement.style.position = "relative";
      code.parentElement.appendChild(btn);
    });
  };

  /* ────────────────────────────────────────────────────────────────
     12) Read‑time badge (docs page only)
  ───────────────────────────────────────────────────────────────── */
  const scheduleReadTimeBadge = () => {
    if (!window.location.pathname.toLowerCase().includes("documentation.html")) return;

    window.addEventListener("load", () => {
      const root = document.querySelector("#docContent") || document.body;
      const makeBadge = () => {
        const words = root.innerText.trim().split(/\s+/).filter(Boolean).length;
        const mins = Math.max(1, Math.round(words / 200));
        const badge = document.createElement("div");
        badge.className = "badge bg-success shadow position-fixed top-0 end-0 m-3";
        badge.style.zIndex = "1060";
        badge.textContent = `~${mins} min read`;
        document.body.appendChild(badge);
        setTimeout(() => badge.classList.add("opacity-0"), 6000);
      };
      const mo = new MutationObserver(() => { mo.disconnect(); makeBadge(); });
      mo.observe(root, { childList: true, subtree: true });
      setTimeout(() => { mo.disconnect(); makeBadge(); }, 2000);
    });
  };

  /* ────────────────────────────────────────────────────────────────
     13) Download‑page helpers
  ───────────────────────────────────────────────────────────────── */
  const detectOSAndHighlight = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("win"))       document.getElementById("winCard")?.classList.add("os-highlight");
    else if (ua.includes("mac"))  document.getElementById("macCard")?.classList.add("os-highlight");
    else if (ua.includes("linux") || ua.includes("ubuntu"))
                                  document.getElementById("linuxCard")?.classList.add("os-highlight");
  };

  const restoreRatings = () => {
    document.querySelectorAll(".stars").forEach(c => {
      const os = c.getAttribute("data-os");
      const saved = localStorage.getItem(`rating-${os}`);
      if (saved) highlightStars(os, parseInt(saved, 10));
    });
    document.querySelectorAll(".star").forEach(star => {
      star.addEventListener("click", function () {
        const rating = parseInt(this.getAttribute("data-star"), 10);
        const os = this.parentNode.getAttribute("data-os");
        localStorage.setItem(`rating-${os}`, rating);
        highlightStars(os, rating);
      });
    });
  };
  const highlightStars = (os, rating) => {
    const c = document.querySelector(`.stars[data-os="${os}"]`);
    if (!c) return;
    c.querySelectorAll(".star").forEach(star => {
      const v = parseInt(star.getAttribute("data-star"), 10);
      star.classList.toggle("text-warning", v <= rating);
      star.classList.toggle("text-secondary", v > rating);
    });
  };

  const copyCommand = cmd => navigator.clipboard.writeText(cmd)
    .then(() => alert(`Copied: ${cmd}`))
    .catch(err => console.error("Clipboard error:", err));

  const simulateInstall = os => {
    if (!["win", "mac", "linux"].includes(os)) return;
    const key = `${os}Count`;
    const cnt = (parseInt(localStorage.getItem(key) || "0", 10)) + 1;
    localStorage.setItem(key, cnt);
    updateInstallDisplay(os, cnt);
    if (window.confetti) window.confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } });
  };
  const updateInstallDisplay = (os, cnt) => {
    const map = { win: "winInstalls", mac: "macInstalls", linux: "linuxInstalls" };
    const el  = document.getElementById(map[os]);
    if (el) el.textContent = cnt;
  };

  const animateInstallCounters = () => {
    ["win", "mac", "linux"].forEach(os => {
      const cnt = parseInt(localStorage.getItem(`${os}Count`) || "0", 10);
      animateCounter({ win: "winInstalls", mac: "macInstalls", linux: "linuxInstalls" }[os], 0, cnt, 800);
    });
  };
  const animateCounter = (id, start, end, dur) => {
    const el = document.getElementById(id); if (!el) return;
    let st = null;
    const step = ts => {
      if (!st) st = ts;
      const p = Math.min((ts - st) / dur, 1);
      el.textContent = Math.floor(start + p * (end - start));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ────────────────────────────────────────────────────────────────
     14) Navbar highlight (exported)
  ───────────────────────────────────────────────────────────────── */
  const highlightCurrentPageNav = () => {
    const parts = window.location.pathname.split("/");
    let file = parts.pop() || "index.html";
    const hash = window.location.hash;
    if (file.toLowerCase() === "index.html") {
      if (hash) highlightLinkForHash(hash); else highlightLinkExact("index.html#hero");
      return;
    }
    highlightLinkExact(file);
  };
  const highlightLinkExact = href => {
    document.querySelectorAll(".navbar-nav a").forEach(l => {
      l.classList.toggle("active", ((l.getAttribute("href") || "").split("/").pop().toLowerCase() === href.toLowerCase()));
    });
  };
  const highlightLinkForHash = hash => {
    document.querySelectorAll(".navbar-nav a").forEach(l =>
      l.classList.toggle("active", (l.getAttribute("href") || "").endsWith(hash)));
  };

  /* expose helpers globally */
  window.copyCommand             = copyCommand;
  window.simulateInstall         = simulateInstall;
  window.highlightCurrentPageNav = highlightCurrentPageNav;

})();
