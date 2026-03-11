const express = require("express");
const fs = require("fs");

const app = express();

// 🔹 Attack keywords (all attacks here)
const blacklist = [
  "<script>", "<img", "<iframe", "<form",      // XSS / CSRF
  "select", "drop", "insert", "union", "--",   // SQL Injection
  "../",                                       // LFI
  "cmd=", "exec=",                             // Remote command
  "bot", "crawler",                            // Bots
  "http://", "https://",                       // CSRF external call
  "admin"                                      // Unauthorized access
];

// 🔹 FIREWALL MIDDLEWARE
app.use((req, res, next) => {

    const query = JSON.stringify(req.query).toLowerCase();
    const userAgent = (req.headers["user-agent"] || "").toLowerCase();

    for (let word of blacklist) {

        if (query.includes(word) || userAgent.includes(word)) {

            console.log("Attack detected:", word);

            const log = `Attack detected: ${word} from ${req.ip}\n`;
            fs.appendFileSync("attack_log.txt", log);

            return res.send("Blocked by Web Application Firewall");

        }

    }

    next();
});

// 🔹 NORMAL WEBSITE
app.get("/", (req, res) => {

res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Secure Web Application</title>

<style>
body{
font-family: Arial;
background:#f2f2f2;
text-align:center;
margin-top:50px;
}

.container{
background:white;
width:400px;
margin:auto;
padding:30px;
border-radius:10px;
box-shadow:0px 0px 10px gray;
}

input{
padding:10px;
margin:10px;
width:80%;
}

button{
padding:10px 20px;
background:#007bff;
color:white;
border:none;
border-radius:5px;
}
</style>

</head>

<body>

<div class="container">

<h2>Secure Website</h2>

<p>This website is protected by Web Application Firewall</p>

<h3>Search</h3>

<form method="GET" action="/">
<input type="text" name="q" placeholder="Search something">
<br>
<button type="submit">Search</button>
</form>

</div>

</body>
</html>
`);

});

// 🔹 START SERVER
app.listen(3000, () => {

    console.log("Server running on port 3000");

});