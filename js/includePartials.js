// js/includePartials.js
window.addEventListener('DOMContentLoaded', () => {
  // Insert the navbar
  const navbarContainer = document.getElementById('navbarContainer');
  if (navbarContainer) {
    fetch('partials/navbar.html')
      .then(resp => resp.text())
      .then(html => {
        navbarContainer.innerHTML = html;
        // highlightCurrentPageNav(); // optional if you have a function that highlights the current link
      })
      .catch(err => console.error('Error loading navbar:', err));
  }

  // Insert the footer
  const footerContainer = document.getElementById('footerContainer');
  if (footerContainer) {
    fetch('partials/footer.html')
      .then(resp => resp.text())
      .then(html => {
        footerContainer.innerHTML = html;
        const yearEl = footerContainer.querySelector('#footerYear');
        if (yearEl) {
          yearEl.textContent = new Date().getFullYear();
        }
      })
      .catch(err => console.error('Error loading footer:', err));
  }
});
