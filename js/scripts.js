/**
 * scripts.js - Full advanced features for Markiva website
 */
document.addEventListener("DOMContentLoaded", function () {
  console.log("Markiva advanced website loaded successfully!");

  // 1) Typewriter effect in hero (#heroTitle) if present
  typeHeroTitle();

  // 2) Smooth scroll for nav links
  setupSmoothScroll();

  // 3) Scroll-to-top button
  setupScrollToTop();

  // 4) Random Markiva tips
  showRandomMarkivaTip();

  // 5) Like buttons on features
  setupFeatureLikes();

  // 6) Keyboard shortcut Easter Egg + confetti (type "markiva")
  setupKeyboardShortcuts();

  // 7) Reading progress bar
  setupReadingProgressBar();

  // 8) Lazy loading images (if used in index / showcase)
  setupLazyLoadingImages();

  // 9) Optional: Nav highlight on scroll (intersection observer)
  setupSectionHighlight();

  // 10) If on download.html, OS detection highlight, star ratings, etc.
  detectOSAndHighlight();
  restoreRatings();
  animateInstallCounters();
});

/** 1) Typewriter Effect */
function typeHeroTitle() {
  const heroTitle = document.getElementById("heroTitle");
  if (!heroTitle) return;

  const text = "Welcome to Markiva";
  let idx = 0;

  function typeChar() {
    if (idx < text.length) {
      heroTitle.textContent += text.charAt(idx);
      idx++;
      setTimeout(typeChar, 100);
    }
  }
  typeChar();
}

/** 2) Smooth Scroll for Nav Links */
function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"], a[href^="index.html#"]');
  links.forEach(link => {
    link.addEventListener("click", function(e) {
      const href = link.getAttribute("href");
      if (!href.includes("#")) return;
      const anchor = href.split("#")[1];
      const targetElem = document.getElementById(anchor);
      if (targetElem) {
        e.preventDefault();
        window.scrollTo({
          top: targetElem.offsetTop - 70,
          behavior: "smooth"
        });
      }
    });
  });
}

/** 3) Scroll-to-Top Button */
function setupScrollToTop() {
  const btn = document.createElement("button");
  btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
  btn.classList.add("btn", "btn-success", "scroll-to-top-btn");
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    btn.style.display = window.pageYOffset > 300 ? "flex" : "none";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/** 4) Random Markiva Tips in Console */
function showRandomMarkivaTip() {
  const tips = [
    "Tip: Explore Markiva's plugin system to expand capabilities!",
    "Tip: Keep your markdown well-structured for collaboration.",
    "Tip: Use Markiva's dark theme for late-night sessions.",
    "Tip: Check out advanced formatting with code blocks & syntax highlighting.",
    "Tip: Contribute to Markiva on GitHub—your ideas are welcome!"
  ];
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  console.log(`\n---\nMarkiva Tip: ${randomTip}\n---\n`);
}

/** 5) Like Buttons on Feature Cards */
function setupFeatureLikes() {
  const likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach((btn, index) => {
    const isLiked = localStorage.getItem(`featureLiked-${index}`) === "true";
    if (isLiked) {
      btn.innerHTML = 'Liked <i class="bi bi-heart-fill"></i>';
      toggleButtonStyle(btn, true);
    }

    btn.addEventListener("click", function() {
      const currentlyLiked = localStorage.getItem(`featureLiked-${index}`) === "true";
      const newValue = !currentlyLiked;
      localStorage.setItem(`featureLiked-${index}`, newValue.toString());

      if (newValue) {
        btn.innerHTML = 'Liked <i class="bi bi-heart-fill"></i>';
      } else {
        btn.innerHTML = 'Like <i class="bi bi-heart"></i>';
      }
      toggleButtonStyle(btn, newValue);
    });
  });
}

function toggleButtonStyle(button, liked) {
  const colorClass = "success";
  if (liked) {
    button.classList.remove(`btn-outline-${colorClass}`);
    button.classList.add(`btn-${colorClass}`);
  } else {
    button.classList.remove(`btn-${colorClass}`);
    button.classList.add(`btn-outline-${colorClass}`);
  }
}

/** 6) Keyboard Shortcut Easter Egg + Confetti (type "markiva") */
function setupKeyboardShortcuts() {
  const secretCode = "markiva";
  let userInput = "";

  document.addEventListener("keydown", e => {
    userInput += e.key.toLowerCase();
    if (!secretCode.startsWith(userInput)) {
      userInput = "";
      return;
    }
    if (userInput === secretCode) {
      userInput = "";
      fireConfetti();
    }
  });
}

function fireConfetti() {
  if (typeof confetti !== "undefined") {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

/** 7) Reading Progress Bar */
function setupReadingProgressBar() {
  const progressBar = document.getElementById("readingProgressBar");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const fraction = docHeight ? scrollTop / docHeight : 0;
    const percentScrolled = Math.floor(fraction * 100);

    progressBar.style.width = `${percentScrolled}%`;
  });
}

/** 8) Lazy Loading Images */
function setupLazyLoadingImages() {
  const lazyImages = document.querySelectorAll(".lazy-image");
  if (!lazyImages.length) return;

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  function onIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const dataSrc = img.getAttribute("data-src");
        if (dataSrc) {
          img.src = dataSrc;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  }

  const observer = new IntersectionObserver(onIntersection, observerOptions);
  lazyImages.forEach(img => observer.observe(img));
}

/** 9) Auto Nav Highlight on Scroll (Intersection Observer) */
function setupSectionHighlight() {
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"], .navbar-nav a[href^="index.html#"]');
  if (!sections.length || !navLinks.length) return;

  const observerCallback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.remove("active");
          const anchorPart = link.getAttribute("href").split("#")[1];
          if (anchorPart === sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });
  sections.forEach(sec => observer.observe(sec));
}

