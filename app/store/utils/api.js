import axios from 'axios';

export default {
  /**
   *
   * Runs a get request with given url with given url params.
   *
   * @param {String} url url to get to
   * @param {Object} params url parameters which will be attached to the url
   *
   * @returns {Promise} promise with response data or error
   */
  get(url, params) {
    return axios
      .get(url, params)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  /**
   *
   * Runs a post request with a given url and payload.
   *
   * @param {String} url url to post to
   * @param {Object} payload post payload which will be attached to the request
   *
   * @returns {Promise} promise with response data or error
   */
  post(url, payload) {
    return axios
      .post(url, payload)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  /**
   *
   * Runs a patch request with a given url and payload.
   * @param {String} url url to patch to
   * @param {Object} payload patch payload which will be attached to the request
   *
   * @returns {Promise} promise with response data or error
   */
  patch(url, payload) {
    return axios
      .patch(url, payload)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));
  },
};
