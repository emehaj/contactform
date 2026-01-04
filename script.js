const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// DOM elements
const form = document.querySelector("form");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

const radioParent = document.querySelector(".query-type");
const radios = document.querySelectorAll('input[name="query-type"]');
const generalLabel = document.querySelector('label[for="generalEnquiry"]');
const supportLabel = document.querySelector('label[for="supportRequest"]');

const termsWrapper = document.querySelector(".acceptTerm");
const termsCheckbox = document.querySelector("#contact");

const submitButton = document.querySelector("button");
const successState = document.querySelector(".success-state");

const fields = [firstName, lastName, email, message];

// Utility functions
function showError(input, text) {
    if (input.classList.contains("error")) return;

    input.classList.add("error");
    const p = document.createElement("p");
    p.className = "errorMsg";
    p.textContent = text;
    input.insertAdjacentElement("afterend", p);
}

function clearError(input) {
    const error = input.nextElementSibling;
    if (error && error.classList.contains("errorMsg")) {
        error.remove();
    }
    input.classList.remove("error");
}

function validateField(input) {
    if (!input.value.trim()) {
        showError(input, "This field is required");
        return false;
    }

    if (input.type === "email" && !emailRegex.test(input.value)) {
        showError(input, "Enter a valid email");
        return false;
    }

    clearError(input);
    return true;
}

// Field validation
fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
        if (field.classList.contains("error")) {
            validateField(field);
        }
    });
});

// Radio buttons
const radioError = document.createElement("p");
radioError.className = "errorMsg";
radioError.textContent = "Please select a query type";

radios.forEach((radio) => {
    radio.addEventListener("change", () => {
        radioError.remove();
        generalLabel.classList.toggle("active", radio.id === "generalEnquiry");
        supportLabel.classList.toggle("active", radio.id === "supportRequest");
    });
});

// Terms checkbox
const termsError = document.createElement("p");
termsError.className = "errorMsg";
termsError.textContent =
    "To submit this form, please consent to being contacted";

termsCheckbox.addEventListener("change", () => {
    if (termsCheckbox.checked) {
        termsError.remove();
    }
});

// Submit
submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    let isValid = true;

    fields.forEach((field) => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    if (![...radios].some((r) => r.checked)) {
        radioParent.appendChild(radioError);
        isValid = false;
    }

    if (!termsCheckbox.checked) {
        termsWrapper.appendChild(termsError);
        isValid = false;
    }

    if (isValid) {
        showSuccess();
    }
});

function showSuccess() {
    successState.style.display = "grid";
    form.reset();
    submitButton.disabled = true;

    generalLabel.classList.remove("active");
    supportLabel.classList.remove("active");

    setTimeout(() => {
        successState.style.display = "none";
        submitButton.disabled = false;
    }, 5000);
}
