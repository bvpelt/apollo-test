
const { RESTDataSource } = require('apollo-datasource-rest');

class OzonAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://nep-knooppunt-test.viewer.dso.kadaster.nl/publiek/omgevingsdocumenten/api/presenteren/v5';
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
}


module.exports = OzonAPI;
