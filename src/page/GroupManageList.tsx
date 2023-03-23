import React from 'react'
import styled from 'styled-components'

function GroupManageList() {
  return (
    <Container>
      <HeaderContainer>그룹관리</HeaderContainer>
      <ContentContainer>
        <GroupContainer>
          <GroupContentBox>
            <GroupContentItem>그룹리스트1</GroupContentItem>
            <GroupContentItem>그룹리스트1</GroupContentItem>
            <GroupContentItem>그룹리스트1</GroupContentItem>
          </GroupContentBox>
          <GroupButtonBox>
            <GroupButton>그룹 추가</GroupButton>
            <GroupButton>그룹 삭제</GroupButton>
          </GroupButtonBox>
        </GroupContainer>
        <ClientContainer>
          클라이언트리스트
        </ClientContainer>
      </ContentContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-left: 250px;
  /* background-color: sandybrown; */
`
const HeaderContainer = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 80px;
  font-size: 28px;
  font-weight: 900;
  /* background-color: crimson; */
`
const ContentContainer= styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 100px;
  /* background-color: cyan; */
`
const GroupContainer = styled.div`
  width: 35%;
  height: 100%;
  /* background-color: bisque; */
`
const GroupContentBox = styled.div`
  /* width: 100%; */
  height: 90%;
  border: 2px solid burlywood;
  margin: 0px 30px 0px 30px;
`
const GroupContentItem = styled.div`
  height: 40px;
  padding: 10px;
  border: 1px solid burlywood;
  /* background-color: burlywood; */
`
const GroupButtonBox = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  margin: 0px 30px 0px 30px;
  /* background-color: #bb95dd; */
`
const GroupButton = styled.button`
  width: 100px;
  height: 40px;
  border: 2px solid black;
`
const ClientContainer = styled.div`
  width: 65%;
  height: 100%;
  background-color: cornsilk;
`
export default GroupManageList;