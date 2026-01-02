const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");

const radioParent = document.querySelector(".query-type");
const generalLabel = document.querySelector(`label[for="generalEnquiry"]`);
const generalEnquiry = document.querySelector("#generalEnquiry");
const supportLabel = document.querySelector(`label[for="supportRequest"]`);
const supportRequest = document.querySelector("#supportRequest");
const radioButtons = [generalEnquiry, supportRequest];
let radioErrorMessage = document.createElement("p");
radioErrorMessage.textContent = "Please select a query type";
radioErrorMessage.classList.add("errorMsg");

const userMessage = document.querySelector("#message");

const acceptTerm = document.querySelector(".acceptTerm");
const contactTerms = document.querySelector("#contact");
let acceptErrorMessage = document.createElement("p");
acceptErrorMessage.textContent =
    "To submit this form, please consent to being contacted";
acceptErrorMessage.classList.add("errorMsg");

const submitButton = document.querySelector("button");

const fields = [firstName, lastName, email, userMessage];

const success_state = document.querySelector(".success-state");

submitButton.addEventListener("click", () => {
    fields.forEach((field) => {
        if (field.value === "" && !field.classList.contains("error")) {
            field.classList.add("error");

            let errorMessage = document.createElement("p");
            errorMessage.textContent = "This field is required";
            errorMessage.classList.add("errorMsg");
            field.insertAdjacentElement("afterend", errorMessage);
        }
    });

    if (!generalEnquiry.checked && !supportRequest.checked) {
        radioParent.appendChild(radioErrorMessage);
    }

    if (!contactTerms.checked) {
        acceptTerm.appendChild(acceptErrorMessage);
    }

    if (
        firstName.value.length > 0 &&
        firstName.value.length > 0 &&
        emailRegex.test(email.value) &&
        (generalEnquiry.checked || supportRequest.checked) &&
        userMessage.value.length > 0 &&
        contactTerms.checked
    ) {
        successState();
    }
});

fields.forEach((field) => {
    field.addEventListener("keyup", () => {
        if (
            field.value.length > 0 &&
            field.type !== "email" &&
            field.classList.contains("error")
        ) {
            field.classList.remove("error");

            let errorMessage = field.nextElementSibling;
            errorMessage.remove();
            errorMessage.classList.remove("errorMsg");
        }
    });

    field.addEventListener("blur", () => {
        if (field.value === "" && !field.classList.contains("error")) {
            field.classList.add("error");

            let errorMessage = document.createElement("p");
            errorMessage.textContent = "This field is required";
            errorMessage.classList.add("errorMsg");
            field.insertAdjacentElement("afterend", errorMessage);
        }
    });
});

email.addEventListener("keyup", () => {
    let errorMessage = email.nextElementSibling;

    if (
        email.value.length >= 2 &&
        email.classList.contains("error") &&
        !emailRegex.test(email.value) &&
        errorMessage.textContent === "This field is required"
    ) {
        errorMessage.textContent = "Enter a valid email";
    }

    if (
        email.value.length >= 2 &&
        !email.classList.contains("error") &&
        !emailRegex.test(email.value) &&
        !errorMessage
    ) {
        email.classList.add("error");

        errorMessage = document.createElement("p");
        errorMessage.textContent = "Enter a valid email";
        errorMessage.classList.add("errorMsg");
        email.insertAdjacentElement("afterend", errorMessage);
    }

    if (emailRegex.test(email.value) && errorMessage) {
        email.classList.remove("error");

        errorMessage.remove();
    }
});

email.addEventListener("blur", () => {
    let errorMessage = email.nextElementSibling;

    if (
        email.value.length > 0 &&
        errorMessage &&
        !emailRegex.test(email.value)
    ) {
        errorMessage.textContent = "Enter a value email";
    }

    if (
        email.value.length > 0 &&
        !errorMessage &&
        !emailRegex.test(email.value)
    ) {
        errorMessage = document.createElement("p");
        errorMessage.textContent = "Enter a valid email";
        errorMessage.classList.add("errorMsg");
        email.insertAdjacentElement("afterend", errorMessage);
    }
});

radioButtons.forEach((radio) => {
    radio.addEventListener("click", () => {
        if (radio.checked) {
            radioErrorMessage.remove();
        }

        if (radio.id === "generalEnquiry") {
            generalLabel.classList.add("active");
            supportLabel.classList.remove("active");
        } else {
            generalLabel.classList.remove("active");
            supportLabel.classList.add("active");
        }
    });
});

contactTerms.addEventListener("click", () => {
    if (contactTerms.checked) {
        acceptErrorMessage.remove();
    }
});

function successState() {
    success_state.style.display = "grid";

    firstName.value = "";
    lastName.value = "";
    email.value = "";
    generalEnquiry.checked = false;
    supportRequest.checked = false;
    generalLabel.classList.remove("active");
    supportLabel.classList.remove("active");
    userMessage.value = "";
    contactTerms.checked = false;
    submitButton.disabled = true;

    setTimeout(() => {
        success_state.style.display = "none";
        submitButton.disabled = false;
    }, 5000);
}
