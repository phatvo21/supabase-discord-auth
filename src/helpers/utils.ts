/**
 * Check the validity of the json format
 * @param {string} data - The string data to be checked
 * @return {Boolean} - Indicates that the data is Json formatted
 */
export function isJson(data: string): boolean {
  try {
    JSON.parse(data);
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * Get the current date time
 * @return {number} - The given time in number format
 */
export function getTime(): number {
  const date: Date = new Date();
  return date.getTime();
}
