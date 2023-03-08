const path = require("path");
const { google } = require("googleapis");
const { authenticate } = require("@google-cloud/local-auth");

const gmail = google.gmail("v1");

async function sendEmail(subject, recipientEmail, body) {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "../../config/credentials.json"),
    scopes: ["https://www.googleapis.com/auth/gmail.send"],
  });
  google.options({ auth });

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
  console.log(res.data);
  return res.data;
}
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

module.exports = submissionResponse;
