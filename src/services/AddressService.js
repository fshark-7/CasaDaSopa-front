import HttpClient from './utils/HttpClient';

class AddressService {
  constructor() {
    this.httpClient = new HttpClient('https://casadasopa-api.herokuapp.com/api');
  }

  async listAdresses() {
    return this.httpClient.get('/endereco');
  }

  async getAddress(id) {
    return this.httpClient.getById(`/endereco/${id}`);
  }

  async createAddress(adresses) {
    return this.httpClient.post('/endereco', adresses);
  }

  async updateAddress(id, address) {
    return this.httpClient.update(`/endereco/${id}`, address);
  }

  async deleteAddress(id) {
    return this.httpClient.delete(`/endereco/${id}`);
  }
}

export default new AddressService();
