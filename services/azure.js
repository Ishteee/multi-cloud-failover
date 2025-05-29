const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_CONTAINER_NAME;

if (!connectionString || !containerName) {
    throw new Error("Missing Azure Storage configuration in .env");
}

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

// Ensure container exists (optional, but useful)
const ensureContainerExists = async () => {
    try {
        await containerClient.createIfNotExists();
        console.log(`Azure Blob Container '${containerName}' is ready.`);
    } catch (error) {
        console.error("Error ensuring container exists:", error);
    }
};

// Upload file to Azure Blob Storage
const uploadToAzure = async (file) => {
    try {
        const blockBlobClient = containerClient.getBlockBlobClient(file.originalname);
        await blockBlobClient.uploadData(file.buffer, {
            blobHTTPHeaders: { blobContentType: file.mimetype } // Set correct MIME type
        });
        console.log(`File uploaded successfully: ${blockBlobClient.url}`);
        return blockBlobClient.url || blockBlobClient._response.request.url;
    } catch (error) {
        console.error("Azure upload failed:", error);
        throw new Error("Azure upload failed");
    }
};

// Ensure the container is available before any upload attempts
ensureContainerExists();

module.exports = { uploadToAzure };
