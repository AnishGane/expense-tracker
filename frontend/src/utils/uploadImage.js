import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';

const uploadImage = async (imageFile) => {
  if (!imageFile) {
    throw new Error('No image file provided');
  }

  const formData = new FormData();
  // Append the image file to the form data
  formData.append('image', imageFile);

  try {
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Validate response structure
    if (!response.data || !response.data.imageUrl) {
      throw new Error('Invalid response from server: missing imageUrl');
    }

    return response.data; // return the image URL as a response data
  } catch (error) {
    console.error('Error uploading image:', error);

    // Extract error message from response
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Failed to upload image. Please try again.';

    // Create a new error with the extracted message
    const uploadError = new Error(errorMessage);
    uploadError.response = error.response;
    throw uploadError;
  }
};

export default uploadImage;
