import React from 'react'
import styled from 'styled-components'
import ClientHeader from '../components/ClientHeader'
import SingleUserCreate from './SingleUserCreate'

function ClientRegistration() {
  return (
    <Container>
      <ClientHeader />
      <SingleUserCreate />
    </Container>

  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
  padding-left: 250px;
  /* background-color: sandybrown; */
`

export default ClientRegistration