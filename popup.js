const slider = document.getElementById('brightness');
const valueLabel = document.getElementById('value');

// Update label on slider move
slider.addEventListener('input', () => {
  valueLabel.textContent = slider.value + '%';
  setBrightness(slider.value);
});

// Set brightness on the current tab
function setBrightness(val) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: (v) => {
        document.body.style.filter = `brightness(${v}%)`;
      },
      args: [val]
    });
  });
}
