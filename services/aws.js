const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadToAWS = async (file) => {
    const params = {
        Bucket: "multi-cloud-demo-aws",
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
    };
    const data = await s3.upload(params).promise();
    return data.Location;
};

module.exports = { uploadToAWS };
