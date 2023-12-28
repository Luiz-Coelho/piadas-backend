exports.getImage = async (req, res) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: req.params.filename,
    };
    const data = await s3.getObject(params).promise();
    res.set("Content-Type", data.ContentType);
    res.send(data.Body);
  } catch (error) {
    console.error(error);
    res.status(500).send("Falha ao buscar a imagem");
  }
};
