import http from "node:http";
import { URL } from "node:url";
import { createOAuthClient, REDIRECT_URI, SCOPES, saveToken, TOKEN_PATH } from "./config.mjs";

const client = createOAuthClient();

const authUrl = client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: SCOPES,
});

const redirect = new URL(REDIRECT_URI);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== redirect.pathname) {
    res.writeHead(404).end();
    return;
  }

  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error || !code) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end(`Authorization failed: ${error ?? "no code returned"}`);
    server.close();
    process.exitCode = 1;
    return;
  }

  try {
    const { tokens } = await client.getToken(code);
    saveToken(tokens);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h2>Search Console connected.</h2><p>You can close this tab.</p>");
    console.log(`\nAuthorized. Token saved to ${TOKEN_PATH}`);
    console.log(`Next: npm run gsc:sites   (to list your properties)`);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(`Token exchange failed: ${err.message}`);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});

server.listen(Number(redirect.port), () => {
  console.log("Open this URL in your browser and approve access:\n");
  console.log(authUrl);
  console.log(`\nWaiting for the redirect on ${REDIRECT_URI} ...`);
});
