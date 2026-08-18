/* =====================================================
   REC Player Registration
   Custom multi-step form -> Google Sheets via Apps Script
===================================================== */

const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbyXlVSN53mWsZoyo2jDdlAJ1Gy6ir1xv4MwIma30bnskJNzqnwztgycCIgGhjSngC7y3A/exec";

export function initJoinForm() {
    const form = document.getElementById("joinForm");
    if (!form) return;

    const steps = [...form.querySelectorAll(".form-step")];
    const progress = [...document.querySelectorAll(".form-progress span")];
    const nextButton = document.getElementById("joinNext");
    const backButton = document.getElementById("joinBack");
    const submitButton = document.getElementById("joinSubmit");
    const message = document.getElementById("formMessage");
    let currentStep = 0;

    const showMessage = (text, type) => {
        message.textContent = text;
        message.className = `form-message is-visible is-${type}`;
    };

    const clearMessage = () => {
        message.textContent = "";
        message.className = "form-message";
    };

    const updateStep = () => {
        steps.forEach((step, index) => step.classList.toggle("is-active", index === currentStep));
        progress.forEach((bar, index) => bar.classList.toggle("is-active", index <= currentStep));
        backButton.hidden = currentStep === 0;
        nextButton.hidden = currentStep === steps.length - 1;
        submitButton.hidden = currentStep !== steps.length - 1;
        window.scrollTo({ top: document.querySelector(".registration-card").offsetTop - 30, behavior: "smooth" });
    };

    const validateStep = () => {
        const step = steps[currentStep];
        const requiredFields = [...step.querySelectorAll("input[required], select[required], textarea[required]")];

        for (const field of requiredFields) {
            if (!field.checkValidity()) {
                field.reportValidity();
                return false;
            }
        }

        if (currentStep === 2) {
            const games = form.querySelectorAll('input[name="games"]:checked');
            const experience = form.querySelectorAll('input[name="experience"]:checked');

            if (!games.length) {
                showMessage("Please select at least one game.", "error");
                return false;
            }

            if (!experience.length) {
                showMessage("Please select at least one competitive / tournament experience option.", "error");
                return false;
            }
        }

        clearMessage();
        return true;
    };

    const collectData = () => {
        const data = new FormData(form);
        const values = (name) => [...form.querySelectorAll(`input[name="${name}"]:checked`)].map(input => input.value).join(", ");

        return {
            fullName: data.get("fullName")?.trim() || "",
            department: data.get("department") || "",
            studentId: data.get("studentId")?.trim() || "",
            email: data.get("email")?.trim() || "",
            phone: data.get("phone")?.trim() || "",
            facebook: data.get("facebook")?.trim() || "",
            discord: data.get("discord")?.trim() || "",
            games: values("games"),
            otherGame: data.get("otherGame")?.trim() || "",
            experience: values("experience"),
            paymentMethod: data.get("paymentMethod") || "",
            bkashNumber: data.get("bkashNumber")?.trim() || "",
            transactionId: data.get("transactionId")?.trim() || ""
        };
    };

    nextButton.addEventListener("click", () => {
        if (!validateStep()) return;
        currentStep += 1;
        updateStep();
    });

    backButton.addEventListener("click", () => {
        clearMessage();
        if (currentStep > 0) {
            currentStep -= 1;
            updateStep();
        }
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        clearMessage();

        if (!validateStep()) return;

        const data = collectData();
        submitButton.disabled = true;
        submitButton.querySelector("span").textContent = "Submitting...";

        try {
            const payload = new URLSearchParams(data);

            await fetch(FORM_ENDPOINT, {
                method: "POST",
                mode: "no-cors",
                body: payload
            });

            form.reset();
            currentStep = 0;
            updateStep();
            showMessage("Application submitted successfully! The REC team will contact you using the information you provided.", "success");
            document.querySelector(".registration-card").scrollIntoView({ behavior: "smooth", block: "start" });
        } catch (error) {
            console.error(error);
            showMessage("We couldn't submit your application right now. Please try again in a moment.", "error");
        } finally {
            submitButton.disabled = false;
            submitButton.querySelector("span").textContent = "Submit Application";
        }
    });

    updateStep();
}

document.addEventListener("DOMContentLoaded", initJoinForm);
