document.getElementById("toggle").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: toggleDarkMode,
    });
  });
});

function toggleDarkMode() {
  const styleId = "custom-dark-mode-style";
  const existingStyle = document.getElementById(styleId);

  if (existingStyle) {
    existingStyle.remove(); // turn off dark mode
  } else {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerText = `
      html, body {
        background-color:rgb(50, 46, 46) !important;
        color:rgb(211, 206, 206) !important;
      }
      * {
        background-color: transparent !important;
        border-color: #333 !important;
        color: #e0e0e0 !important;
      }
    `;
    document.head.appendChild(style);
  }
}
