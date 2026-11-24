import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
const dist = path.join(__dirname, "dist");

const basePath = (process.env.BASE_PATH ?? "").trim().replace(/^\/+|\/+$/g, "");

// Serve the build at the sub-path, and at the root too in case the host
// strips the prefix before proxying.
if (basePath) app.use(`/${basePath}`, express.static(dist));
app.use(express.static(dist));
// Express 5 / path-to-regexp 8 no longer accepts bare "*".
app.use((_req, res) => {
  res.sendFile(path.join(dist, "index.html"));
});

app.listen(port, () => console.log(`Listening on ${port}`));
