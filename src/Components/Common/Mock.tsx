/**
 * Simulate network IO using a timeout wrapped in a promise
 * @param ms milliseconds to wait
 */
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));