/* =====================================================
   RUET Esports Community
   Single Page Registration Form
===================================================== */

const FORM_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbyXlVSN53mWsZoyo2jDdlAJ1Gy6ir1xv4MwIma30bnskJNzqnwztgycCIgGhjSngC7y3A/exec";


export function initJoinForm() {

    const form = document.getElementById("joinForm");

    if (!form) {
        return;
    }


    const submitButton =
        document.getElementById("joinSubmit");

    const message =
        document.getElementById("formMessage");

    const gameOptions =
        document.getElementById("gameOptions");

    const gamesError =
        document.getElementById("gamesError");

    const experienceOptions =
        document.getElementById("experienceOptions");

    const experienceError =
        document.getElementById("experienceError");

    const consent =
        document.getElementById("consent");

    const consentError =
        document.getElementById("consentError");


    /* =====================================================
       MESSAGE
    ===================================================== */

    function showMessage(text, type) {

        message.textContent = text;

        message.className =
            `form-message is-visible is-${type}`;
    }


    function clearMessage() {

        message.textContent = "";

        message.className =
            "form-message";
    }


    /* =====================================================
       FIELD ERRORS
    ===================================================== */

    function setFieldError(field, text) {

        const wrapper =
            field.closest(".form-field");

        if (!wrapper) {
            return;
        }

        wrapper.classList.add("has-error");

        const error =
            wrapper.querySelector(".field-error");

        if (error) {
            error.textContent = text;
        }
    }


    function clearFieldError(field) {

        const wrapper =
            field.closest(".form-field");

        if (!wrapper) {
            return;
        }

        wrapper.classList.remove("has-error");

        const error =
            wrapper.querySelector(".field-error");

        if (error) {
            error.textContent = "";
        }
    }


    function clearAllErrors() {

        form
            .querySelectorAll(".form-field.has-error")
            .forEach(field => {

                field.classList.remove("has-error");

            });


        form
            .querySelectorAll(".field-error")
            .forEach(error => {

                error.textContent = "";

            });


        gameOptions?.classList.remove("has-error");

        experienceOptions?.classList.remove("has-error");

        consent
            ?.closest(".consent-option")
            ?.classList.remove("has-error");
    }


    /* =====================================================
       SCROLL TO FIRST ERROR
    ===================================================== */

    function focusFirstInvalid(element) {

        if (!element) {
            return;
        }


        element.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


        if (
            typeof element.focus === "function"
        ) {

            setTimeout(() => {

                element.focus();

            }, 350);
        }
    }


    /* =====================================================
       VALIDATION
    ===================================================== */

    function validateForm() {

        clearAllErrors();

        let valid = true;

        let firstInvalid = null;


        /* ---------------------------------------------
           Required text/select fields
        --------------------------------------------- */

        const requiredFields = [

            document.getElementById("fullName"),

            document.getElementById("department"),

            document.getElementById("studentId"),

            document.getElementById("email"),

            document.getElementById("phone")

        ];


        requiredFields.forEach(field => {

            if (!field) {
                return;
            }


            if (!field.value.trim()) {

                setFieldError(
                    field,
                    "This field is required."
                );

                valid = false;

                if (!firstInvalid) {
                    firstInvalid = field;
                }

                return;
            }


            /* Email validation */

            if (
                field.id === "email" &&
                !field.checkValidity()
            ) {

                setFieldError(
                    field,
                    "Please enter a valid email address."
                );

                valid = false;

                if (!firstInvalid) {
                    firstInvalid = field;
                }
            }


            /* Facebook URL validation if supplied */

            if (
                field.id === "facebook" &&
                field.value.trim() &&
                !field.checkValidity()
            ) {

                setFieldError(
                    field,
                    "Please enter a valid Facebook URL."
                );

                valid = false;

                if (!firstInvalid) {
                    firstInvalid = field;
                }
            }

        });


        /* ---------------------------------------------
           Facebook optional validation
        --------------------------------------------- */

        const facebook =
            document.getElementById("facebook");


        if (
            facebook &&
            facebook.value.trim() &&
            !facebook.checkValidity()
        ) {

            setFieldError(
                facebook,
                "Please enter a valid Facebook URL."
            );

            valid = false;

            if (!firstInvalid) {
                firstInvalid = facebook;
            }
        }


        /* ---------------------------------------------
           Games
        --------------------------------------------- */

        const selectedGames =
            form.querySelectorAll(
                'input[name="games"]:checked'
            );


        if (selectedGames.length === 0) {

            gamesError.textContent =
                "Please select at least one game.";

            gameOptions.classList.add(
                "has-error"
            );

            valid = false;

            if (!firstInvalid) {
                firstInvalid = gameOptions;
            }
        }


        /* ---------------------------------------------
           Other game
        --------------------------------------------- */

        const otherGame =
            document.getElementById("otherGame");

        const otherSelected =
            form.querySelector(
                'input[name="games"][value="Other"]:checked'
            );


        if (
            otherSelected &&
            !otherGame.value.trim()
        ) {

            setFieldError(
                otherGame,
                "Please enter the name of the game."
            );

            valid = false;

            if (!firstInvalid) {
                firstInvalid = otherGame;
            }
        }


        /* ---------------------------------------------
           Experience
        --------------------------------------------- */

        const selectedExperience =
            form.querySelectorAll(
                'input[name="experience"]:checked'
            );


        if (selectedExperience.length === 0) {

            experienceError.textContent =
                "Please select at least one option.";

            experienceOptions.classList.add(
                "has-error"
            );

            valid = false;

            if (!firstInvalid) {
                firstInvalid = experienceOptions;
            }
        }


        /* ---------------------------------------------
           Payment Method
        --------------------------------------------- */

        const paymentMethod =
            form.querySelector(
                'input[name="paymentMethod"]:checked'
            );


        if (!paymentMethod) {

            const paymentError =
                document.getElementById(
                    "paymentError"
                );

            paymentError.textContent =
                "Please select a payment method.";

            valid = false;

            if (!firstInvalid) {

                firstInvalid =
                    form.querySelector(
                        'input[name="paymentMethod"]'
                    );
            }
        }


        /* ---------------------------------------------
           Confirmation
        --------------------------------------------- */

        if (!consent.checked) {

            consentError.textContent =
                "Please confirm the information before submitting.";

            consent
                .closest(".consent-option")
                .classList.add("has-error");

            valid = false;

            if (!firstInvalid) {
                firstInvalid = consent;
            }
        }


        /* ---------------------------------------------
           Focus first invalid field
        --------------------------------------------- */

        if (
            !valid &&
            firstInvalid
        ) {

            requestAnimationFrame(() => {

                focusFirstInvalid(
                    firstInvalid
                );

            });
        }


        return valid;
    }


    /* =====================================================
       COLLECT FORM DATA
    ===================================================== */

    function getFormData() {

        const data =
            new FormData(form);


        const games = [
            ...form.querySelectorAll(
                'input[name="games"]:checked'
            )
        ]
            .map(input => input.value)
            .join(", ");


        const experience = [
            ...form.querySelectorAll(
                'input[name="experience"]:checked'
            )
        ]
            .map(input => input.value)
            .join(", ");


        return {

            fullName:
                data.get("fullName")?.trim() || "",

            department:
                data.get("department") || "",

            studentId:
                data.get("studentId")?.trim() || "",

            email:
                data.get("email")?.trim() || "",

            phone:
                data.get("phone")?.trim() || "",

            facebook:
                data.get("facebook")?.trim() || "",

            discord:
                data.get("discord")?.trim() || "",

            games,

            otherGame:
                data.get("otherGame")?.trim() || "",

            experience,

            paymentMethod:
                data.get("paymentMethod") || "",

            bkashNumber:
                data.get("bkashNumber")?.trim() || "",

            transactionId:
                data.get("transactionId")?.trim() || ""

        };
    }


    /* =====================================================
       LIVE ERROR CLEARING
    ===================================================== */

    form
        .querySelectorAll(
            "input:not([type='checkbox']):not([type='radio']), select, textarea"
        )
        .forEach(field => {

            field.addEventListener(
                "input",
                () => clearFieldError(field)
            );


            field.addEventListener(
                "change",
                () => clearFieldError(field)
            );

        });


    /* =====================================================
       GAME VALIDATION
    ===================================================== */

    form
        .querySelectorAll(
            'input[name="games"]'
        )
        .forEach(checkbox => {

            checkbox.addEventListener(
                "change",
                () => {

                    if (
                        form.querySelectorAll(
                            'input[name="games"]:checked'
                        ).length > 0
                    ) {

                        gameOptions.classList.remove(
                            "has-error"
                        );

                        gamesError.textContent = "";
                    }

                }
            );

        });


    /* =====================================================
       EXPERIENCE VALIDATION
    ===================================================== */

    form
        .querySelectorAll(
            'input[name="experience"]'
        )
        .forEach(checkbox => {

            checkbox.addEventListener(
                "change",
                () => {

                    if (
                        form.querySelectorAll(
                            'input[name="experience"]:checked'
                        ).length > 0
                    ) {

                        experienceOptions.classList.remove(
                            "has-error"
                        );

                        experienceError.textContent =
                            "";
                    }

                }
            );

        });


    /* =====================================================
       CONFIRMATION
    ===================================================== */

    consent.addEventListener(
        "change",
        () => {

            if (consent.checked) {

                consent
                    .closest(".consent-option")
                    .classList.remove("has-error");

                consentError.textContent = "";
            }

        }
    );


    /* =====================================================
       SUBMIT
    ===================================================== */

    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            clearMessage();


            /* ---------------------------------------------
               Validate entire form
            --------------------------------------------- */

            if (!validateForm()) {

                showMessage(
                    "Please complete all required fields before submitting.",
                    "error"
                );

                return;
            }


            /* ---------------------------------------------
               Prevent accidental duplicate submission
            --------------------------------------------- */

            submitButton.disabled = true;

            submitButton.classList.add(
                "is-loading"
            );


            const buttonText =
                submitButton.querySelector("span");


            buttonText.textContent =
                "Submitting...";


            try {

                const payload =
                    new URLSearchParams(
                        getFormData()
                    );


                await fetch(
                    FORM_ENDPOINT,
                    {
                        method: "POST",

                        mode: "no-cors",

                        body: payload
                    }
                );


                /* -----------------------------------------
                   Success
                ----------------------------------------- */

                form.reset();

                clearAllErrors();


                showMessage(
                    "Application submitted successfully! The REC team will contact you using the information you provided.",
                    "success"
                );


                requestAnimationFrame(() => {

                    message.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                });


            } catch (error) {

                console.error(
                    "REC form submission error:",
                    error
                );


                showMessage(
                    "We couldn't submit your application right now. Please try again in a moment.",
                    "error"
                );


            } finally {

                submitButton.disabled = false;

                submitButton.classList.remove(
                    "is-loading"
                );

                buttonText.textContent =
                    "Submit Application";

            }

        }
    );

}


document.addEventListener(
    "DOMContentLoaded",
    initJoinForm
);