/** 10) Additional Download Page Features (OS detection, star ratings, install counters, etc.) */
function detectOSAndHighlight() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) {
    const winCard = document.getElementById("winCard");
    if (winCard) winCard.classList.add("os-highlight");
  } else if (ua.includes("mac")) {
    const macCard = document.getElementById("macCard");
    if (macCard) macCard.classList.add("os-highlight");
  } else if (ua.includes("linux") || ua.includes("ubuntu")) {
    const linuxCard = document.getElementById("linuxCard");
    if (linuxCard) linuxCard.classList.add("os-highlight");
  }
}

function restoreRatings() {
  const starContainers = document.querySelectorAll(".stars");
  starContainers.forEach(container => {
    const os = container.getAttribute("data-os");
    const storedRating = localStorage.getItem(`rating-${os}`);
    if (storedRating) {
      highlightStars(os, parseInt(storedRating, 10));
    }
  });

  const allStars = document.querySelectorAll(".star");
  allStars.forEach(star => {
    star.addEventListener("click", function() {
      const rating = parseInt(this.getAttribute("data-star"), 10);
      const os = this.parentNode.getAttribute("data-os");
      localStorage.setItem(`rating-${os}`, rating.toString());
      highlightStars(os, rating);
    });
  });
}

function highlightStars(os, rating) {
  const starContainer = document.querySelector(`.stars[data-os="${os}"]`);
  if (!starContainer) return;
  const stars = starContainer.querySelectorAll(".star");
  stars.forEach(s => {
    const starVal = parseInt(s.getAttribute("data-star"), 10);
    if (starVal <= rating) {
      s.classList.remove("text-secondary");
      s.classList.add("text-warning");
    } else {
      s.classList.remove("text-warning");
      s.classList.add("text-secondary");
    }
  });
}

function copyCommand(command) {
  navigator.clipboard.writeText(command).then(() => {
    alert(`Copied: ${command}`);
  }).catch(err => console.error("Clipboard error:", err));
}

function simulateInstall(os) {
  if (!["win", "mac", "linux"].includes(os)) return;
  const key = `${os}Count`;
  let currentCount = parseInt(localStorage.getItem(key) || "0", 10);
  currentCount++;
  localStorage.setItem(key, currentCount.toString());
  updateInstallDisplay(os, currentCount);

  if (typeof confetti !== "undefined") {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  }
}

function updateInstallDisplay(os, count) {
  // If you place "winInstalls", "macInstalls", "linuxInstalls" somewhere, this updates them
  const idMap = {
    win: "winInstalls",
    mac: "macInstalls",
    linux: "linuxInstalls"
  };
  const elemId = idMap[os];
  if (!elemId) return;
  const span = document.getElementById(elemId);
  if (span) span.textContent = count;
}

function animateInstallCounters() {
  const winCount = parseInt(localStorage.getItem("winCount") || "0", 10);
  const macCount = parseInt(localStorage.getItem("macCount") || "0", 10);
  const linuxCount = parseInt(localStorage.getItem("linuxCount") || "0", 10);

  animateCounter("winInstalls", 0, winCount, 800);
  animateCounter("macInstalls", 0, macCount, 800);
  animateCounter("linuxInstalls", 0, linuxCount, 800);
}

function animateCounter(elementId, start, end, duration) {
  const elem = document.getElementById(elementId);
  if (!elem) return;

  let startTime = null;

  function update(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const fraction = Math.min(progress / duration, 1);
    const currentVal = Math.floor(start + fraction * (end - start));
    elem.textContent = currentVal;
    if (fraction < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}
