import { S3 } from "aws-sdk";

// Initialize the Amazon S3 client
const s3 = new S3({
  region: "process.env.AWS_REGION",
  credentials: {
    accessKeyId: "process.env.AWS_ACCESS_KEY_ID",
    secretAccessKey: "process.env.AWS_SECRET_ACCESS_KEY",
  },
});

export const uploadToS3 = async (file) => {
  const params = {
    Bucket: "your-bucket-name",
    Key: file.name,
    Body: file,
    ContentType: file.type,
    ACL: "public-read", // Set the access control list (ACL) to public-read if you want the files to be publicly accessible
  };

  try {
    const response = await s3.upload(params).promise();
    console.log("File uploaded successfully:", response);
  } catch (error) {
    console.error("File upload failed:", error);
  }
};
