import client from './client';

/**
 * Get a single lyric
 * @param {string|int} reciter - Reciter ID
 * @param {string|int} album - Album ID
 * @param track
 * @param lyric
 * @param {object} [options]
 * @param {int} [options.page]
 * @param {int} [options.limit]
 *
 * @returns {Promise}
 */
export function getLyric(reciter, album, track, lyric, options = {}) {
  return client.get(`/api/reciters/${reciter}/albums/${album}/tracks/${track}/lyrics/${lyric}`, options);
}

/**
 * Update a Track
 * @param {string|int} reciter - Reciter ID
 * @param {string|int} album - Album ID
 * @param {string|int}  track - Track ID or Slug
 * @param {string|int}  lyric - Lyric ID
 * @param data
 *
 * @returns {Promise}
 */
export function updateLyric(reciter, album, track, lyric, data) {
  return client.post(`/api/reciters/${reciter}/albums/${album}/tracks/${track}/lyrics/${lyric}`, data);
}

export default {
  getLyric,
  updateLyric
};
