const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

async function uploadFile(file) {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: file.originalname,
    Body: file.buffer,
  };

  try {
    await s3.upload(params).promise();
    return params.Key; // Retorna o nome do arquivo no S3
  } catch (error) {
    console.error("Erro ao enviar o arquivo para o S3:", error);
    throw error;
  }
}

module.exports = { uploadFile };
