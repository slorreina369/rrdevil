const path = require("path");
const { google } = require("googleapis");
const { authenticate } = require("@google-cloud/local-auth");

const gmail = google.gmail("v1");

async function sendEmail(email) {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "../../config/credentials.json"),
    scopes: ["https://www.googleapis.com/auth/gmail.send"],
  });
  google.options({ auth });

  const subject = "Submission Acknowlegement";
  const messageParts = [
    "From: Lorreina Guyett <lorreinag93@gmail.com>",
    `To: <${email}>`,
    "Content-Type:text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${subject}`,
    "",
    "test test motherfuckers",
    "with Love",
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

module.exports = sendEmail;
