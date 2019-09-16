import ApolloClient from 'apollo-boost';
import { GRAPHQL_ENDPOINT } from './constants'

const client = new ApolloClient({
    uri: GRAPHQL_ENDPOINT
});

export default client;