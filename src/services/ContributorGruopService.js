import HttpClient from './utils/HttpClient';

class ContributorGruopService {
  constructor() {
    this.httpClient = new HttpClient('https://casadasopa-api.herokuapp.com/api');
  }

  async listGroups() {
    return this.httpClient.get('/colaboradorGrupo');
  }

  async getGroup(id) {
    return this.httpClient.getById(`/colaboradorGrupo/${id}`);
  }

  async createGroup(groups) {
    return this.httpClient.post('/colaboradorGrupo', groups);
  }

  async updateGroup(id, group) {
    return this.httpClient.update(`/colaboradorGrupo/${id}`, group);
  }

  async deleteGroup(id) {
    return this.httpClient.delete(`/colaboradorGrupo/${id}`);
  }
}

export default new ContributorGruopService();
