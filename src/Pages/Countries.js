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
  const { called, error, loading, data: countries } = useQuery(gql(GET_ALL_COUNTRIES));
  const { serverData, staticContext } = props
  // console.log(props,'Countries Page')

  // let par
  // console.log(staticContext.data.data,'props')
  let show = <> </>
  if (loading && !staticContext) show = <>Loading</>
  if (error && !staticContext) show = <>Error</>
  else if ( staticContext || countries) {
    let showCountries = (staticContext && staticContext.data.data.countries) || countries.countries
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

function HigherOrder(props) {
  return <AppContext.Consumer>
    {value => {
      let { serverData } = value || {}
      return <Countries {...props} serverData={serverData} />
    }}
  </AppContext.Consumer>
}

export default HigherOrder
