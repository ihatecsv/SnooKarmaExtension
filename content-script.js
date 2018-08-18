var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
s.onload = function () {
	this.remove();
};
(document.head || document.documentElement).appendChild(s);

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		console.log(request);
		window.postMessage({
			request: request
		}, "*");
	}
);

const openDialog = function (event) {
	chrome.runtime.sendMessage({
		messageType: "makePopup",
		username: event.target.getAttribute("snookarma-username")
	});
}

$("body").on("click", ".snookarma-button", openDialog);
$("body").on("click", ".snookarma-button-old", openDialog);