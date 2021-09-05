import fs from "fs";
import https from "https";
import express from "express";

const app = express();
app.use(express.static("www"));

const options = {
  key: fs.readFileSync("./localhost-key.pem"),
  cert: fs.readFileSync("./localhost.pem"),
};

const server = https.createServer(options, app);

server.listen(process.env.PORT || 8080, () => {
  console.log("Listening on https://10.0.0.200:8080");
});
