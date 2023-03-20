import { Button } from '@mantine/core';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CardContainer, CardInBox, ContentContainer, HeaderBar, Percentage } from './UserGroupList';
import { PaginationBox } from './UserList';

function GroupInUserList() {

  // 선택 그룹의 id
  const { id } = useParams()

  // 유저리스트 데이터 state
  const [groupUserList, setGroupUserList] = useState([] as any);

  // 검색 조건 state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterList, setFilterList] = useState([] as any);

  // 유저리스트 get API
  const getUserData = useCallback(async () => {
    const response = await axios.get('http://localhost:4000/userList');
    setGroupUserList(response.data);
    setFilterList(response.data);
    // console.log(userList)
  }, []);

  // Pagination 처리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 default값으로
  const [count, setCount] = useState(0); // 아이템 총 갯수
  // const [ product, setProduct ] = useState([])  // 리스트에 담아낼 아이템들
  const [postPerPage] = useState(10); // 한 페이지에 보여질 아이템 수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들
  // const userData = userList.slice(indexOfFirstPost, indexOfLastPost)
  const setPage = (error: any) => {
    setCurrentPage(error);
  };

  // 체크박스 관련 state

  // 개별 항목을 체크했을 때의 state
  const [isCheckingBox, setIsCheckingBox] = useState(false);
  // 체크항목 저장하는 변수 state
  const [checkedArr, setCheckedArr] = useState<String[]>([]);
  // 개별 체크표시 핸들러
  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, id: any) => {
    console.log('타켓 checked값 : ', e.target.checked, '타켓 Id값 :', id);
    setIsCheckingBox(!isCheckingBox);
    checkedItemHandler(e.target.checked, id);
    console.log('개별체크표시핸들러의 Id값확인', id);
  };
  // 전체 체크박스 선택 핸들러
  const allCheckHandler = (isChecked: boolean) => {
    const idArray = [] as any;
    if (isChecked) {
      groupUserList.map((el: any) => {
        if (idArray.includes(el.id)) {
          // check 배열에 전체선택 품목 중 포함되어있는 것이 있다면 빼고 push
        } else {
          checkedArr.push(el.id);
          setCheckedArr(checkedArr);
          idArray.push(el.id)
          setCheckedArr(idArray)
        }
      });
    } else {
      setCheckedArr([]);
    }
  };

  // 체크아이템 변수에 담는 핸들러
  const checkedItemHandler = (isChecked: any, id: any) => {
    if (isChecked) {
      // 배열 추가 -> 객체 추가면 checkedArr.add
      checkedArr.push(id);
      setCheckedArr(checkedArr);
      // setCheckedArr([...checkedArr, id])
    } else if (!isChecked || checkedArr.includes(id)) {
      setCheckedArr((checkedArr) => checkedArr.filter((item) => item !== id));
    }
    console.log('checkedList', checkedArr);
  };

  // 페이지 렌더링하자마자 데이터 get
  useEffect(() => {
    getUserData();

    setCount(groupUserList.length);
    setIndexOfLastPost(currentPage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(groupUserList.slice(indexOfFirstPost, indexOfLastPost));
  }, [
    currentPage,
    indexOfLastPost,
    indexOfFirstPost,
    postPerPage,
    getUserData
  ]);

  // 검색필터 useEffect
  useEffect(() => {
    // 필터 bar
    // console.log('targetvalue', searchTerm)
    // console.log('monsters', monsters)
    setGroupUserList(
      // 조건 검색 여기서 설정 => 현재는 그룹명만 설정
      filterList.filter(
        (item: any) =>
          item.id.includes(searchTerm) ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.phone.includes(searchTerm) ||
          item.createDt.includes(searchTerm)
      )
    );
  }, [searchTerm]);

  // 선택 삭제 button handler
  const individualDeleteHandler = () => {
    // 선택 삭제하기 전 한번 더 cofirm창
    if (window.confirm('해당 유저를 삭제하시겠습니까?')) {
      // 확인을 눌렀을 때
      alert('삭제가 완료되었습니다.');
      // const urls = checkedArr.map((groupId) => `http://localhost:4000/grouplist/${groupId}`)
      // console.log(urls)
      // axios.all(urls.map(url => axios.delete(url)))
      //   .then(response => {
      //     console.log(response)
      //     alert('삭제가 완료되었습니다')
      //   }).catch(error => {
      //     console.log(error.response)
      //     alert('삭제를 실패하였습니다.')
      //   })
    } else {
      // confirm창에서 취소를 눌렀을 때 아무일도 발생하지 않는다.
    }
  };

  // 전체 삭제 button handler
  const groupDeleteHandler = () => {
    if (checkedArr.length === groupUserList.length) {
      // 그룹을 전체 선택하였을 경우 실행
      if (window.confirm('유저들을 전체삭제하시겠습니까?')) {
        alert('삭제가 완료되었습니다.');
        // api 삭제 통신
        // const deleteUserData = async () => {
        //   const response  = await axios.delete('http://localhost:4000/grouplist')
        //   console.log(groupList)
        // }
      } else {
        // anything
      }
    } else {
      alert('[전체 선택]을 체크해주세요.');
    }
  };
  // 메세지 보내기 버튼
  const sendMessageButton = () => {
    alert('메세지 보내기버튼\n 협의 후 진행');
  };

  // 그룹 생성 버튼
  const groupCreateButton = () => {
    alert('그룹생성 버튼\n 협의 후 진행');
  };
  // Input search handler
  const inputChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Wrapper>
      <HeaderBar>
        <div>{ id }번 그룹의 유저리스트</div>
        <div>체크 갯수 : {checkedArr.length}</div>
        <div>그룹설명란</div>
        <input placeholder="검색" onChange={inputChange} />
        <Button onClick={sendMessageButton}> 메세지 보내기</Button>
        {/* <Button onClick={clickModal}> 유저 생성</Button> */}
        {/* <Button onClick={groupCreateButton}> 그룹 생성</Button> */}
        <Button onClick={individualDeleteHandler}> 선택 삭제 </Button>
        <Button onClick={groupDeleteHandler}> 전체 삭제 </Button>
      </HeaderBar>
      <ContentContainer>
        <CardHeader>
          <Percentage width="10%">
            전체선택
            <input
              type="checkbox"
              onChange={(e: any) => allCheckHandler(e.target.checked)}
              checked={checkedArr.length === groupUserList.length ? true : false}
            />
          </Percentage>
          <Percentage width="20%">고객명</Percentage>
          <Percentage width="50%">연락처</Percentage>
          <Percentage width="20%">생성일</Percentage>
        </CardHeader>
        <CardContainer>
          {groupUserList.slice(indexOfFirstPost, indexOfLastPost) &&
          groupUserList.length > 0 ? (
            groupUserList
              .slice(indexOfFirstPost, indexOfLastPost)
              .map((item: any) => {
                return (
                  <CardInBox>
                    <Percentage width="10%">
                      <input
                        type="checkbox"
                        checked={checkedArr.includes(item.id)}
                        onChange={(e: any) => checkHandler(e, item.id)}
                      />
                    </Percentage>
                    <Percentage width="20%">{item.name}</Percentage>
                    <Percentage width="50%">{item.phone}</Percentage>
                    <Percentage width="20%">{item.createDt}</Percentage>
                  </CardInBox>
                );
              })
          ) : (
            <div>No Post. </div>
          )}
        </CardContainer>
      </ContentContainer>
      <PaginationBox>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={5}
          pageRangeDisplayed={5}
          prevPageText={'<'}
          nextPageText={'>'}
          totalItemsCount={count}
          onChange={setPage}
        />
      </PaginationBox>
    </Wrapper>
  );
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
`;

export const CardHeader = styled.div`
  /* width: 100%; */
  height: 60px;
  /* margin: 0px 50px 0px 50px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: deeppink;
  margin-bottom: 20px;
`;
export default GroupInUserList;
