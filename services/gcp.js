const { Storage } = require("@google-cloud/storage");

const storage = new Storage();
const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);

const uploadToGCP = async (file) => {
    const blob = bucket.file(file.originalname);
    await blob.save(file.buffer, { contentType: file.mimetype });
    return `https://storage.googleapis.com/${process.env.GCP_BUCKET_NAME}/${file.originalname}`;
};

module.exports = { uploadToGCP };
