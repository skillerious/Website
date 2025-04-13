// configLoader.js

// Helper function to update an element's text content
function updateElementText(id, text) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = text;
    }
  }
  
  // Helper function to update an element's attribute (e.g., href for links)
  function updateElementAttr(id, attr, value) {
    const el = document.getElementById(id);
    if (el) {
      el.setAttribute(attr, value);
    }
  }
  
  // Helper function to retrieve a value from a section, with fallback to global defaults
  function getValue(section, key, globalDefaults) {
    return section[key] || globalDefaults[key];
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    // Update fetch URL to point to your data folder
    fetch('data/config.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("Network error while fetching config.json");
        }
        return response.json();
      })
      .then(configData => {
        // Obtain global defaults (if defined)
        const globalDefaults = configData.global || {};
  
        // Update Windows card
        if (configData.downloads && configData.downloads.windows) {
          const winData = configData.downloads.windows;
          updateElementText('winVersion', getValue(winData, 'version', globalDefaults));
          updateElementText('winSize', winData.size);
          updateElementText('winUpdated', getValue(winData, 'updated', globalDefaults));
          updateElementAttr('winDownloadLink', 'href', winData.link);
        }
  
        // Update macOS card
        if (configData.downloads && configData.downloads.mac) {
          const macData = configData.downloads.mac;
          updateElementText('macVersion', getValue(macData, 'version', globalDefaults));
          updateElementText('macSize', macData.size);
          updateElementText('macUpdated', getValue(macData, 'updated', globalDefaults));
          updateElementAttr('macDownloadLink', 'href', macData.link);
        }
  
        // Update Linux card (both download links)
        if (configData.downloads && configData.downloads.linux) {
          const linuxData = configData.downloads.linux;
          updateElementText('linuxVersion', getValue(linuxData, 'version', globalDefaults));
          updateElementText('linuxSize', linuxData.size);
          updateElementText('linuxUpdated', getValue(linuxData, 'updated', globalDefaults));
          updateElementAttr('linuxAppImageLink', 'href', linuxData.link_appimage);
          updateElementAttr('linuxDebLink', 'href', linuxData.link_deb);
        }
  
        // Update Beta section
        if (configData.beta) {
          const betaData = configData.beta;
          updateElementText('betaVersion', getValue(betaData, 'version', globalDefaults));
          updateElementText('betaUpdated', getValue(betaData, 'updated', globalDefaults));
          updateElementAttr('betaDownloadLink', 'href', betaData.link);
        }
  
        // Update Alpha section
        if (configData.alpha) {
          const alphaData = configData.alpha;
          updateElementText('alphaVersion', getValue(alphaData, 'version', globalDefaults));
          updateElementText('alphaUpdated', getValue(alphaData, 'updated', globalDefaults));
          updateElementAttr('alphaDownloadLink', 'href', alphaData.link);
        }
  
        // Update Changelog section
        if (configData.changelog) {
          // If the changelog doesn't have its own version/released, fallback to global
          updateElementText('changelogVersion', getValue(configData.changelog, 'version', globalDefaults));
          updateElementText('changelogReleased', getValue(configData.changelog, 'released', globalDefaults));
          // Update the list of changelog entries
          const changelogList = document.getElementById('changelogEntries');
          if (changelogList) {
            changelogList.innerHTML = '';
            configData.changelog.entries.forEach(entry => {
              const li = document.createElement('li');
              li.innerHTML = `<i class="bi bi-check-lg text-success"></i> ${entry}`;
              changelogList.appendChild(li);
            });
          }
        }
      })
      .catch(error => {
        console.error("Error loading configuration:", error);
      });
  });
  