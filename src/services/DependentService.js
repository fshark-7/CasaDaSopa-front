import HttpClient from './utils/HttpClient';

class DependentService {
  constructor() {
    this.httpClient = new HttpClient('https://casadasopa-api.herokuapp.com/api');
  }

  async listDependents(idFamily) {
    return this.httpClient.getById(`/dependenteAlternativa/${idFamily}`);
  }

  async getDependent(id) {
    return this.httpClient.getById(`/dependente/${id}`);
  }

  async createDependent(dependents) {
    return this.httpClient.post('/dependente', dependents);
  }

  async updateDependent(id, dependent) {
    return this.httpClient.update(`/dependente/${id}`, dependent);
  }

  async deleteDependent(id) {
    return this.httpClient.delete(`/dependente/${id}`);
  }
}

export default new DependentService();
