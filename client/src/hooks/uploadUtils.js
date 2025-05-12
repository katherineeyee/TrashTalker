// Simple utility functions for image uploading

/**
 * Upload and process an image
 * @param {File} file Image file to upload
 * @param {string} endpoint API endpoint to upload to
 * @returns {Promise<Object>} Response data
 */
export const uploadImage = async (file, endpoint) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};

/**
 * Create an object URL for image preview
 * @param {File} file Image file
 * @returns {string} Object URL
 */
export const createPreviewUrl = (file) => {
  return URL.createObjectURL(file);
};

/**
 * Revoke an object URL to prevent memory leaks
 * @param {string} url Object URL to revoke
 */
export const revokePreviewUrl = (url) => {
  URL.revokeObjectURL(url);
};
