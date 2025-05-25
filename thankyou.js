const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");
const amount  = urlParams.get("amount");

if (name) {
    document.getElementById("nameLine").textContent = `Thanks, ${name}!`;
}
if (amount) {
    document.getElementById("amountLine").textContent = `You donated ₹${amount}.`;
}

function goBack() {
    window.location.href = "index.html";
}
