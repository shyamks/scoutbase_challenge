import styled from 'styled-components'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import { GET_COUNTRY } from '../constants';
import React from 'react';

const CountryContainer = styled.div`
  display: flex;
  flex-direction: column;
`

function Country({ match, staticContext }) {
    const [loadCountry, { called, loading, error, data: country }] = useLazyQuery(gql(GET_COUNTRY));
    let { code } = match.params

    const [result, setResult] = React.useState(null)
    React.useEffect(() => {
        if (window.__ROUTE_DATA__ || country) {
            setResult(window.__ROUTE_DATA__ || { data: country })
            if (window.__ROUTE_DATA__)
                delete window.__ROUTE_DATA__
        }
        else {
            loadCountry({ variables: { countryCode: code } })
        }
    }, [country])
    // console.log(!staticContext && (loading || !called), 'status', loading, called, !!result, 'show me what is here')
    let countryData
    let showCountry = (staticContext && staticContext.data.data.country) || (result && result.data.country)
    if (showCountry) {
        countryData = <div> Name- {showCountry.name}, Phone- {showCountry.phone}, Currency- {showCountry.currency}</div>
    }
    else if (!staticContext && (loading || !called)) countryData = <>Loading</>
    else if (error && !staticContext) countryData = <>Error</>
    else {
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