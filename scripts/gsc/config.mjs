import fs from "node:fs";
import path from "node:path";
import { google } from "googleapis";

export const GSC_DIR = path.join(process.cwd(), ".gsc");
export const CREDENTIALS_PATH = path.join(GSC_DIR, "credentials.json");
export const TOKEN_PATH = path.join(GSC_DIR, "token.json");
export const OUT_DIR = path.join(GSC_DIR, "out");

export const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];
export const REDIRECT_URI = "http://localhost:5555/oauth2callback";

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readCredentials() {
  if (process.env.GSC_CLIENT_ID && process.env.GSC_CLIENT_SECRET) {
    return {
      clientId: process.env.GSC_CLIENT_ID,
      clientSecret: process.env.GSC_CLIENT_SECRET,
    };
  }

  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(
      `Missing OAuth credentials.\n` +
        `Create a "Desktop app" OAuth client in Google Cloud Console, download the JSON,\n` +
        `and save it as: ${CREDENTIALS_PATH}\n` +
        `(or set GSC_CLIENT_ID / GSC_CLIENT_SECRET env vars). See scripts/gsc/README.md`,
    );
  }

  const raw = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
  const creds = raw.installed ?? raw.web ?? raw;
  const clientId = creds.client_id ?? creds.clientId;
  const clientSecret = creds.client_secret ?? creds.clientSecret;

  if (!clientId || !clientSecret) {
    throw new Error(`Could not read client_id / client_secret from ${CREDENTIALS_PATH}`);
  }

  return { clientId, clientSecret };
}

export function createOAuthClient() {
  const { clientId, clientSecret } = readCredentials();
  return new google.auth.OAuth2(clientId, clientSecret, REDIRECT_URI);
}

export function saveToken(tokens) {
  ensureDir(GSC_DIR);
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
}

export function loadAuthorizedClient() {
  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error(`Not authorized yet. Run: npm run gsc:auth`);
  }
  const client = createOAuthClient();
  client.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8")));
  client.on("tokens", (tokens) => {
    if (tokens.refresh_token) saveToken(client.credentials);
  });
  return client;
}

export function searchConsole(auth) {
  return google.searchconsole({ version: "v1", auth });
}
