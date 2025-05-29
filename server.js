require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");

const { uploadToAWS } = require("./services/aws");
const { uploadToAzure } = require("./services/azure");
const { uploadToGCP } = require("./services/gcp");
const path = require("path");

const app = express();
app.use(cors({ origin: "*" })); // Allow all origins
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/cloud", (req, res) => {
    res.json({ cloud: process.env.CLOUD_PROVIDER || "unknown" });
  });

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    try {
        // Upload to all cloud providers in parallel
        const [awsUrl, azureUrl, gcpUrl] = await Promise.all([
            uploadToAWS(req.file),
            uploadToAzure(req.file),
            // uploadToGCP(req.file),
        ]);

        res.json({
            success: true,
            message: "File uploaded to all clouds",
            urls: { aws: awsUrl, azure: azureUrl, 
                // gcp: gcpUrl 
            },
        });
    } catch (err) {
        res.status(500).json({ error: "Upload failed", details: err.message });
    }
});

app.listen(3000, () => console.log("Server running on port 5000"));
