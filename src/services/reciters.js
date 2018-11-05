import client from './client';

/**
 * Get Reciters
 * @param {object} options
 * @param {int} [options.page]
 * @param {int} [options.limit]
 *
 * @returns {Promise}
 */
export function getReciters(options = {}) {
  return client.get('/api/reciters', options);
}

/**
 * Get a reciter
 * @param {string|int} id - Slug or ID of the reciter
 * @param {object} options
 *
 * @returns {Promise}
 */
export function getReciter(id, options = {}) {
  return client.get(`/api/reciters/${id}`, options);
}

export default {
  getReciters,
  getReciter,
};
