import { GRAPHQL_ENDPOINT, GET_ALL_COUNTRIES, GET_COUNTRY } from "./constants";
import gql from "graphql-tag";
const { createApolloFetch } = require('apollo-fetch');

const apolloFetch = createApolloFetch({
    uri: GRAPHQL_ENDPOINT
});

export const loadDataFromServer = (key, data) => {
    switch (key) {
        case 'countries':
            return apolloFetch({
                query: (GET_ALL_COUNTRIES)
            })

        case 'country':
            if (validateCountryParams(data)) {
                return apolloFetch({
                    query: (GET_COUNTRY),
                    variables: { countryCode: data[0].substr(1) }
                })
            }
            else {
                return Promise.resolve(null)
            }

    }
}
// Validation if required here
const validateCountryParams = (params) => {
    return true
}