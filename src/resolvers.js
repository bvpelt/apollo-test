

module.exports = {
    Query: {

        activiteiten: async (_, __, { dataSources }) => {
            const allActiviteiten = await dataSources.ozonAPI.getActiviteiten();

            //
            //const activiteiten = paginateResults({
            //    after,
            //    pageSize,
            //    results: allActiviteiten,
            //});
            //
            return allActiviteiten;
        },



        activiteit: (_, { id }, { dataSources }) =>
            dataSources.ozonAPI.getActiviteit({ activiteitenId: id }),

        activiteitengerelateerd: (_, { id }, { dataSources }) =>
            dataSources.ozonAPI.getActiviteitenGerelateerd({ activiteitenId: id }),

    }
};

