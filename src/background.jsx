import 'bootstrap/dist/css/bootstrap.min.css';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getTabs") {
    chrome.tabs.query({}, (tabs) => {
      sendResponse(tabs);
    });
  }
  return true;
});
