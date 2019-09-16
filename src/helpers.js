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
            return apolloFetch({
                query: (GET_COUNTRY),
                variables: { countryCode: data }
            })
    }


}