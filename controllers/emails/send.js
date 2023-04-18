const fs = require("fs").promises;
const path = require("path");
const { google } = require("googleapis");

const TOKEN_PATH = path.join(process.cwd(), "./config/token.json");

/**
 * initializes googleapi client using app credentials
 * @returns
 */
async function getClient() {
  const content = await fs.readFile(TOKEN_PATH);
  const credentials = JSON.parse(content);

  return google.auth.fromJSON(credentials);
}

/**
 * Helper function to send email using base template
 * @param {string} subject
 * @param {string} recipientEmail
 * @param {string} body
 * @returns promise containing response data from googleapi
 */
async function sendEmail(subject, recipientEmail, body) {
  const gmail = google.gmail({ version: "v1", auth: await getClient() });

  const messageParts = [
    "From: Lorreina Guyett <lorreinag93@gmail.com>",
    `To: <${recipientEmail}>`,
    "Content-Type:text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${subject}`,
    "",
    "Hello!",
    body,
    "Thank you,",
    "Ronald Reagan Haters",
  ];
  const message = messageParts.join("\n");

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage,
    },
  });

  return res.data;
}

/**
 * Sends confirmation email for article submission
 * @param {string} recipientEmail
 * @returns promise containing response data from googleapi
 */
async function submissionResponse(recipientEmail) {
  subject = "Thank you for your submission";
  body = [
    "Thank you for your contribution to this collection.",
    " ",
    "Before it is added to the list of articles, the submission will need to be reviewed.",
    "You'll be updated on whether or not the article is added to the list.",
  ];

  return sendEmail(subject, recipientEmail, body);
}

/**
 * Sends approval email for when article has been approved
 * @param {string} recipientEmail
 * @returns promise containing response data from googleapi
 */
async function approvedEmail(recipientEmail) {
  subject = "Your submission was approved";
  body = [];

  return sendEmail(subject, recipientEmail, body);
}

/**
 * Sends decline email for when article has been rejected
 * @param {string} recipientEmail
 * @returns promise containing response data from googleapi
 */
async function declineEmail(recipientEmail) {
  subject = "Your submission was declined";
  body = [];

  return sendEmail(subject, recipientEmail, body);
}
module.exports = { submissionResponse, approvedEmail, declineEmail };
