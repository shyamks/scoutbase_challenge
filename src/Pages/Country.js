import styled from 'styled-components'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import { GET_COUNTRY } from '../constants';
import React from 'react';

const CountryContainer = styled.div`
  display: flex;
  flex-direction: column;
`

function Country({ match }) {
    const [loadCountry, { called, loading, data }] = useLazyQuery(gql(GET_COUNTRY));
    let code = match.params.code
    console.log(code,'code')
    React.useEffect(() => {
        loadCountry({ variables: { countryCode: code } })
    }, [])
    if (loading) { return <p>Loading...</p> }
    let countryData
    if (data) {
        let { country } = data
        console.log(data, 'countryData')
        if (country)
            countryData = <div> Name- {country.name}, Phone- {country.phone}, Currency- {country.currency}</div>
        else
            countryData = <>There is no country with code {code}</>
    }

    return (
        <CountryContainer>
            <div>Country Code: {code} </div>
            {countryData && countryData}
        </CountryContainer>
    )
}

export default Country