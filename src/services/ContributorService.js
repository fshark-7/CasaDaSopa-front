import HttpClient from './utils/HttpClient';

class ContributorService {
  constructor() {
    this.httpClient = new HttpClient('https://casadasopa-api.herokuapp.com/api');
  }

  async listContributors() {
    return this.httpClient.get('/colaborador');
  }

  async getContributor(id) {
    return this.httpClient.getById(`/colaborador/${id}`);
  }

  async createContributor(contributors) {
    return this.httpClient.post('/colaborador', contributors);
  }

  async updateContributor(id, contributor) {
    return this.httpClient.update(`/colaborador/${id}`, contributor);
  }

  async deleteContributor(id) {
    return this.httpClient.delete(`/colaborador/${id}`);
  }
}

export default new ContributorService();
