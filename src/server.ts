// server.ts
import fs from "node:fs";
import https from "node:https";
import { AddressInfo } from "node:net";
import app from './app'

// ! ONLY FOR DEV
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

const server = https.createServer(options, app).listen(3080, () => {
  console.log(
    "server listening on port " + (server.address() as AddressInfo).port
  );
});
