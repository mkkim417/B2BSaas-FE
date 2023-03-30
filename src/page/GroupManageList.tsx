import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import GroupCreateModal from '../components/modal/GroupCreateModal';
import UserCopyModal from '../components/modal/UserCopyModal';
import UserCreateModal from '../components/modal/UserCreateModal';
import UserDeleteModal from '../components/modal/UserDeleteModal';
import UserEditModal from '../components/modal/UserEditModal';
import UserInGroupDeleteModal from '../components/modal/UserInGroupDeleteModal';
import UserMoveModal from '../components/modal/UserMoveModal';
import { PaginationBox } from '../components/NotUsedPages/UserList';

function GroupManageList() {
  // hook 변수 모음들
  const navigate = useNavigate();
  // 조건 상태 분기
  // 전체 클라이언트 리스트 호출시 true, 그룹 내 클라이언트 호출시 false 상태로 호출진행
  const [isClientState, setIsClientState] = useState(true);

  /*************************************************************************************
    그룹리스트 관련 코드
  ************************************************************************************ */

  // 그룹리스트 담는 변수
  const [groupList, setGroupList] = useState([] as any);
  // 그룹리스트 onClick 아이디 변수
  const [groupId, setGroupId] = useState('');
  // 그룹리스트 이름 textarea 변수
  const [groupName, setGroupName] = useState('');
  // 그룹리스트 GET API
  const getGroupData = useCallback(async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/groups`
    );
    // console.log('GroupList API', response.data.data);
    console.log('GroupList API 렌더링');
    setGroupList(response.data.data);
  }, []);

  // 그룹리스트 내 클라이언트 변수
  const [groupClient, setGroupClient] = useState([] as any);

  // 그룹 클릭시 그룹 내 클라이언트리스트 호출
  const getClientInGroup = useCallback(async (id: any, name: any, page: any) => {
      console.log('getClientInGroup 호출')
      setCheckedArr([]);
      setIsClientState(false);
      console.log('IsClientState', isClientState);
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/clients?groupId=${id}&index=${page}`
      );
      //** 트러블 슈팅 함수형 업데이트로 변경.. 두번 클릭해야 불러오는 상황 발생
      setGroupClient(() => {return response.data.data});
      setGroupId((prev) => {return id});
      setGroupName(name);
      console.log(groupId)
      // setIsGroupAllClients(response.data.data.length)
      groupList.map((item:any) => {
        if(item.groupId === id) {
          // 그룹 내 클라이언트 갯수 저장 => 페이징처리 위함
          setIsGroupAllClients(item.clientCount)
        }
      })
  },[groupId]);

  /*************************************************************************************
    유저리스트 관련 코드
  ************************************************************************************ */

  // Pagination 처리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 default값으로
  const [currentPage1, setCurrentPage1] = useState(1); // 현재 페이지 default값으로
  // const [count, setCount] = useState(0); // 아이템 총 갯수
  // const [ product, setProduct ] = useState([])  // 리스트에 담아낼 아이템들
  const [postPerPage] = useState(15); // 한 페이지에 보여질 아이템 수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들
  // const userData = userList.slice(indexOfFirstPost, indexOfLastPost)
  const setPage1 = (page: any) => {
    console.log('page1', page)
    setCurrentPage(page);
    getUserData(page)
  }

  const setPage2 = async(page: any) => {
    console.log('page2', page)
    setCurrentPage1(page);
    getClientInGroup(groupId, groupName, page)
    } 

  // 모달
  // 유저리스트 선택 유저 수정 조건모달
  const [userConditionModal, setUserConditionModal] = useState(false);
  const clickUserConditionModal = () => {
    setUserConditionModal(true);
  };
  const closeUserConditionModal = () => {
    setUserConditionModal(false);
  };
  // 유저 선택 유저 수정 모달
  const [userEditModal, setUserEditModal] = useState(false);
  const clickUserEditModal = () => {
    setUserEditModal(true);
  };
  const closeUserEditModal = () => {
    setUserEditModal(false);
  };
  // 유저리스트 선택 유저 삭제 모달
  const [userDeleteModal, setUserDeleteModal] = useState(false);
  const clickUserDeleteModal = () => {
    setUserDeleteModal(true);
  };
  const closeUserDeleteModal = () => {
    setUserDeleteModal(false);
  };
  // 그룹 생성 모달
  const [groupCreateModal, setGroupCreateModal] = useState(false);
  const clickGroupCreateModal = () => {
    setGroupCreateModal(true);
  };
  const closeGroupCreateModal = () => {
    setGroupCreateModal(false);
  };

  // 그룹리스트 내 유저 복사 모달
  const [groupUserCopyModal, setGroupUserCopyModal] = useState(false);
  const clickUserCopyModal = () => {
    setGroupUserCopyModal(true);
  };
  const closeUserCopyModal = () => {
    setGroupUserCopyModal(false);
  };
  // 그룹리스트 내 유저 이동 모달
  const [groupUserMoveModal, setGroupUserMoveModal] = useState(false);
  const clickUserMoveModal = () => {
    setGroupUserMoveModal(true);
  };
  const closeUserMoveModal = () => {
    setGroupUserMoveModal(false);
  };
  // 그룹리스트 내 유저 삭제 모달
  const [groupUserDeleteModal, setGroupUserDeleteModal] = useState(false);
  const clickUserDelteModal = () => {
    setGroupUserDeleteModal(true);
  };
  const closeGroupUserDeleteModal = () => {
    setGroupUserDeleteModal(false);
  };

  // 유저리스트 담는 변수
  const [userList, setUserList] = useState([] as any);
  // 유저리스트 GET API
  const getUserData = useCallback(async (page : any) => {
    setCheckedArr([]);
    setIsClientState(true);
    // console.log('IsClientState', isClientState);
    // `${process.env.REACT_APP_SERVER_URL}/api/clients?index=${1}`
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/clients?index=${page}`
    );
    console.log('UserList API');
    setUserList(response.data.data.clients);
    setAllclients(response.data.data.clientCount);
  },[]);

  // 유저 수정 state
  const [editUser, setEditUser] = useState({
    clientId: '',
    clientName: '',
    clientContact: '',
    clientEmail: '',
  });

  // 처음 렌더링시 전체고객리스트로 focus
  const allUserRef = useRef<HTMLButtonElement>(null);
  // 전체고객리스트 숫자
  const [isAllclients, setAllclients] = useState<any>(0);
  // 그룹 내 클라이언트 숫자
  const [ isGroupAllClients, setIsGroupAllClients ] = useState<any>(0);
  // 체크박스 관련 state

  // 개별 항목을 체크했을 때의 state
  const [isCheckingBox, setIsCheckingBox] = useState(false);

  // 체크항목 저장하는 변수 state
  const [checkedArr, setCheckedArr] = useState<String[]>([]);

  // 개별 체크표시 핸들러
  const checkUserHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: any
  ) => {
    console.log('타켓 checked값 : ', e.target.checked, '타켓 Id값 :', item);
    setIsCheckingBox(!isCheckingBox);
    checkedUserItemHandler(e.target.checked, item);
  };
  // 체크아이템 변수에 담는 핸들러
  const checkedUserItemHandler = (isChecked: any, item: any) => {
    if (isChecked) {
      checkedArr.push(item);
      setCheckedArr(checkedArr);
      console.log('checkedList', checkedArr);
      // setCheckedArr([...checkedArr, id])
    } else if (!isChecked || checkedArr.includes(item.clientId)) {
      console.log('!isChecked', item.clientId);
      setCheckedArr((checkedArr) => checkedArr.filter((el) => el !== item));
      console.log('체크해제 후 checkedList', checkedArr);
    }
  };
  // 고객 수정 버튼
  const userEditHandler = () => {
    if (checkedArr.length > 1) {
      alert('한 개만 체크해주세요!');
    } else if (checkedArr.length === 0) {
      alert('수정할 고객을 선택해주세요!')
    }else {
      checkedArr.map((item: any) => {
        setEditUser({
          ...editUser,
          clientId: item.clientId,
          clientName: item.clientName,
          clientContact: item.contact,
          clientEmail: item.clientEmail,
        });
      });
      clickUserEditModal();
    }
  };

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
  // console.log('kakaoGroupIdData : ', kakaoGroupIdData);
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
    if (isClientState === true) {
      getUserData(currentPage);
    } else {
      // setCurrentPage1(1)
      getClientInGroup(groupId, groupName, currentPage)
    }

    // setCount(userList.length);
    // setIndexOfLastPost(currentPage * postPerPage);
    // setIndexOfFirstPost(indexOfLastPost - postPerPage);
    // if (isClientState === true) {
    //   setCurrentPosts(userList.slice(indexOfFirstPost, indexOfLastPost));
    // } else {
    //   setCurrentPosts(groupClient.slice(indexOfFirstPost, indexOfLastPost));
    // }
  }, [
    currentPage,
    isClientState,
    // indexOfLastPost,
    // indexOfFirstPost,
    // postPerPage,
    getUserData,
    getClientInGroup
  ]);
  // 그룹리스트 내 클라이언트 useEffect
  // useEffect(() => {
  //   getClientInGroup(groupId, groupName, currentPage)
  // }, [])

  return (
    <Container>
      <HeaderContainer>그룹관리</HeaderContainer>
      <ContentContainer>
        {/* 그룹리스트 공간 */}
        <GroupContainer>
          <GroupContentBox>
            <GroupContentItem onClick={() => getUserData(1)} ref={allUserRef}>
              전체 고객리스트({isAllclients})
            </GroupContentItem>
            {groupList?.map((item: any) => {
              return (
                <GroupContentItem
                  key={item.groupId}
                  onClick={
                    () => {getClientInGroup(item.groupId, item.groupName, 1);
                      setCurrentPage1(1);
                    }}
                >
                  {item.groupName}({item.clientCount})
                </GroupContentItem>
              );
            })}
          </GroupContentBox>
          <ButtonBox>
            <GroupButton onClick={clickGroupCreateModal}>그룹 추가</GroupButton>
            <GroupButton>그룹 삭제</GroupButton>
          </ButtonBox>
        </GroupContainer>
        {/* 여기부터는 클라이언트 리스트 공간 */}
        <ClientContainer>
          <ClientHeaderBox>
            <NameBox>그룹명</NameBox>
            <TextArea defaultValue={groupName} />
            <NameBox>{checkedArr.length}</NameBox>
            {isClientState ? null : (
              <GroupButton onClick={kakaoAlertSend}>알림톡전송</GroupButton>
            )}
          </ClientHeaderBox>
          <ClientContentHeader>
            <CardHeader>
              <HeaderPercentage width="6%">선택</HeaderPercentage>
              <HeaderPercentage width="23%">그룹명</HeaderPercentage>
              <HeaderPercentage width="12%">이름</HeaderPercentage>
              <HeaderPercentage width="22%">연락처</HeaderPercentage>
              <HeaderPercentage width="37%">이메일</HeaderPercentage>
            </CardHeader>
          </ClientContentHeader>
          <ClientContentBox>
              {isClientState ? (
                // userList.slice(indexOfFirstPost, indexOfLastPost) &&
                userList.length > 0 ? (
                  userList
                    // .slice(indexOfFirstPost, indexOfLastPost)
                    .map((item: any) => {
                      return (
                        <CardHeader key={item.clientId}>
                          <Percentage width="6%">
                            <input
                              type="checkbox"
                              checked={checkedArr.includes(item)}
                              onChange={(e: any) => checkUserHandler(e, item)}
                            />
                          </Percentage>
                          <Percentage width="23%">{item.groupName}</Percentage>
                          <Percentage width="12%">{item.clientName}</Percentage>
                          <Percentage width="22%">{item.contact}</Percentage>
                          <Percentage width="37%">{item.clientEmail}</Percentage>
                        </CardHeader>
                      );
                    })
                ) : (
                  <CenterContent>
                    더 이상 고객목록이 없습니다.
                  </CenterContent>
                )
            ) : groupClient.length > 0 ? (
              groupClient
                // .slice(indexOfFirstPost, indexOfLastPost)
                .map((item: any) => {
                  return (
                    <CardHeader key={item.clientId}>
                      {/* {isOpen ? (
                        <Percentage width="6%">
                          <input
                            type="checkbox"
                            checked={checkedList.includes(item.clientId)}
                            onChange={(e) => checkHandler(e, item.clientId)}
                          />
                        </Percentage>
                      ) : (
                        <Percentage width="6%">
                        </Percentage>
                      )} */}
                      <Percentage width="6%">
                        {/* <input
                            type="checkbox"
                            checked={checkedList.includes(item.clientId)}
                            onChange={(e) => checkHandler(e, item.clientId)}
                          /> */}
                        <input
                          type="checkbox"
                          checked={checkedArr.includes(item)}
                          onChange={(e: any) => checkUserHandler(e, item)}
                        />
                      </Percentage>
                      <Percentage width="23%">소속 그룹명</Percentage>
                      <Percentage width="12%">{item.clientName}</Percentage>
                      <Percentage width="22%">{item.contact}</Percentage>
                      <Percentage width="37%">{item.clientEmail}</Percentage>
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
                  // itemsCountPerPage={15}
                  pageRangeDisplayed={10}
                  prevPageText={'<'}
                  nextPageText={'>'}
                  totalItemsCount={isAllclients}
                  onChange={setPage1}
                />
              ) : (
                <Pagination
                  activePage={currentPage1}
                  // itemsCountPerPage={15}
                  pageRangeDisplayed={10}
                  prevPageText={'<'}
                  nextPageText={'>'}
                  totalItemsCount={isGroupAllClients}
                  onChange={setPage2}
                />
              )}
            </PaginationBox>
          </ClientPageBox>
          <ButtonBox>
            {isClientState ? (
              <>
                <ClientButton onClick={() => userEditHandler()}>
                  고객 정보 수정
                </ClientButton>
                <ClientButton onClick={() => clickUserDeleteModal()}>
                  고객리스트에서 삭제
                </ClientButton>
              </>
            ) : (
              <>
                {/* {isOpen && isOpen ? (
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
                )} */}
                <ClientButton
                  onClick={() =>
                    alert(
                      '선택된 그룹안에서 누른 버튼이고, 이 모달에서는 고객리스트뜨게하기?'
                    )
                  }
                >
                  고객 등록
                </ClientButton>
                <ClientButton onClick={() => clickUserCopyModal()}>
                  복사
                </ClientButton>
                <ClientButton onClick={() => clickUserMoveModal()}>
                  이동
                </ClientButton>
                <ClientButton onClick={() => clickUserDelteModal()}>
                  그룹에서 삭제
                </ClientButton>
                {/* {!isOpen ? <ClientButton>고객 등록</ClientButton> : null}
                {!isOpen ? <ClientButton>이동</ClientButton> : null}
                {!isOpen ? <ClientButton>복사</ClientButton> : null} */}
              </>
            )}
          </ButtonBox>
        </ClientContainer>
      </ContentContainer>
      {/* 고객 수정 모달 */}
      {userEditModal && (
        <UserEditModal
          closeModal={closeUserEditModal}
          clientId={editUser.clientId}
          clientName={editUser.clientName}
          clientContact={editUser.clientContact}
          clientEmail={editUser.clientEmail}
        />
      )}
      {/* 고객정보삭제 모달 */}
      {userDeleteModal && (
        <UserDeleteModal
          closeModal={closeUserDeleteModal}
          title="정말 삭제하시겠습니까?"
          checkValue={checkedArr}
        />
      )}
      {/* 그룹 생성 모달 */}
      {groupCreateModal && (
        <GroupCreateModal closeModal={closeGroupCreateModal} />
      )}
      {/* 그룹 내 고객 복사 모달 */}
      {groupUserCopyModal && (
        <UserCopyModal
          group={groupList}
          content={checkedArr}
          closeModal={closeUserCopyModal}
        />
      )}
      {/* 그룹 내 고객 이동 모달 */}
      {groupUserMoveModal && (
        <UserMoveModal
          group={groupList}
          content={checkedArr}
          closeModal={closeUserMoveModal}
        />
      )}
      {/* 그룹 내 고객 삭제 모달 */}
      {groupUserDeleteModal && (
        <UserInGroupDeleteModal
          title="정말 삭제하시겠습니까?"
          checkValue={checkedArr}
          closeModal={closeGroupUserDeleteModal}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-left: 250px;
  /* padding-top: 50px; */
  padding-bottom: 50px;
  /* background-color: sandybrown; */
`;
const HeaderContainer = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 80px;
  margin-top: 20px;
  margin-bottom: 20px;
  /* padding-left: 30px; */
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
  height: 95%;
  margin: 0px 30px 0px 30px;
  /* background-color: bisque; */
`;
const GroupContentBox = styled.div`
  /* width: 100%; */
  height: 90%;
  border: 2px solid burlywood;
  overflow: auto;
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
  height: 95%;
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
  width: 100%;
  /* height: 40px; */
  /* margin: 0px 50px 0px 50px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0px 0px 0px;
  /* background-color: deeppink; */
  /* margin-bottom: 20px; */
`;
const Percentage = styled.div<{ width: any }>`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ead3cc;
  width: ${(props: any) => props.width};
`;

const HeaderPercentage = styled(Percentage)<{ width: any }>`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: white;
  width: ${(props: any) => props.width};
`;
const ClientContentItem = styled.div`
  height: 40px;
  padding: 10px;
  border: 1px solid burlywood;
`;
const ClientPageBox = styled.div`
  height: 7%;
  padding-top: 10px;
  /* border: 2px solid pink; */
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
