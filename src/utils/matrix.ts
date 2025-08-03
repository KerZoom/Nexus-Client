/**
 * Matrix utility functions for handling Matrix-specific data
 */

/**
 * Converts an mxc:// URI to an HTTP URL for downloading media
 * 
 * @param mxcUri - The mxc:// URI (e.g., "mxc://matrix.org/AbCdEfGhIjKlMnOp")
 * @param homeserver - The homeserver domain (e.g., "matrix.org")
 * @param thumbnailSize - Optional thumbnail size for images
 * @returns HTTP URL for accessing the media
 */
export function mxcToHttp(
  mxcUri: string,
  homeserver: string,
  thumbnailSize?: { width: number; height: number }
): string {
  if (!mxcUri || !mxcUri.startsWith('mxc://')) {
    throw new Error('Invalid mxc:// URI');
  }

  // Extract server name and media ID from mxc:// URI
  // Format: mxc://server.name/mediaId
  const mxcMatch = mxcUri.match(/^mxc:\/\/([^/]+)\/(.+)$/);
  if (!mxcMatch) {
    throw new Error('Malformed mxc:// URI');
  }

  const [, serverName, mediaId] = mxcMatch;

  // Use the provided homeserver for the HTTP request
  // This allows us to download media through any homeserver in the federation
  const baseUrl = `https://${homeserver}/_matrix/media/r0`;

  if (thumbnailSize) {
    // Generate thumbnail URL
    return `${baseUrl}/thumbnail/${serverName}/${mediaId}?width=${thumbnailSize.width}&height=${thumbnailSize.height}&method=crop`;
  } else {
    // Generate direct download URL
    return `${baseUrl}/download/${serverName}/${mediaId}`;
  }
}

/**
 * Generates a thumbnail URL for Matrix media
 */
export function mxcToThumbnail(
  mxcUri: string,
  homeserver: string,
  width: number = 96,
  height: number = 96
): string {
  return mxcToHttp(mxcUri, homeserver, { width, height });
}

/**
 * Validates if a string is a valid mxc:// URI
 */
export function isValidMxcUri(uri: string): boolean {
  return typeof uri === 'string' && /^mxc:\/\/[^/]+\/.+$/.test(uri);
}

/**
 * Extracts the server name from an mxc:// URI
 */
export function getMxcServerName(mxcUri: string): string | null {
  const match = mxcUri.match(/^mxc:\/\/([^/]+)\//);
  return match ? match[1] : null;
}

/**
 * Extracts the media ID from an mxc:// URI
 */
export function getMxcMediaId(mxcUri: string): string | null {
  const match = mxcUri.match(/^mxc:\/\/[^/]+\/(.+)$/);
  return match ? match[1] : null;
}

/**
 * Generates a placeholder avatar URL for users without avatars
 * This creates a colorful gradient based on the user ID
 */
export function generatePlaceholderAvatar(userId: string, size: number = 96): string {
  // Create a simple hash of the user ID for consistent colors
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate HSL color from hash
  const hue = Math.abs(hash) % 360;
  const saturation = 65 + (Math.abs(hash) % 20); // 65-85%
  const lightness = 45 + (Math.abs(hash) % 10); // 45-55%

  // Create SVG data URL for a simple gradient avatar
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(${hue},${saturation}%,${lightness}%);stop-opacity:1" />
          <stop offset="100%" style="stop-color:hsl(${(hue + 30) % 360},${saturation}%,${lightness - 10}%);stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="url(#grad)" />
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
