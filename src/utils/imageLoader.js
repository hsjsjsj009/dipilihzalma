const blobCache = new Map();

/**
 * Preloads an image by fetching it and converting it to a Blob URL.
 * Reuses the cached Blob URL if it has already been fetched.
 * @param {string} url - The original URL of the image to fetch.
 * @returns {Promise<string>} A promise that resolves to the Blob URL.
 */
export const preloadImageAsBlob = async (url) => {
    if (blobCache.has(url)) {
        return blobCache.get(url);
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
        }
        
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        
        blobCache.set(url, objectUrl);
        return objectUrl;
    } catch (error) {
        console.error("Error preloading image as blob:", error);
        // Fallback to the original URL if fetching or Blob creation fails
        return url;
    }
};

/**
 * Synchronously retrieves a preloaded Blob URL from the cache.
 * If the image hasn't been preloaded yet, it returns the original URL as a fallback.
 * @param {string} url - The original URL of the image.
 * @returns {string} The cached Blob URL or the original URL.
 */
export const getPreloadedImage = (url) => {
    return blobCache.get(url) || url;
};
