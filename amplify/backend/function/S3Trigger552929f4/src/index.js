const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const rekognitionClient = new AWS.Rekognition();
const axios = require("axios");
const FormData = require("form-data");

const useRegex = (input) => {
  let regex = /^[0-9]+$/i;
  return regex.test(input);
};

const UPLOAD_BUCKET_NAME = "ubiceupload150429-dev";
const DESTINATION_BUCKET_NAME = "ubice";

const EXIFTOOL_EC2_INSTANCE_IP = "54.193.233.36";
const EXIFTOOL_EC2_INSTANCE_PORT = 3000;

async function rekognize(imageBytes) {
  try {
    const params = {
      Image: {
        Bytes: imageBytes,
      },
      Filters: {
        WordFilter: {
          MinConfidence: 95,
        },
      },
    };
    const commandResult = await rekognitionClient.detectText(params).promise();
    let numbersArray = commandResult.TextDetections.filter((textDetection) =>
      useRegex(textDetection.DetectedText)
    ).map((textDetection) => textDetection.DetectedText);
    numbersArray = Array.from(new Set(numbersArray));
    if (!numbersArray.length) {
      numbersArray = ["#"];
    }
    return numbersArray;
  } catch (err) {
    console.error("Error rekognizing an image: ", err);
    // throw new Error("Error rekognizing an image: " + err);
  }
}

exports.handler = async (event) => {
  let response = null;
  const encodedObjectKey = event.Records[0].s3.object.key;
  const objectKey = decodeURIComponent(encodedObjectKey);
  try {
    response = await s3
      .getObject({ Bucket: UPLOAD_BUCKET_NAME, Key: objectKey })
      .promise();
  } catch (err) {
    console.error("Error obtaining S3 object: ", err);
    // throw new Error("Error obtaining S3 object: " + err);
  }
  const numbersArray = await rekognize(response.Body);
  let imageBuffer;
  try {
    const formData = new FormData();
    formData.append("image", response.Body, {
      filename: objectKey,
      contentType: "image/jpeg",
    });
    formData.append("numbers", JSON.stringify(numbersArray));

    // Replace with your EC2 instance's public IP or domain and the desired endpoint
    const ec2Url = `http://${EXIFTOOL_EC2_INSTANCE_IP}:${EXIFTOOL_EC2_INSTANCE_PORT}/process-image`;
    const { data } = await axios.post(ec2Url, formData, {
      headers: formData.getHeaders(),
      responseType: "arraybuffer",
    });
    imageBuffer = data;
  } catch (err) {
    console.error("Error writing on image metadata with exiftool: ", err);
    // throw new Error("Error writing on image metadata with exiftool: ", +err);
  }
  try {
    await s3
      .putObject({
        Bucket: DESTINATION_BUCKET_NAME,
        Key: objectKey,
        Body: imageBuffer,
        ContentType: "image/jpeg",
      })
      .promise();
  } catch (err) {
    console.error("Error uploading on the destination bucket: ", err);
    // throw new Error("Error uploading on the destination bucket: " + err);
  }
};