// lib/cloudinary.js
import { Cloudinary } from 'cloudinary-core';

// Initialize Cloudinary instance
const cloudinary = new Cloudinary({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  secure: true
});

// Helper function to get optimized image URL
export const getOptimizedImageUrl = (publicId, options = {}) => {
  const defaultOptions = {
    width: 400,
    height: 250,
    crop: 'fill',
    quality: 'auto',
    fetch_format: 'auto'
  };
  
  return cloudinary.url(publicId, { ...defaultOptions, ...options });
};

// Helper function to get thumbnail URL
export const getThumbnailUrl = (publicId) => {
  return getOptimizedImageUrl(publicId, {
    width: 400,
    height: 250,
    crop: 'fill'
  });
};

// Helper function to get hero image URL
export const getHeroImageUrl = (publicId) => {
  return getOptimizedImageUrl(publicId, {
    width: 800,
    height: 500,
    crop: 'fill'
  });
};

export default cloudinary;