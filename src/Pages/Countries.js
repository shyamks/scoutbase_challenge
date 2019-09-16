import styled from 'styled-components'
import { Link } from "react-router-dom";
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import React from 'react';

import { GET_ALL_COUNTRIES } from '../constants';
import AppContext from '../appContext'

const CountriesContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const Row = styled.div`
  margin: 5px;
`

function Countries(props) {
  const [loadCountry, { called, loading, error, data: countries }] = useLazyQuery(gql(GET_ALL_COUNTRIES));
  const [result, setResult] = React.useState(null)
  const { staticContext } = props
  React.useEffect(() => {
    if (window.__ROUTE_DATA__ || countries) {
      setResult(window.__ROUTE_DATA__ || { data: countries })
      if (window.__ROUTE_DATA__)
        delete window.__ROUTE__DATA
    }
    else {
      loadCountry()
    }
  }, [countries])

  let show = <> </>
  if (loading && !staticContext) show = <>Loading</>
  if (error && !staticContext) show = <>Error</>
  else if (staticContext || result) {
    let showCountries = (staticContext && staticContext.data.data.countries) || (result && result.data.countries)
    show = showCountries.map((country, index) => {
      return (
        <Row>
          {index + 1}. Name: {country.name}, Native: {country.native}, Code:
          <Link to={`${props.match.url}/${country.code}`}>
            {country.code}
          </Link>
        </Row>

      )
    })
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

// function HigherOrder(props) {
//   return <AppContext.Consumer>
//     {value => {
//       let { serverData } = value || {}
//       return <Countries {...props} serverData={serverData} />
//     }}
//   </AppContext.Consumer>
// }

export default Countries
