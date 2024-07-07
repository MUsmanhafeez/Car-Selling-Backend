const cloudinary = require('../../utils/cloudinary')


const uploadImageToCloudinary = async (file) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({
        resource_type: 'auto',
        public_id: file.originalname.split('.')[0],
        timeout: 60000,
      }, (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          reject(error);
        } else {
          resolve({ path: result.secure_url, name: file.originalname });
        }
      });

      uploadStream.end(file.buffer);
    });
  } catch (error) {
    console.error('Error in uploadImageToCloudinary function:', error);
    throw error; // Consider removing this line
  }
};

module.exports = {
  uploadImageToCloudinary
};
