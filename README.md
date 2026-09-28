# Web Application Firewall Demo

A small Node.js/Express learning project that filters request query strings and user-agent values against a basic keyword list, then records matches in a local log file.

> **Security note:** This is a demonstration only, not a production web application firewall. Keyword matching is easy to bypass and can also block legitimate requests. Use a maintained security solution and defense-in-depth for real applications.

## Run locally

Requires Node.js and npm.

```sh
npm install
npm start
```

Then open <http://localhost:3000>. The app listens on port `3000`; matching requests are written to `attack_log.txt`.

`node_modules/` and the generated attack log are excluded from Git. Install dependencies with `npm install` rather than committing them.
