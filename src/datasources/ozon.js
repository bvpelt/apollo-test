
const { RESTDataSource } = require('apollo-datasource-rest');

class OzonAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = 'https://service.int.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/presenteren/v5/'; 
                     //'https://nep-knooppunt-test.viewer.dso.kadaster.nl/publiek/omgevingsdocumenten/api/presenteren/v5';
    }

    willSendRequest(request) {
        request.headers.set(
            'x-api-key', this.context.token,
            'Content-CRS', this.context.usedcrs,
            'Accept-CRS', this.context.usedcrs,
            'Accept', 'application/json',
            'Content-Type', 'application/json'
    ); 
    }

    async getActiviteiten() {
        const response = await this.get('activiteiten');

        // transform the raw launches to a more friendly
        return response;
    }

    async getActiviteit({ activiteitenId }) {
        const response = await this.get('activiteiten/' + activiteitenId);
        return response;
    }

    async getActiviteitenGerelateerd({ activiteitenId }) {
        const response = await this.get('activiteiten/' + activiteitenId + '/gerelateerd');
        return response;
    }

    async getOmgevingsdocumenten() {
        const response = await this.get('omgevingsdocumenten');

        // transform the raw launches to a more friendly
        return response;
    }

    async getOmgevingsdocument({ omgevingsdocumentId }) {
        const response = await this.get('omgevingsdocumenten/' + omgevingsdocumentId);
        return response;
    }


    // an example making an HTTP POST request
  async postActiviteitenZoek(parameters) {
    return this.post(
      `activiteiten/_zoek`, // path
      parameters, // request body
    );
  }
}


module.exports = OzonAPI;
