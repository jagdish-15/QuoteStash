const donateForm = document.querySelector("#donate-form");
const donateButton = document.querySelector("#donate");
const qr =  document.querySelector("#qr");
const paymentButton = document.querySelector("#payment");
const transForm = document.querySelector("#trans-id-form");
const transButton = document.querySelector("#trans-button");


let donationData = {};

donateButton.addEventListener("click", () => {
    if (!donateForm.checkValidity()) {
        donateForm.reportValidity();
    }

    donateForm.style.display = "none";
    donateButton.style.display = "none";

    donationData.name = document.querySelector("#name").value;
    donationData.email = document.querySelector("#email").value;
    donationData.phoneNumber = document.querySelector("#phone-number").value;
    donationData.amount = document.querySelector("#amount").value;

    const upiUrl = `upi://pay?pa=jagadishdrp@okaxis&pn=QuoteStash+Donation&am=${donationData.amount}&cu=INR&tn=QuoteStash+Donation`;

    new QRCode(qr, {
        text: upiUrl,
        height: 200,
        width: 200,
    });

    paymentButton.style.display = "inline";
});

paymentButton.addEventListener("click", () => {
    qr.style.display = "none";
    paymentButton.style.display = "none";

    transForm.style.display = "block";
    transButton.style.display = "inline";
});

transButton.addEventListener("click", () => {
    donationData.id = document.querySelector("#trans-id").value;

    // Backend post logic

    window.location.href = `thankyou.html?name=${donationData.name}&amount=${donationData.amount}`
});
