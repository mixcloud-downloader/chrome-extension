var urlPattern = 'https?://([^\.]+\.)?mixcloud.com(/[^/]+/[^/]+/?)';

chrome.pageAction.onClicked.addListener(function(tab){
    var regExp = new RegExp(urlPattern, "i");
    var matches = regExp.exec(tab.url);
    var downloadUrl = "http://www.mixcloud-downloader.com" + matches[2] + "?utm_source=chrome-extension";
    
    chrome.tabs.create({ url: downloadUrl });
});

var rule1 = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
                urlMatches: urlPattern
            }
        })
    ],
    actions: [ new chrome.declarativeContent.ShowPageAction() ]
};

chrome.runtime.onInstalled.addListener(function(details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([rule1]);
    });
});
