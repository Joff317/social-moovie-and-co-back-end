// Require the cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
});

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
});



/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

// (async () => {
//   // Set the image to upload
//   const imagePath =
//     "https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg";

//   // Upload the image
//   const publicId = await uploadImage(imagePath);

// })();

module.exports = uploadImage;
