// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let openedWindow;

chrome.runtime.onInstalled.addListener(function () {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [new chrome.declarativeContent.PageStateMatcher({
				pageUrl: {
					urlContains: 'reddit.com'
				},
			})],
			actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
});
chrome.runtime.onMessage.addListener(function (msg, sender) {
	if (msg.messageType === "makePopup") {
		chrome.windows.create({
			url: chrome.runtime.getURL("dialog.html?username=" + msg.username),
			type: "popup",
			height: 400,
			width: 400
		}, function (window) {
			openedWindow = window;
		});
	}

	if (msg.messageType === "promptMetamask") {
		chrome.windows.remove(openedWindow.id);
		const sendMessageToContent = () => {
			chrome.tabs.query({
				active: true,
				currentWindow: true
			}, function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {
					messageType: "promptMetamaskPassed",
					amount: msg.amount,
					recipient: msg.recipient
				}, function (response) {

				});
			});
		}
		setTimeout(sendMessageToContent, 500);
	}
});