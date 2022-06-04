import HttpClient from './utils/HttpClient';

class ContributorGroupService {
  constructor() {
    this.httpClient = new HttpClient('https://casadasopa-api.herokuapp.com/api');
  }

  async listContributorsGroup() {
    return this.httpClient.get('/colaboradorGrupo');
  }

  async getGroup(id) {
    return this.httpClient.getById(`/colaboradorGrupo/${id}`);
  }

  async createContributorGroup(contrsGruop) {
    return this.httpClient.post('/colaboradorGrupo', contrsGruop);
  }

  async updateContributorGroup(id, contrGruop) {
    return this.httpClient.update(`/colaboradorGrupo/${id}`, contrGruop);
  }

  async deleteContributorGroup(id) {
    return this.httpClient.delete(`/colaboradorGrupo/${id}`);
  }
}

export default new ContributorGroupService();
