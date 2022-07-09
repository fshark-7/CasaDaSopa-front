import HttpClient from './utils/HttpClient';

class GroupService {
  constructor() {
    this.httpClient = new HttpClient('https://casadasopa-api.herokuapp.com/api');
  }

  async listGroups() {
    return this.httpClient.get('/test');
    // return this.httpClient.get('/grupo');
  }

  async getGroup(id) {
    return this.httpClient.getById(`/test/${id}`);
  }

  async createGroup(groups) {
    return this.httpClient.post('/grupo', groups);
  }

  async updateGroup(id, group) {
    return this.httpClient.update(`/grupo/${id}`, group);
  }

  async deleteGroup(id) {
    return this.httpClient.delete(`/grupo/${id}`);
  }
}

export default new GroupService();
