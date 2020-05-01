const DOMAINS = ['stackoverflow.com']

function isMatch(tab) {
  for (let i = 0; i < DOMAINS.length; i++) {
    const domain = DOMAINS[i];
    if (tab.url.includes(domain)) {
      return true;
    }
  }

  return false;
}

function collectMatchingTabs() {
  return new Promise((resolve, reject) => {
    chrome.windows.getAll({ populate: true }, function (windows) {
      const matched = [];

      for (var i = 0; i < windows.length; ++i) {
        var w = windows[i];
        for (var j = 0; j < w.tabs.length; ++j) {
          var t = w.tabs[j];
          if (isMatch(t)) {
            matched.push(t)
          }
        }
      }

      resolve(matched)
    });
  });
}

function closeTabs(tabs) {
  tabs.forEach(tab => chrome.tabs.remove(tab.id));
}

chrome.browserAction.onClicked.addListener(function (tab) {
  collectMatchingTabs()
    .then(closeTabs)
});




