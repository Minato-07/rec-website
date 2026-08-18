# REC Membership Form — Google Sheets Setup

The website is a static Vercel site, so it needs a small server-side endpoint to save submissions. Google Apps Script provides that endpoint for free.

## 1. Create the spreadsheet

Create a new Google Sheet, for example:

`REC Membership Applications`

Then open:

**Extensions → Apps Script**

## 2. Add the backend code

Replace the contents of `Code.gs` with the code from `google-apps-script/Code.gs` in this project.

## 3. Deploy it

In Apps Script:

1. Click **Deploy → New deployment**.
2. Select **Web app** as the deployment type.
3. Set **Execute as:** Me.
4. Set **Who has access:** Anyone.
5. Click **Deploy**.
6. Copy the generated **Web app URL**.

## 4. Connect the website

Open:

`js/modules/join.js`

Replace:

`YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL`

with the Web app URL.

Example:

`const FORM_ENDPOINT = "https://script.google.com/macros/s/XXXXXXXX/exec";`

## 5. Deploy the website

Commit and push the updated files to GitHub. Vercel will redeploy automatically.

The following buttons now open the same application page:

- Join REC (desktop navbar)
- Join REC (mobile navigation)
- Join Community (hero)
- Become a Member (CTA)

## Excel

The submissions are stored in Google Sheets. At any time you can open the sheet and use:

**File → Download → Microsoft Excel (.xlsx)**

This is intentionally used instead of trying to generate an `.xlsx` file in the browser. It is much simpler and safer for a free static Vercel website.
