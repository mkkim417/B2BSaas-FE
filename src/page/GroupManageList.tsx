import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { PaginationBox } from './UserList';

function GroupManageList() {
  // 조건 상태 분기
  // 전체 클라이언트 리스트 호출시 true, 그룹 내 클라이언트 호출시 false 상태로 호출진행
  const [isClientState, setIsClientState] = useState(true);

  /*************************************************************************************
    그룹리스트 관련 코드
  ************************************************************************************ */

  // 그룹리스트 담는 변수
  const [groupList, setGroupList] = useState([] as any);
  // 그룹리스트 이름 textarea 변수
  const [groupName, setGroupName] = useState('');
  // 그룹리스트 GET API
  const getGroupData = useCallback(async () => {
    // https://dev.sendingo-be.store/api/groups
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/groups`
    );
    console.log('GroupList API', response.data.data);
    setGroupList(response.data.data);
  }, []);

  // 그룹리스트 내 클라이언트 변수
  const [groupClient, setGroupClient] = useState([] as any);

  // 그룹 클릭시 그룹 내 클라이언트리스트 호출
  const getClientInGroup = useCallback(
    async (id: any, name: any) => {
      setIsClientState(false);
      console.log('IsClientState', isClientState);
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/clients?groupId=${id}`
      );
      // console.log('getClientInGroup Response', response.data.data)
      setGroupClient(response.data.data);
      setGroupName(name);
    },
    [isClientState]
  );

  /*************************************************************************************
    유저리스트 관련 코드
  ************************************************************************************ */

  // Pagination 처리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 default값으로
  // const [count, setCount] = useState(0); // 아이템 총 갯수
  // const [ product, setProduct ] = useState([])  // 리스트에 담아낼 아이템들
  const [postPerPage] = useState(15); // 한 페이지에 보여질 아이템 수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들
  // const userData = userList.slice(indexOfFirstPost, indexOfLastPost)
  const setPage = (page: any) => {
    setCurrentPage(page);
  };

  // 유저리스트 담는 변수
  const [userList, setUserList] = useState([] as any);
  // 유저리스트 GET API
  const getUserData = useCallback(async () => {
    setIsClientState(true);
    console.log('IsClientState', isClientState);
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/clients`
    );
    console.log('UserList API', response.data);
    setUserList(response.data.data.clients);
    setAllclients(response.data.data.clientCount);
  }, []);

  // 처음 렌더링시 전체고객리스트로 focus
  const allUserRef = useRef<HTMLButtonElement>(null);
  // 전체고객리스트 숫자
  const [isAllclients, setAllclients] = useState();

  // 체크박스관련
  //******************************************************************************

  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setOpen] = useState(false);
  //선택취소함수
  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }
    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
      return;
    }
    return;
  };
  //체크박스저장함수
  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };
  //저장함수
  const onDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      // console.log('checkedList:', checkedList)
      // isData && isData.filter((x: any) => !checkedList.includes(x))
      setGroupClient(groupClient.filter((x: any) => !checkedList.includes(x)));
      setOpen(false);
    },
    [checkedList]
  );
  // 카카오알림톡전송관련
  // **********************************************************************
  const kakaoSendData = useSelector((state: any) => {
    return state.kakaoSendData.kakaoSendData[0];
    //talkContentId,clientId,talkTemplateId
  });
  const kakaoGroupIdData = useSelector((state: any) => {
    return state.kakaoGroupId.kakaoGroupId[0];
    //talkContentId,clientId,talkTemplateId
  });
  console.log('kakaoGroupIdData : ', kakaoGroupIdData);
  const kakaoAlertSend = async () => {
    alert('카카오알람톡 전송준비중');
    console.log('kakaoSendData : ', kakaoSendData);
    let data = [] as any;
    kakaoSendData.map((el: any) =>
      data.push({
        talkContentId: el.talkContentId,
        clientId: el.clientId,
        talkTemplateId: el.talkTemplateId,
        groupId: kakaoGroupIdData,
      })
    );
    console.log('kakaoGroupIdData data', data);
    try {
      const response = await axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/talk/sends`, { data })
        .then((res) => {
          console.log('kakaoAlertSend : ', res.data);
        });
      console.log(response);
    } catch (error) {
      console.log(error);
      alert('다시 시도해주시기 바랍니다.');
    }
  };
  // 그룹리스트 useEffect
  useEffect(() => {
    getGroupData();
    allUserRef.current?.focus();
  }, [getGroupData]);

  // 유저리스트 useEffect
  useEffect(() => {
    getUserData();

    // setCount(userList.length);
    setIndexOfLastPost(currentPage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    if (isClientState === true) {
      setCurrentPosts(userList.slice(indexOfFirstPost, indexOfLastPost));
    } else {
      setCurrentPosts(groupClient.slice(indexOfFirstPost, indexOfLastPost));
    }
  }, [
    currentPage,
    indexOfLastPost,
    indexOfFirstPost,
    postPerPage,
    getUserData,
  ]);

  return (
    <Container>
      <HeaderContainer>그룹관리</HeaderContainer>
      <ContentContainer>
        <GroupContainer>
          <GroupContentBox>
            <GroupContentItem onClick={getUserData} ref={allUserRef}>
              전체 고객리스트{isAllclients}
            </GroupContentItem>
            {groupList?.map((item: any) => {
              return (
                <GroupContentItem
                  key={item.groupId}
                  onClick={() => getClientInGroup(item.groupId, item.groupName)}
                >
                  {item.groupName}({item.clientCount})
                </GroupContentItem>
              );
            })}
          </GroupContentBox>
          <ButtonBox>
            <GroupButton>그룹 추가</GroupButton>
            <GroupButton>그룹 삭제</GroupButton>
          </ButtonBox>
        </GroupContainer>
        <ClientContainer>
          <ClientHeaderBox>
            <NameBox>그룹명</NameBox> <TextArea value={groupName} />
            {isClientState ? null : (
              <GroupButton onClick={kakaoAlertSend}>알림톡전송</GroupButton>
            )}
          </ClientHeaderBox>
          <ClientContentHeader>
            <CardHeader>
              {!isClientState && isOpen ? (
                <Percentage width="6%">선택</Percentage>
              ) : null}

              <Percentage width="23%">그룹명</Percentage>
              <Percentage width="12%">이름</Percentage>
              <Percentage width="22%">연락처</Percentage>
              <Percentage width="37%">이메일</Percentage>
            </CardHeader>
          </ClientContentHeader>
          <ClientContentBox>
            {isClientState ? (
              userList.slice(indexOfFirstPost, indexOfLastPost) &&
              userList.length > 0 ? (
                userList
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((item: any) => {
                    return (
                      <CardHeader>
                        <Percentage width="23%">소속 그룹명</Percentage>
                        <Percentage width="12%">{item.clientName}</Percentage>
                        <Percentage width="22%">{item.contact}</Percentage>
                        <Percentage width="37%">이메일</Percentage>
                      </CardHeader>
                    );
                  })
              ) : (
                <CenterContent>
                  추가된 고객 목록이 없습니다. 고객을 추가해주세요.
                </CenterContent>
              )
            ) : groupClient.slice(indexOfFirstPost, indexOfLastPost) &&
              groupClient.length > 0 ? (
              groupClient
                .slice(indexOfFirstPost, indexOfLastPost)
                .map((item: any) => {
                  return (
                    <CardHeader key={item.clientId}>
                      {isOpen ? (
                        <Percentage width="6%">
                          <input
                            type="checkbox"
                            checked={checkedList.includes(item)}
                            onChange={(e) => checkHandler(e, item)}
                          />
                        </Percentage>
                      ) : null}

                      <Percentage width="23%">소속 그룹명</Percentage>
                      <Percentage width="12%">{item.clientName}</Percentage>
                      <Percentage width="22%">{item.contact}</Percentage>
                      <Percentage width="37%">이메일</Percentage>
                    </CardHeader>
                  );
                })
            ) : (
              <CenterContent>
                추가된 고객 목록이 없습니다. 고객을 추가해주세요.
              </CenterContent>
            )}
          </ClientContentBox>
          <ClientPageBox>
            <PaginationBox>
              {isClientState ? (
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={10}
                  pageRangeDisplayed={10}
                  prevPageText={'<'}
                  nextPageText={'>'}
                  totalItemsCount={userList.length}
                  onChange={setPage}
                />
              ) : (
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={10}
                  pageRangeDisplayed={10}
                  prevPageText={'<'}
                  nextPageText={'>'}
                  totalItemsCount={groupClient.length}
                  onChange={setPage}
                />
              )}
            </PaginationBox>
          </ClientPageBox>
          <ButtonBox>
            {isClientState ? null : (
              <>
                {isOpen && isOpen ? (
                  <GroupButton onClick={onDelete}>삭제</GroupButton>
                ) : null}
                {!isOpen ? (
                  <GroupButton onClick={() => setOpen((prev) => !prev) as any}>
                    선택삭제
                  </GroupButton>
                ) : (
                  <GroupButton onClick={() => setOpen((prev) => !prev) as any}>
                    선택취소
                  </GroupButton>
                )}
              </>
            )}

            <GroupButton>그룹 추가</GroupButton>
            <GroupButton>그룹 삭제</GroupButton>
            <ClientButton>그룹에서 삭제</ClientButton>
            <ClientButton>고객정보 삭제</ClientButton>
          </ButtonBox>
        </ClientContainer>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-left: 250px;
  /* background-color: sandybrown; */
`;
const HeaderContainer = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 80px;
  font-size: 28px;
  font-weight: 900;
  /* background-color: crimson; */
`;
const ContentContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 100px;
  /* background-color: cyan; */
`;
const GroupContainer = styled.div`
  width: 25%;
  height: 100%;
  margin: 0px 30px 0px 30px;
  /* background-color: bisque; */
`;
const GroupContentBox = styled.div`
  /* width: 100%; */
  height: 90%;
  border: 2px solid burlywood;
  /* margin: 0px 30px 0px 30px; */
`;
const GroupContentItem = styled.button`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50px;
  padding: 10px;
  border: 1px solid burlywood;
  cursor: pointer;
  /* background-color: burlywood; */
  :focus {
    color: blue;
  }
`;
const ButtonBox = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  margin: 0px 0px 0px 30px;
  /* background-color: #bb95dd; */
`;
const GroupButton = styled.button`
  width: 100px;
  height: 40px;
  border: 2px solid black;
`;
const ClientContainer = styled.div`
  width: 75%;
  height: 100%;
  margin: 0px 30px 0px 0px;
  /* background-color: cornsilk; */
`;
const ClientHeaderBox = styled.div`
  height: 8%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding-bottom: 15px;
  /* border: 2px solid red; */
`;
const NameBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
`;
const TextArea = styled.textarea`
  width: 400px;
`;
const ClientContentBox = styled.div`
  height: 69%;
  /* border: 2px solid blue; */
  overflow: scroll;
  /* margin: 0px 30px 0px 0px; */
`;

const ClientContentHeader = styled.div`
  height: 5%;
`;
const CardHeader = styled.div`
  /* width: 100%; */
  /* height: 40px; */
  /* margin: 0px 50px 0px 50px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  /* background-color: deeppink; */
  /* margin-bottom: 20px; */
`;
const Percentage = styled.div<{ width: any }>`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: ${(props: any) => props.width};
`;
const ClientContentItem = styled.div`
  height: 40px;
  padding: 10px;
  border: 1px solid burlywood;
`;
const ClientPageBox = styled.div`
  height: 8%;
  border: 2px solid pink;
`;
const ClientButton = styled.button`
  width: 120px;
  height: 40px;
  border: 2px solid black;
`;
const CenterContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  /* margin: 0 auto; */
`;
export default GroupManageList;
