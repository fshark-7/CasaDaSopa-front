import HttpClient from './utils/HttpClient';

class FamilyRequestService {
  constructor() {
    this.httpClient = new HttpClient('https://casadasopa-api.herokuapp.com/api');
  }

  async listRequests() {
    return this.httpClient.get('/solicitacao');
  }

  async listFamilyResquest(idFamily) {
    return this.httpClient.getById(`/solicitacaoAlternativa/${idFamily}`);
  }

  async getResquest(id) {
    return this.httpClient.getById(`/solicitacao/${id}`);
  }

  async createRequest(request) {
    return this.httpClient.post('/solicitacao', request);
  }

  async updateRequest(id, request) {
    return this.httpClient.update(`/solicitacao/${id}`, request);
  }

  async deleteRequest(id) {
    return this.httpClient.delete(`/solicitacao/${id}`);
  }
}

export default new FamilyRequestService();
