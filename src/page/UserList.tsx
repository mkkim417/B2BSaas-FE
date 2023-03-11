import React from 'react'
import styled from 'styled-components'

function UserList() {
  return (
    <Wrapper>userList</Wrapper>
  )
}

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding-left: 200px;
  gap: 30px;
`
export default UserList