import styled from 'styled-components'
import { Link } from "react-router-dom";
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import React from 'react';

import { GET_ALL_COUNTRIES } from '../constants';

const CountriesContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const Row = styled.div`
  margin: 5px;
`

function Countries({ match, staticContext }) {
  const [loadCountry, { called, loading, error, data: countries }] = useLazyQuery(gql(GET_ALL_COUNTRIES));
  const [result, setResult] = React.useState(null)
  React.useEffect(() => {
    if (window.__ROUTE_DATA__ || countries) {
      setResult(window.__ROUTE_DATA__ || { data: countries })
      if (window.__ROUTE_DATA__)
        delete window.__ROUTE_DATA__
    }
    else {
      loadCountry()
    }
  }, [countries])
  // console.log(!staticContext && (loading || !called), 'status', loading, called, !!result, 'show me what is here')

  let show = <> </>
 
  if (staticContext || result) {
    let showCountries = (staticContext && staticContext.data.data.countries) || (result && result.data.countries)
    show = showCountries.map((country, index) => {
      let { languages } = country
      let allLangs = languages.map(({ name, native }, index) => {
        return <Row> {index + 1}. Name: {name}, Native {native}</Row>
      })
      return (
        <Row>
          {index + 1}. Name: {country.name}, Native: {country.native}, Continent: {country.continent.name}, Area Code (phone):
          <Link to={`${match.url}/${country.code}`}>
            {country.code}
          </Link>
          <Row>Languages: {allLangs}</Row>
        </Row>

      )
    })
  }
  else if (!staticContext && (loading || !called)) show = <>Loading</>
  else if (error && !staticContext) show = <>Error</>
  else {
    show = <div>We are not able to show any countries at the moment</div>
  }
  return (
    <div>
      <h2>Countries</h2>
      <CountriesContainer>
        {show}
      </CountriesContainer>
    </div>
  )
}

export default Countries
