export const GRAPHQL_ENDPOINT = 'https://countries.trevorblades.com'

export const GET_ALL_COUNTRIES = `
{
  countries{
    name
    code
    languages {
      name
      native
    }
    native
    continent {
      name
    }
  }
}
`

export const GET_COUNTRY = `
query country($countryCode: String!){
  country(code: $countryCode) {
    name
    currency
    phone
    code
  }
}
`