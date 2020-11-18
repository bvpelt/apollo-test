

module.exports = {
    Query: {

        activiteiten: async (_, __, { dataSources }) => {
            const allActiviteiten = await dataSources.ozonAPI.getActiviteiten();
            return allActiviteiten;
        },

        activiteit: (_, { id }, { dataSources }) =>
            dataSources.ozonAPI.getActiviteit({ activiteitenId: id }),

        activiteitengerelateerd: (_, { id }, { dataSources }) =>
            dataSources.ozonAPI.getActiviteitenGerelateerd({ activiteitenId: id }),

        omgevingsdocumenten: async (_, __, { dataSources }) => {
            const allOmgevingsdocumenten = await dataSources.ozonAPI.getOmgevingsdocumenten();
            return allOmgevingsdocumenten;
        },

        omgevingsdocument: (_, { id }, { dataSources }) =>
        dataSources.ozonAPI.getOmgevingsdocument({ omgevingsdocumentId: id }),
    },

    Mutation: {       
          activiteitenzoek:  async (_, { parameters }, { dataSources }) => {
            const response = await dataSources.ozonAPI.postActiviteitenZoek({ parameters });
            return response;
          },          
    }
};

