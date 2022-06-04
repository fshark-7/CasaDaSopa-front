import HttpClient from './utils/HttpClient';

class EntityService {
  constructor() {
    this.httpClient = new HttpClient('https://casadasopa-api.herokuapp.com/api');
  }

  async listEntities() {
    return this.httpClient.get('/empresa');
  }

  async getEntity(id) {
    return this.httpClient.getById(`/empresa/${id}`);
  }

  async createEntity(entitites) {
    return this.httpClient.post('/empresa', entitites);
  }

  async updateEntity(id, entity) {
    return this.httpClient.update(`/empresa/${id}`, entity);
  }

  async deleteEntity(id) {
    return this.httpClient.delete(`/empresa/${id}`);
  }
}

export default new EntityService();
