/**
 * scripts.js - Feature-rich JS for your Markiva landing pages
 * (Scroll-to-top, confetti Easter egg, reading progress bar, etc.)
 */

document.addEventListener("DOMContentLoaded", function () {
    console.log("Markiva advanced website loaded successfully!");
  
    // 1) Smooth scroll for nav links
    setupSmoothScroll();
  
    // 2) Scroll-to-top button
    setupScrollToTop();
  
    // 3) Random Markiva tips in console
    showRandomMarkivaTip();
  
    // 4) Keyboard shortcut Easter Egg + confetti
    setupKeyboardShortcuts();
  
    // 5) Reading progress bar
    setupReadingProgressBar();
  
    // (Optional) If you also want to handle "like" buttons or typewriter,
    // you can add them in the download page or remove them if unneeded.
    // We'll include them for completeness:
  
    setupFeatureLikes(); // "Like" buttons for features
    typeHeroTitle();     // Typewriter effect if a heroTitle exists
  });
  
  /** 1) Smooth Scroll for Navigation Links */
  function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href !== "#" && href !== "") {
          const targetID = href.substring(1);
          const targetElem = document.getElementById(targetID);
          if (targetElem) {
            e.preventDefault();
            window.scrollTo({
              top: targetElem.offsetTop - 70, // offset for fixed-top navbar
              behavior: "smooth",
            });
          }
        }
      });
    });
  }
  
  /** 2) Scroll-to-Top Button */
  function setupScrollToTop() {
    const btn = document.createElement("button");
    btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    btn.classList.add("btn", "btn-success", "scroll-to-top-btn");
    document.body.appendChild(btn);
  
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        btn.style.display = "flex";
      } else {
        btn.style.display = "none";
      }
    });
  
    btn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
  
  /** 3) Random Markiva Tips in the Console */
  function showRandomMarkivaTip() {
    const tips = [
      "Tip: Explore Markiva's plugin system to expand capabilities!",
      "Tip: Keep your markdown well-structured for collaboration.",
      "Tip: Use Markiva's dark theme for late-night writing sessions.",
      "Tip: Check out advanced formatting with code blocks & syntax highlighting.",
      "Tip: Contribute to Markiva on GitHub—your ideas are welcome!"
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    console.log(`\n---\nMarkiva Tip: ${randomTip}\n---\n`);
  }
  
  /** 4) Keyboard Shortcut Easter Egg + Confetti */
  function setupKeyboardShortcuts() {
    const secretCode = "markiva";
    let userInput = "";
  
    document.addEventListener("keydown", (e) => {
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
  
  /** 5) Reading Progress Bar */
  function setupReadingProgressBar() {
    const progressBar = document.getElementById("readingProgressBar");
    if (!progressBar) return;
  
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = docHeight ? scrollTop / docHeight : 0;
      const percentScrolled = Math.floor(scrollFraction * 100);
      progressBar.style.width = `${percentScrolled}%`;
    });
  }
  
  /** 6) Like Buttons on Feature Cards (if the page has them) */
  function setupFeatureLikes() {
    const likeButtons = document.querySelectorAll(".like-btn");
    likeButtons.forEach((btn, index) => {
      // Check if previously liked in localStorage
      const isLiked = localStorage.getItem(`featureLiked-${index}`) === "true";
      if (isLiked) {
        btn.innerHTML = 'Liked <i class="bi bi-heart-fill"></i>';
        toggleButtonStyle(btn, true);
      }
  
      btn.addEventListener("click", function () {
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
  
  /** 7) Typewriter effect if #heroTitle exists */
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
  