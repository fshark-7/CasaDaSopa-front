import HttpClient from './utils/HttpClient';

class FamilyService {
  constructor() {
    this.httpClient = new HttpClient('https://casadasopa-api.herokuapp.com/api');
  }

  async listFamilies() {
    return this.httpClient.get('/responsavel');
  }

  async getFamily(id) {
    return this.httpClient.getById(`/responsavel/${id}`);
  }

  async createFamily(families) {
    return this.httpClient.post('/responsavel', families);
  }

  async updateFamily(id, family) {
    return this.httpClient.update(`/responsavel/${id}`, family);
  }

  async deleteFamily(id) {
    return this.httpClient.delete(`/responsavel/${id}`);
  }
}

export default new FamilyService();
