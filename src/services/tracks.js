import client from './client';

/**
 * Get all tracks from an album
 * @param {string|int} reciter
 * @param {string|int} album
 * @param {object} [options]
 * @param {int} [options.page]
 * @param {int} [options.limit]
 *
 * @returns {Promise}
 */
export function getTracks(reciter, album, options = {}) {
  return client.get(`/api/reciters/${reciter}/albums/${album}/tracks`, options);
}

/**
 * Get a single track
 * @param {string|int} reciter - Reciter ID
 * @param {string|int} album - Album ID
 * @param {string|int} id - Track ID
 * @param {object} [options]
 * @param {int} [options.page]
 * @param {int} [options.limit]
 *
 * @returns {Promise}
 */
export function getTrack(reciter, album, id, options = {}) {
  return client.get(`/api/reciters/${reciter}/albums/${album}/tracks/${id}`, options);
}

/**
 * Update a Track
 * @param {string|int} reciter - Reciter ID
 * @param {string|int} album - Album ID
 * @param {string|int} id - Track ID
 * @param {object} trackData
 *
 * @returns {Promise}
 */
export function updateTrack(reciter, album, id, trackData) {
  return client.post(`/api/reciters/${reciter}/albums/${album}/tracks/${id}`, trackData);
}

export default {
  getTracks,
  getTrack,
  updateTrack,
};
