/* =====================================================
   RUET Esports Community
   Contact Module
===================================================== */

export function initContact() {

    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = form.querySelector("#name").value.trim();
        const email = form.querySelector("#email").value.trim();
        const subject = form.querySelector("#subject").value.trim();
        const message = form.querySelector("#message").value.trim();

        if (!name || !email || !subject || !message) {

            alert(
                "Please fill in all required fields."
            );

            return;

        }

        alert(
`Thank you for contacting RUET Esports Community!

The website contact form is currently under development.

For now, please contact us through:

📧 Email:
recofficial.ruet@gmail.com

📘 Facebook:
Official REC Facebook Page

💬 Discord:
https://discord.gg/yaeEB64mD`
        );

        form.reset();

    });

}