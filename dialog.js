function popup() {
	const amount = parseFloat($("#amount-box").val()) * 100; // We multiply by 100 because SnooKarma has 2 decimal places
	const recipient = $("#address-box").text();
	chrome.extension.sendMessage({
		"messageType": "promptMetamask",
		"amount": amount,
		"recipient": recipient
	});
}

document.getElementById("submit-button").addEventListener("click", popup);

const url = new URL(window.location.href);
const username = url.searchParams.get("username");

$("#username-box").text(username);
$("#username-box-2").text(username);

$.getJSON("https://ske.drakeluce.com:40103/get/" + username, function (data) {
	if(typeof data.error !== "undefined"){
		$("#send-form").hide();
		$("#error-message").show();
	}
	$("#address-box").text(data.ethereumAddress);
});