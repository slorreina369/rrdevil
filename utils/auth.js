//middleware used for authentication
function authenticate(req, res, next) {
  const auth = {
    login: process.env.ADMIN_LOGIN,
    password: process.env.ADMIN_PASSWORD,
  };

  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");
  if (login && password && login === auth.login && password === auth.password) {
    return next();
  }

  res.set("WWW-Authenticate", 'Basic realm="401');
  res.status(401).send("No password, no access! That's the rules");
}

module.exports = authenticate;
