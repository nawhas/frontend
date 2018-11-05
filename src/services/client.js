import axios from 'axios';
import {API_DOMAIN} from '../config';
import {getAccessToken} from './auth';

class Client {
  constructor() {
    this.base = API_DOMAIN;
  }
  get(url, params = {}) {
    return this.request('GET', url, params);
  }
  post(url, data = {}) {
    return this.request('POST', url, data);
  }
  put(url, data = {}) {
    return this.request('PUT', url, data);
  }
  patch(url, data = {}) {
    return this.request('PATCH', url, data);
  }
  delete(url, data = {}) {
    return this.request('DELETE', url, data);
  }
  request(method = 'GET', url, data = {}) {
    const config = {method};

    if (url.startsWith('/')) {
      url = url.substr(1);
    }

    config.url = `${this.base}/${url}`;

    if (method === 'GET') {
      config.params = data;
    } else {
      config.data = data;
    }

    config.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return axios(config);
  }
}

export default new Client();
