import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    const dataInit = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const response = await fetch(`${this.baseURL}${path}`, dataInit);

    const body = await response.json();

    if (response.ok) {
      return body;
    }

    throw new APIError(
      body.message,
      response,
    );
  }

  async getById(path) {
    const dataInit = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await fetch(`${this.baseURL}${path}`, dataInit);

    const body = await response.json();

    if (response.ok) {
      return body;
    }

    throw new APIError(
      body.message,
      response,
    );
  }

  async post(path, data) {
    const dataInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${this.baseURL}${path}`, dataInit);

    return response.json();
  }

  async update(path, data) {
    const dataInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${this.baseURL}${path}`, dataInit);
    return response.json();
  }

  async delete(path) {
    const dataInit = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await fetch(`${this.baseURL}${path}`, dataInit);
    return response.json();
  }
}

export default HttpClient;
