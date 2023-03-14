import axios from 'axios'
import { off } from 'process'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function UserGroupList() {

  const navigate = useNavigate()

  // 그룹리스트 api 담는 상태변수
  const [ groupList, setGroupList ] = useState([] as any)

  // 개별 항목을 체크했을 때의 state
  const [ isCheckingBox, setIsCheckingBox ] = useState(false)

  //  checkedArr type

  // 체크항목 저장하는 변수 state
  const [ checkedArr, setCheckedArr ] = useState<String[]>([])

  // 개별 체크표시 핸들러
  const checkHandler  = (e:any, id:any) => {
    console.log('타켓 checked값 : ', e.target.checked, '타켓 Id값 :', id)
    setIsCheckingBox(!isCheckingBox)
    checkedItemHandler(e.target.checked, id)
    console.log('개별체크표시핸들러의 Id값확인', id)
  }
  // 전체 체크박스 선택 핸들러
  const allCheckHandler = ( isChecked : any) => {
    if(isChecked) {
      groupList.map((el:any) => checkedArr.push(el.id))
      setCheckedArr(checkedArr)
      console.log('all', checkedArr)
    } else {
      setCheckedArr([])
    }
  }

  // 체크아이템 변수에 담는 핸들러
  const checkedItemHandler = (isChecked : any, id : any) => {
    if(isChecked) {
      // 배열 추가 -> 객체 추가면 checkedArr.add
      checkedArr.push(id);
      setCheckedArr(checkedArr);
      // setCheckedArr([...checkedArr, id])
    } else if ( !isChecked || checkedArr.includes(id)) {
      setCheckedArr( checkedArr => checkedArr.filter((item) => item !== id))
    }
    console.log('checkedList', checkedArr)
  }

  // 그룹 데이터 api
  const getUserData = async () => {
    const response  = await axios.get('http://localhost:4000/grouplist')
    setGroupList(response.data)
  }
  // 페이지 렌더링시 우선 데이터 받아오기
  useEffect(() =>{
    getUserData();
  })

  // 메세지 보내기 button handler
  const messageSendHandler = () => {
    // 체크박스 1개일 경우에만 메세지 보내기로 이동. 다수 선택 시 한개만 선택해달라고 안내
    if (checkedArr.length === 1) {
      console.log(checkedArr)
      alert('해당 그룹의 메세지보내기 페이지로 이동됩니다.')
    } else if (checkedArr.length === 0) {
      alert('한 개의 그룹리스트를 선택해주세요.')
    } else {
      alert('2개 이상의 그룹리스트를 선택하셨습니다. 한 개만 선택해주세요.')
    }

  }
  // 전체 삭제 button handler
  const groupDeleteHandler = () => {
    if ( checkedArr.length === groupList.length ) {
      if(window.confirm('그룹을 전체삭제하시겠습니까?')) {
        alert('삭제가 완료되었습니다.')
        // api 삭제 통신
        // const deleteUserData = async () => {
        //   const response  = await axios.delete('http://localhost:4000/grouplist')
        //   console.log(groupList)
        // }
      } else {
        // anything
      }
    } else {
      alert('해당그룹을 모두 체크해주세요.')
    }
  }
  // 선택 삭제 button handler 
  const individualDeleteHandler = () => {
    const urls = checkedArr.map((groupId) => `http://localhost:4000/grouplist/${groupId}`)
    console.log(urls)
    axios.all(urls.map(url => axios.delete(url)))
      .then(response => {
        console.log(response)
        alert('삭제가 완료되었습니다')
      }).catch(error => {
        console.log(error.response)
        alert('삭제를 실패하였습니다.')
      })
  }
  // 특정 그룹리스트 클릭시 그룹리스트 내 유저리스트 볼 수 있는 페이지로 이동
  const moveInUserList = ( id:any ) => {
    alert(`해당 그룹 id:${id}의 유저리스트 페이지로 이동`)
  }
  return (
    <Wrapper>
      <HeaderBar>
        <div>유저 그룹 리스트</div>
        <Button onClick={messageSendHandler}> 메세지 보내기</Button>
        <Button onClick={individualDeleteHandler}> 선택 삭제 </Button>
        <Button onClick={groupDeleteHandler}> 전체 삭제 </Button>
      </HeaderBar>
      <ContentContainer>
        <CardHeader>
            <Percentage width="10%">전체선택
              <input 
                type="checkbox" 
                onChange={(e:any) => allCheckHandler(e.target.checked)}
                checked={checkedArr.length === groupList.length ? true : false}/></Percentage>
            <Percentage width="20%">생성일</Percentage>
            <Percentage width="50%">그룹명</Percentage>
            <Percentage width="20%">유저수</Percentage>
          </CardHeader>
          <CardContainer>
            {groupList?.map((item : any)  => {
              return <CardInBox key={item.id} onClick={() => moveInUserList(item.id)}>
                <Percentage width="10%">
                  <input type="checkbox" checked={checkedArr.includes(item.id)} onChange={(e:any) => checkHandler(e, item.id)}/>
                  </Percentage>
                <Percentage width="20%">2023-03-12</Percentage>
                <Percentage width="50%">{item.title}</Percentage>
                <Percentage width="20%">{item.customerlist.length}</Percentage>
              </CardInBox>
            })}
          </CardContainer>
        {/* <div>
          {groupList?.map((item : any)  => {
            return <div key={item.id}>
              {item.title}
            </div>
          })}
        </div> */}
      </ContentContainer>
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  /* justify-content: center; */
  height: 100vh;
  padding-top: 70px;
  padding-left: 200px;
  /* gap: 30px; */
  background-color: yellow;
`
const HeaderBar = styled.div`
  /* width: 100%; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  margin: 50px;
  background-color: aqua;
`
const ContentContainer = styled.div`
  height: 100%;
  background-color: bisque;
  margin: 0px 50px 50px 50px;
`
const TableContainer = styled.table`
  width: 100%;
  height: 40px;
  background-color: brown;
`
const CardContainer = styled.div`
  width: 100%;
  background-color: aqua;
  display: flex;
  flex-direction: column;
  /* gap: 10px; */
`
const CardInBox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: pink;
  margin-bottom: 20px;
  :hover {
    background-color: greenyellow;
    cursor: pointer;
  }
`
const CardHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: deeppink;
  margin-bottom: 20px;
`

const Percentage = styled.div<{width : any}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props : any) => props.width}
`
const Button = styled.button`
  background-color: pink;
  padding: 10px;
`
export default UserGroupList