/* =====================================================
   REC Player Registration -> Google Sheets

   This version matches the custom REC registration page.

   IMPORTANT:
   - It uses a NEW sheet named "Applications 2026" so any
     older Applications data is left untouched.
   - After replacing Code.gs, deploy a NEW VERSION of the
     existing Web App deployment.
===================================================== */

const SHEET_NAME = "Applications 2026";

const HEADERS = [
    "Timestamp",
    "Full Name",
    "Department",
    "Student ID",
    "Email Address",
    "Mobile Number (WhatsApp)",
    "Facebook Profile Link",
    "Discord Username",
    "Games",
    "Other Game",
    "Competitive / Tournament Experience",
    "Payment Method",
    "bKash Number",
    "Transaction ID (TrxID)"
];

function doGet() {
    return ContentService
        .createTextOutput("REC membership endpoint is running.")
        .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
    try {
        const sheet = getSheet();
        const p = e.parameter || {};

        if (sheet.getLastRow() === 0) {
            sheet.appendRow(HEADERS);
            sheet.setFrozenRows(1);
        }

        sheet.appendRow([
            new Date(),
            p.fullName || "",
            p.department || "",
            p.studentId || "",
            p.email || "",
            p.phone || "",
            p.facebook || "",
            p.discord || "",
            p.games || "",
            p.otherGame || "",
            p.experience || "",
            p.paymentMethod || "",
            p.bkashNumber || "",
            p.transactionId || ""
        ]);

        return ContentService
            .createTextOutput(JSON.stringify({ success: true }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({
                success: false,
                error: String(error)
            }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function getSheet() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
        sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    return sheet;
}
