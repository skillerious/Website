/**
 * scripts.js - Advanced feature enhancements for Markiva website
 */
(() => {
  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", () => {
    console.log("Markiva advanced website loaded successfully!");
    
    // Initialize features
    typeHeroTitle();
    setupSmoothScroll();
    setupScrollToTop();
    showRandomMarkivaTip();
    setupFeatureLikes();
    setupKeyboardShortcuts();
    setupReadingProgressBar();
    setupLazyLoadingImages();
    setupSectionHighlight();
    
    // Additional Download Page features
    detectOSAndHighlight();
    restoreRatings();
    animateInstallCounters();
  });
  
  /* 1) Typewriter Effect for the hero title */
  const typeHeroTitle = () => {
    const heroTitle = document.getElementById("heroTitle");
    if (!heroTitle) return;
    
    const text = "Welcome to Markiva";
    let idx = 0;
    
    const typeChar = () => {
      if (idx < text.length) {
        heroTitle.textContent += text.charAt(idx);
        idx++;
        setTimeout(typeChar, 100);
      }
    };
    typeChar();
  };
  
  /* 2) Smooth Scroll for Navigation Links */
  const setupSmoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"], a[href^="index.html#"]');
    links.forEach(link => {
      link.addEventListener("click", e => {
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
  };
  
  /* 3) Scroll-to-Top Button Setup */
  const setupScrollToTop = () => {
    const btn = document.createElement("button");
    btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    btn.classList.add("btn", "btn-success", "scroll-to-top-btn");
    document.body.appendChild(btn);
    
    // Toggle button display based on scroll position
    window.addEventListener("scroll", () => {
      btn.style.display = (window.pageYOffset > 300) ? "flex" : "none";
    });
    
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };
  
  /* 4) Display a Random Markiva Tip in the Console */
  const showRandomMarkivaTip = () => {
    const tips = [
      "Tip: Explore Markiva's plugin system to expand capabilities!",
      "Tip: Keep your markdown well-structured for collaboration.",
      "Tip: Use Markiva's dark theme for late-night sessions.",
      "Tip: Check out advanced formatting with code blocks & syntax highlighting.",
      "Tip: Contribute to Markiva on GitHub—your ideas are welcome!"
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    console.log(`\n---\nMarkiva Tip: ${randomTip}\n---\n`);
  };
  
  /* 5) Setup Like Buttons on Feature Cards */
  const setupFeatureLikes = () => {
    const likeButtons = document.querySelectorAll(".like-btn");
    likeButtons.forEach((btn, index) => {
      // Check for previous like status in localStorage
      const isLiked = localStorage.getItem(`featureLiked-${index}`) === "true";
      updateLikeButton(btn, isLiked);
      
      btn.addEventListener("click", () => {
        // Toggle like status
        const currentlyLiked = localStorage.getItem(`featureLiked-${index}`) === "true";
        const newStatus = !currentlyLiked;
        localStorage.setItem(`featureLiked-${index}`, newStatus.toString());
        updateLikeButton(btn, newStatus);
      });
    });
  };
  
  // Helper for updating like button state and style
  const updateLikeButton = (button, liked) => {
    const colorClass = "success";
    button.innerHTML = liked ? 'Liked <i class="bi bi-heart-fill"></i>' : 'Like <i class="bi bi-heart"></i>';
    
    if (liked) {
      button.classList.remove(`btn-outline-${colorClass}`);
      button.classList.add(`btn-${colorClass}`);
    } else {
      button.classList.remove(`btn-${colorClass}`);
      button.classList.add(`btn-outline-${colorClass}`);
    }
  };
  
  /* 6) Keyboard Shortcut Easter Egg with Confetti (Type "markiva") */
  const setupKeyboardShortcuts = () => {
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
  };
  
  const fireConfetti = () => {
    if (typeof confetti !== "undefined") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };
  
  /* 7) Reading Progress Bar for long pages */
  const setupReadingProgressBar = () => {
    const progressBar = document.getElementById("readingProgressBar");
    if (!progressBar) return;
    
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const fraction = (docHeight !== 0) ? scrollTop / docHeight : 0;
      const percentScrolled = Math.floor(fraction * 100);
      progressBar.style.width = `${percentScrolled}%`;
    });
  };
  
  /* 8) Lazy Loading of Images for performance optimization */
  const setupLazyLoadingImages = () => {
    const lazyImages = document.querySelectorAll(".lazy-image");
    if (!lazyImages.length) return;
    
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };
    
    const onIntersection = (entries, observer) => {
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
    };
    
    const observer = new IntersectionObserver(onIntersection, observerOptions);
    lazyImages.forEach(img => observer.observe(img));
  };
  
  /* 9) Dynamic Navigation Highlighting while Scrolling */
  const setupSectionHighlight = () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"], .navbar-nav a[href^="index.html#"]');
    if (!sections.length || !navLinks.length) return;
    
    const observerOptions = { threshold: 0.1 };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          // Remove active class from all nav links
          navLinks.forEach(link => link.classList.remove("active"));
          // Highlight the matching nav link
          navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (href && href.includes("#")) {
              const anchorPart = href.split("#")[1];
              if (anchorPart === sectionId) {
                link.classList.add("active");
              }
            }
          });
        }
      });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
  };
  
  /* 10) Download Page Features: OS detection, star ratings, and install counters */
  const detectOSAndHighlight = () => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("win")) {
      document.getElementById("winCard")?.classList.add("os-highlight");
    } else if (ua.includes("mac")) {
      document.getElementById("macCard")?.classList.add("os-highlight");
    } else if (ua.includes("linux") || ua.includes("ubuntu")) {
      document.getElementById("linuxCard")?.classList.add("os-highlight");
    }
  };
  
  /* Restore saved star ratings and setup click events for ratings */
  const restoreRatings = () => {
    const starContainers = document.querySelectorAll(".stars");
    starContainers.forEach(container => {
      const os = container.getAttribute("data-os");
      const storedRating = localStorage.getItem(`rating-${os}`);
      if (storedRating) {
        highlightStars(os, parseInt(storedRating, 10));
      }
    });
    
    // Attach event listeners to each star for rating input
    document.querySelectorAll(".star").forEach(star => {
      star.addEventListener("click", function() {
        const rating = parseInt(this.getAttribute("data-star"), 10);
        const os = this.parentNode.getAttribute("data-os");
        localStorage.setItem(`rating-${os}`, rating.toString());
        highlightStars(os, rating);
      });
    });
  };
  
  const highlightStars = (os, rating) => {
    const starContainer = document.querySelector(`.stars[data-os="${os}"]`);
    if (!starContainer) return;
    const stars = starContainer.querySelectorAll(".star");
    stars.forEach(star => {
      const starVal = parseInt(star.getAttribute("data-star"), 10);
      if (starVal <= rating) {
        star.classList.remove("text-secondary");
        star.classList.add("text-warning");
      } else {
        star.classList.remove("text-warning");
        star.classList.add("text-secondary");
      }
    });
  };
  
  /* Helper functions for installation simulation and counter animation */
  const copyCommand = (command) => {
    navigator.clipboard.writeText(command)
      .then(() => alert(`Copied: ${command}`))
      .catch(err => console.error("Clipboard error:", err));
  };
  
  const simulateInstall = (os) => {
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
  };
  
  const updateInstallDisplay = (os, count) => {
    const idMap = { win: "winInstalls", mac: "macInstalls", linux: "linuxInstalls" };
    const elemId = idMap[os];
    if (!elemId) return;
    const span = document.getElementById(elemId);
    if (span) span.textContent = count;
  };
  
  /* Animate install counters for each OS */
  const animateInstallCounters = () => {
    const winCount = parseInt(localStorage.getItem("winCount") || "0", 10);
    const macCount = parseInt(localStorage.getItem("macCount") || "0", 10);
    const linuxCount = parseInt(localStorage.getItem("linuxCount") || "0", 10);
    
    animateCounter("winInstalls", 0, winCount, 800);
    animateCounter("macInstalls", 0, macCount, 800);
    animateCounter("linuxInstalls", 0, linuxCount, 800);
  };
  
  const animateCounter = (elementId, start, end, duration) => {
    const elem = document.getElementById(elementId);
    if (!elem) return;
    
    let startTime = null;
    const update = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const fraction = Math.min(progress / duration, 1);
      const currentVal = Math.floor(start + fraction * (end - start));
      elem.textContent = currentVal;
      if (fraction < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  };
  
  /* Highlight current page navigation link based on URL */
  const highlightCurrentPageNav = () => {
    const pathParts = window.location.pathname.split("/");
    let currentFile = pathParts.pop().toLowerCase() || "index.html";
    if (!currentFile) currentFile = "index.html";
    
    const currentHash = window.location.hash; // e.g. "#features"
    
    // If on index.html, highlight by hash or default to #hero
    if (currentFile === "index.html") {
      if (currentHash) {
        highlightLinkForHash(currentHash);
      } else {
        highlightLinkExact("index.html#hero");
      }
      // IntersectionObserver will handle further updates
      return;
    }
    
    // For other pages (download.html, contact.html, etc.)
    highlightLinkExact(currentFile);
  };
  
  const highlightLinkExact = (hrefToMatch) => {
    const navLinks = document.querySelectorAll(".navbar-nav a");
    navLinks.forEach(link => link.classList.remove("active"));
    
    navLinks.forEach(link => {
      let linkHref = (link.getAttribute("href") || "").split("/").pop().toLowerCase();
      if (linkHref === hrefToMatch.toLowerCase()) {
        link.classList.add("active");
      }
    });
  };
  
  const highlightLinkForHash = (hash) => {
    const navLinks = document.querySelectorAll(".navbar-nav a");
    navLinks.forEach(link => link.classList.remove("active"));
    
    navLinks.forEach(link => {
      const href = link.getAttribute("href") || "";
      if (href.endsWith(hash)) {
        link.classList.add("active");
      }
    });
  };
  
  // Expose some functions to window if needed (for example, for other inline calls)
  window.copyCommand = copyCommand;
  window.simulateInstall = simulateInstall;
  window.highlightCurrentPageNav = highlightCurrentPageNav;
})();
