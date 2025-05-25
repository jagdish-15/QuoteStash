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
        return;
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

transButton.addEventListener("click", async () => {
    if (!transForm.checkValidity()) {
        transForm.reportValidity();
        return;
    }
    donateForm.style.display = "none";
    donateButton.style.display = "none";
    donationData.id = document.querySelector("#trans-id").value;

    try {
        const response = await fetch("https://quotestash-backend-production.up.railway.app/donate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(donationData),
        });

        if (!response.ok) {
            throw new Error("Failed to submit the donation");
        }

        const data = await response.json();
        console.log("Donation submitted successfully:", data);
        window.location.href = `thankyou.html?name=${donationData.name}&amount=${donationData.amount}`;
    } catch (error) {
        console.error("Error in contacting server: ", error);
        alert("There was an error submitting your donation. Please try again.");
    }
});
