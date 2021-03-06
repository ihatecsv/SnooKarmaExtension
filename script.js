window.addEventListener('message', function (ev) {
	if(typeof ev.data.request === "undefined"){
		return;
	}

	if (web3.eth.accounts.length === 0){
		return alert("Can't make transaction! Please make sure you have MetaMask installed and unlocked!");
	}

	const recipient = ev.data.request.recipient;
	const amount = ev.data.request.amount;

	const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"destination","type":"address"}],"name":"transferEthereum","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOracle","type":"address"}],"name":"changeOracle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"},{"name":"destination","type":"address"}],"name":"transferTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"username","type":"string"},{"name":"karma","type":"uint256"},{"name":"sigExp","type":"uint256"},{"name":"sigV","type":"uint8"},{"name":"sigR","type":"bytes32"},{"name":"sigS","type":"bytes32"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"oracle","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"username","type":"string"}],"name":"redeemedKarmaOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maintainer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newMaintainer","type":"address"}],"name":"changeMaintainer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"destination","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"removeOracle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"username","type":"string"},{"indexed":true,"name":"addr","type":"address"},{"indexed":false,"name":"karma","type":"uint256"}],"name":"Redeem","type":"event"}];
	const contractAddress = "0xfd8a88ad07195f603cbc48653c559b63831210d8";
	const contract = web3.eth.contract(abi).at(contractAddress);

	web3.eth.getAccounts(function (error, result) {
		contract.transfer(recipient, amount, {
			from: result[0]
		}, function (err, transactionHash) {
			if(err){
				return alert(err);
			}
			return alert("Sent SnooKarma! - " + transactionHash);
		});
	});
}, true); // useCapture: true
const updateButtons = function(){
	const domCommentsNew = document.getElementsByClassName("Comment");
	for (let i = 0; i < domCommentsNew.length; i++) {
		try {
			if (domCommentsNew[i].getElementsByClassName("snookarma-button").length > 0) {
				continue;
			}
			const username = domCommentsNew[i].querySelectorAll('[href*="/user/"]')[0].innerText;
			const shareMenu = domCommentsNew[i].querySelectorAll('[id*="comment-share-menu"]')[0];
			const injectedButton = document.createElement("div");
			let isSelf = false;
			let goldNode = null;
			for (let i = 0; i < shareMenu.parentElement.childNodes.length; i++) {
				if (shareMenu.parentElement.childNodes[i].innerText === "Edit") isSelf = true;
				if (shareMenu.parentElement.childNodes[i].innerText === "Give gold") goldNode = shareMenu.parentElement.childNodes[i];
			}
			injectedButton.innerText = "Tip SnooKarma";
			injectedButton.classList.add("snookarma-button");
			injectedButton.setAttribute("snookarma-username", username);
			if (!isSelf) goldNode.parentNode.insertBefore(injectedButton, goldNode.nextSibling);
		}catch(e){
			console.error(e);
		}
	}

	const domCommentsOld = document.getElementsByClassName("entry");
	for (let i = 0; i < domCommentsOld.length; i++) {
		try{
			if (domCommentsOld[i].getElementsByClassName("snookarma-button-old").length > 0) {
				continue; // Button already here
			}
			if (domCommentsOld[i].getElementsByClassName("edit-usertext").length > 0) {
				continue; // Don't need to tip ourselves!
			}
			const username = domCommentsOld[i].getElementsByClassName("author")[0].innerText;
			const goldNode = domCommentsOld[i].getElementsByClassName("give-gold-button")[0];

			const injectedButtonContainer = document.createElement("li");
			const injectedButton = document.createElement("a");
			injectedButtonContainer.appendChild(injectedButton);

			injectedButton.innerText = "tip SnooKarma";
			injectedButton.classList.add("snookarma-button-old");
			injectedButton.setAttribute("snookarma-username", username);

			goldNode.parentNode.insertBefore(injectedButtonContainer, goldNode.nextSibling);
		}catch(e){
			console.error(e);
		}
	}
}

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function (mutations, observer) {
	updateButtons();
});

observer.observe(document, {
	subtree: true,
	attributes: true
});

updateButtons();