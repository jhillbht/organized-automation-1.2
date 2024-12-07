document.addEventListener('DOMContentLoaded', async () => {
  // Initialize stats
  const stats = {
    containers: 0,
    properties: 0,
    tags: 0
  };

  // Update UI with stats
  function updateStats() {
    Object.keys(stats).forEach(key => {
      const element = document.getElementById(key);
      if (element) {
        element.querySelector('.value').textContent = stats[key];
      }
    });
  }

  // Event Listeners
  document.getElementById('audit').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://your-webapp-url.com/audit' });
  });

  document.getElementById('compare').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://your-webapp-url.com/compare' });
  });

  document.getElementById('add').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://your-webapp-url.com/add-account' });
  });

  // Load initial stats
  chrome.storage.local.get(['stats'], (result) => {
    if (result.stats) {
      Object.assign(stats, result.stats);
      updateStats();
    }
  });
});