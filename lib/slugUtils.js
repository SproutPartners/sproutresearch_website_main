// lib/slugUtils.js
export function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export function ensureUniqueSlug(slug, existingSlugs) {
  let uniqueSlug = slug;
  let counter = 1;
  
  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  
  return uniqueSlug;
}

// Convert Google Drive link to embeddable format
export function convertDriveLinkToEmbed(driveLink) {
  try {
    // Extract file ID from various Google Drive URL formats
    let fileId = '';
    
    if (driveLink.includes('/file/d/')) {
      // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
      fileId = driveLink.split('/file/d/')[1].split('/')[0];
    } else if (driveLink.includes('id=')) {
      // Format: https://drive.google.com/open?id=FILE_ID
      fileId = driveLink.split('id=')[1].split('&')[0];
    } else if (driveLink.includes('/d/')) {
      // Other formats
      const match = driveLink.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (match) fileId = match[1];
    }
    
    if (!fileId) {
      throw new Error('Could not extract file ID from Drive link');
    }
    
    // Return embeddable URL
    return `https://drive.google.com/file/d/${fileId}/preview`;
  } catch (error) {
    console.error('Error converting Drive link:', error);
    return driveLink; // Return original link as fallback
  }
}