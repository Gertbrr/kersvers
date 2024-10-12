import sampleData from '@/data/output.json';

export default defineEventHandler(async (event) => {
  const sampleSize = 8;

  try {
    const jsonData = sampleData;

    // Ensure the JSON data is an array
    if (!Array.isArray(jsonData)) {
      throw new Error('The JSON file should contain an array of items');
    }

    // If the JSON array has fewer items than the sample size, return all items
    if (jsonData.length <= sampleSize) {
      console.log(`Warning: JSON file contains only ${jsonData.length} items. Returning all items.`);
      return jsonData;
    }

    // Randomly sample 'sampleSize' number of items
    const sampledData = [];
    const indices = new Set();

    while (indices.size < sampleSize) {
      const randomIndex = Math.floor(Math.random() * jsonData.length);
      if (!indices.has(randomIndex)) {
        indices.add(randomIndex);
        sampledData.push(jsonData[randomIndex]);
      }
    }

    return sampledData;
  } catch (error) {
    console.error('Error sampling JSON:', error.message);
    throw error;
  }
});
