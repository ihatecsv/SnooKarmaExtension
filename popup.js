function sendNewAddress() {
	const address = $("#address-box").val();
	if (address.length === 42) {
		window.open("https://ske.drakeluce.com:40103/set/" + address, '_blank');
	}else{
		$("#error-message").hide();
		setTimeout(() => {
			$("#error-message").show();
		}, 500);
	}
}

document.getElementById("submit-button").addEventListener("click", sendNewAddress);