import axios, { AxiosError } from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import GroupCreateModal from '../components/modal/GroupCreateModal';
import UserCopyModal from '../components/modal/UserCopyModal';
import UserDeleteModal from '../components/modal/UserDeleteModal';
import UserEditModal from '../components/modal/UserEditModal';
import UserInGroupDeleteModal from '../components/modal/UserInGroupDeleteModal';
import UserMoveModal from '../components/modal/UserMoveModal';
import { PaginationBox } from '../components/NotUsedPages/UserList';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  deleteGroupData,
  getAllClientList,
  getAllGroupList,
} from '../axios/api';
import { getCookie } from '../util/cookie';
import GroupDeleteModal from '../components/modal/GroupDeleteModal';
import { PaginationBox1 } from '../components/PaginationStyled';

function GroupManageList() {
  // hook 변수 모음들
  const token = getCookie('userToken');
  const navigate = useNavigate();
  // 조건 상태 분기
  // 전체 클라이언트 리스트 호출시 true, 그룹 내 클라이언트 호출시 false 상태로 호출진행
  const [isClientState, setIsClientState] = useState(true);

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

  /*************************************************************************************
    그룹리스트 관련 코드
  ************************************************************************************ */

  // 그룹리스트 담는 변수
  const [groupList, setGroupList] = useState([] as any);
  // 그룹리스트 onClick 아이디 변수
  const [groupId, setGroupId] = useState('');
  // 그룹리스트 이름 textarea 변수
  const [groupName, setGroupName] = useState('전체 고객리스트');
  // 그룹리스트 설명 변수
  const [groupDescription, setGroupDescription] = useState('');
  // 서치검색 키워드 변수
  const [searchKeyword, setSearchKeyword] = useState('');
  // 그룹 내 서치검색 키워드 변수
  const [searchGroupInKeyword, setSearchGroupInKeyword] = useState('');

  // 그룹리스트 GET API
  // const getGroupData = useCallback(async () => {
  //   const response = await axios.get(
  //     `${process.env.REACT_APP_SERVER_URL}/api/groups`,
  //     { headers: { authorization: `Bearer ${token}` } }
  //   );
  //   console.log('GroupList API 렌더링', response);
  //   setGroupList(response.data.data);
  // }, []);

  // 전체고객리스트 useRef
  useEffect(() => {}, []);

  // 그룹리스트 API useQuery
  const { data: groupData } = useQuery<any, AxiosError>(
    ['getAllGroupList'],
    () => getAllGroupList(),
    {
      onSuccess: (response) => {
        // console.log('그룹리스트 호출성공!', response.data);
        // 그룹 복사,이동에 넣어줄 그룹리스트 state 담기
        setGroupList(response.data);
        response.data.map((item: any) => {
          // 이거 무슨 용도지.. 모르겠음
          if (!clickGroup.includes(item.groupId)) {
            clickGroup.push(item.groupId);
            setClickGroup(clickGroup);
          }
        });
      },
    }
  );
  // 그룹리스트 내 클라이언트 변수
  const [groupClient, setGroupClient] = useState([] as any);

  // 그룹 클릭시 그룹 내 클라이언트리스트 호출
  const getClientInGroup = useCallback(
    async (id: any, name: any, descript: any, page: any) => {
      console.log(id, name, descript);
      setCheckedArr([]);
      setIsClientState(false);
      const response = await axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/api/clients?groupId=${id}&index=${page}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setGroupClient(res.data.data);
        });
      setGroupId(id);
      // 리스트에 표시할 그룹이름 넣어주기
      setGroupName(name);
      // 리스트에 표시할 그룹설명 넣어주기
      setGroupDescription(descript);

      // 그룹들 이름 넣어주기
      groupData.data.map((item: any) => {
        if (item.groupId === id) {
          setIsGroupAllClients(item.clientCount);
        }
      });
    },
    [groupData]
  );
  /*************************************************************************************
    유저리스트 관련 코드
  ************************************************************************************ */

  // 전체고객리스트 숫자
  const [isAllclients, setAllclients] = useState<any>(0);
  // 유저리스트 담는 변수
  const [userList, setUserList] = useState([] as any);
  // 처음 렌더링시 전체고객리스트로 focus
  const allUserRef = useRef<HTMLButtonElement>(null);
  // 유저리스트 GET API
  const getUserData = useCallback(async (page: any) => {
    // setCheckedArr([]);
    // setIsClientState(true);
    // console.log('IsClientState', isClientState);
    // `${process.env.REACT_APP_SERVER_URL}/api/clients?index=${1}`
    // const response = await axios.get(
    //   `${process.env.REACT_APP_SERVER_URL}/api/clients?index=${page}`,
    //   { headers: { authorization: `Bearer ${token}` } }
    // );
    // console.log('UserList API', token);
    // setUserList(response.data.data.clients);
    // setAllclients(response.data.data.clientCount);
  }, []);
  const { data: userData, refetch } = useQuery<any, AxiosError>(
    ['getAllClientLists', currentPage],
    () => getAllClientList(currentPage),
    {
      onSuccess: (response) => {
        // console.log('고객리스트useQuery', response);
        setCheckedArr([]);
        setIsClientState(true);
        setAllclients(userData?.data.clientCount);
        // 여따가 담아서 쓰자!
        setUserList(response.data.clients);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  // 유저리스트 useEffect
  useEffect(() => {
    if (isClientState === true) {
      refetch();
      // console.log(userList)
      // getAllClientList(currentPage)
      allUserRef.current?.focus();
      // getUserData(currentPage);
      // setAllclients(userData?.data.clientCount);
    } else {
      getClientInGroup(groupId, groupName, groupDescription, currentPage);
      // setCurrentPage1(1)
    }
    // setCount(userList.length);
    // setIndexOfLastPost(currentPage * postPerPage);
    // setIndexOfFirstPost(indexOfLastPost - postPerPage);
    // if (isClientState === true) {
    //   setCurrentPosts(userList.slice(indexOfFirstPost, indexOfLastPost));
    // } else {
    //   setCurrentPosts(groupClient.slice(indexOfFirstPost, indexOfLastPost));
    // }
  }, [refetch, userData, isAllclients, getUserData, getClientInGroup]);

  // 고객리스트에서 검색호출 API
  const getSearchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/clients?keyword=${searchKeyword}&index=${currentPage}`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    // console.log('검색필터 주소', `${process.env.REACT_APP_SERVER_URL}/api/clients?keyword=${searchKeyword}&index=${currentPage}`)
    // console.log('검색필터 API결과', response.data.data.keyword)
    setUserList(response.data.data.keyword);
    return response;
  };

  // 검색필터 useEffect
  useEffect(() => {
    if (searchKeyword.length > 0) {
      getSearchData();
      // setAllclients(userList.length)
    } else if (searchKeyword.length === 0) {
      refetch();
      // setAllclients(userData?.data.clientCount)
    }
  }, [searchKeyword]);

  // 그룹 내 클라이언트 숫자
  const [isGroupAllClients, setIsGroupAllClients] = useState<any>(0);

  const setPage1 = (page: any) => {
    console.log('page1', page);
    setCurrentPage(page);
    getUserData(page);
  };

  const setPage2 = async (page: any) => {
    console.log('page2', page);
    setCurrentPage1(page);

    getClientInGroup(groupId, groupName, groupDescription, page);
  };
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
  // 그룹 삭제 모달
  const [groupDeleteModal, setGroupDeleteModal] = useState(false);
  const clickGroupDeleteModal = () => {
    setGroupDeleteModal(true);
  };
  const closeGroupDeleteModal = () => {
    setGroupDeleteModal(false);
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
  const clickGroupUserDeleteModal = () => {
    setGroupUserDeleteModal(true);
  };
  const closeGroupUserDeleteModal = () => {
    setGroupUserDeleteModal(false);
  };

  // 유저 수정 state
  const [editUser, setEditUser] = useState({
    clientId: '',
    clientName: '',
    clientContact: '',
    clientEmail: '',
  });

  // 체크박스 관련 state
  //******************************************************************************

  // 개별 항목을 체크했을 때의 state
  const [isCheckingBox, setIsCheckingBox] = useState(false);
  const [isOpen, setOpen] = useState(false);

  // 체크항목 저장하는 변수 state
  const [checkedArr, setCheckedArr] = useState<String[]>([]);

  // 개별 체크표시 핸들러
  const checkUserHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: any
  ) => {
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
      // console.log('체크해제 후 checkedList', checkedArr);
    }
  };
  // 고객 수정 버튼
  const userEditHandler = () => {
    if (checkedArr.length > 1) {
      alert('한 개만 체크해주세요!');
    } else if (checkedArr.length === 0) {
      alert('수정할 고객을 선택해주세요!');
    } else {
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

  // 삭제할 그룹 데이터 state
  const [deleteGroup, setDeleteGroup] = useState([]);
  // 그룹삭제 버튼 Handler
  const clickGroupDelete = async () => {
    console.log('deletegroup', deleteGroup);
    clickGroupDeleteModal();
  };

  // 체크박스관련
  //******************************************************************************

  // const [checkedList, setCheckedList] = useState<string[]>([]);
  // const [isChecked, setIsChecked] = useState(false);
  // //선택취소함수
  // const checkedItemHandler = (value: string, isChecked: boolean) => {
  //   if (isChecked) {
  //     setCheckedList((prev) => [...prev, value]);
  //     return;
  //   }
  //   if (!isChecked && checkedList.includes(value)) {
  //     setCheckedList(checkedList.filter((item) => item !== value));
  //     return;
  //   }
  //   return;
  // };

  // //체크박스저장함수
  // const checkHandler = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   value: string
  // ) => {
  //   setIsChecked(!isChecked);
  //   checkedItemHandler(value, e.target.checked);
  // };
  // //저장함수
  // const onDelete = useCallback(
  //   (e: React.MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault();
  //     // console.log('checkedList:', checkedList)
  //     // isData && isData.filter((x: any) => !checkedList.includes(x))
  //     setGroupClient(groupClient.filter((x: any) => !checkedList.includes(x)));
  //     setOpen(false);
  //   },
  //   [checkedList]
  // );
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
  const readyAlarmTalk = () => {
    const ArrClientsIdsData = [] as string[];
    groupClient.map((el: { clientId: string }) => {
      ArrClientsIdsData.push(el.clientId);
    });
    console.log('ArrClientsIdsData : ', ArrClientsIdsData);
    navigate(`/readyalarmtalk/${groupId}`, {
      state: { ArrClientsIdsData },
    });

    // <Link to={`/readyalarmtalk/${groupId}`} state={{ clientIds: null }}></Link>;
  };

  // 그룹 클릭 Active 변화
  const [clickGroup, setClickGroup] = useState<any>([]);
  const [clickActive, setClickActive] = useState('');

  const toogleActive = (e: any) => {
    setClickActive((prev: any) => {
      return e.target.value;
    });
    console.log(e.target.value);
  };
  return (
    <Container>
      <HeaderContainer>그룹관리</HeaderContainer>
      <ContentContainer>
        {/* 그룹리스트 공간 */}
        <GroupContainer>
          <GroupContentBox>
            <GroupContentItem
              value="client"
              className={'btn' + ('client' == clickActive ? 'Active' : '')}
              onClick={(e: any) => {
                refetch();
                setCurrentPage(1);
                toogleActive(e);
                setOpen(false);
                setGroupName('전체 고객리스트');
                setGroupDescription('');
              }}
              ref={allUserRef}
            >
              전체 고객리스트({isAllclients})
            </GroupContentItem>
            {groupData?.data.map((item: any) => {
              return (
                <>
                  <GroupContentItem
                    key={item.groupId}
                    value={item.groupId}
                    className={
                      'btn' + (item.groupId == clickActive ? 'Active' : '')
                    }
                    onClick={(e: any) => {
                      setOpen(false);
                      getClientInGroup(
                        item.groupId,
                        item.groupName,
                        item.groupDescription,
                        1
                      );
                      setCurrentPage1(1);
                      setDeleteGroup(item);
                      toogleActive(e);
                    }}
                  >
                    {item.groupName}({item.clientCount})
                  </GroupContentItem>
                </>
              );
            })}
          </GroupContentBox>
          <ButtonBox>
            <GroupButton onClick={clickGroupCreateModal}>그룹 추가</GroupButton>
            <GroupButton onClick={clickGroupDelete}>그룹 삭제</GroupButton>
          </ButtonBox>
        </GroupContainer>
        {/* 여기부터는 클라이언트 리스트 공간 */}
        <ClientContainer>
          <ClientHeaderBox>
            <NameBox>{groupName}</NameBox>
            {/* <TextArea defaultValue={groupName} /> */}
            <NameBox>{checkedArr.length}</NameBox>
          </ClientHeaderBox>
          <ClientHeaderRow>
            <DescriptBox>{groupDescription}</DescriptBox>
            {isClientState ? null : (
              <GroupClickButton onClick={readyAlarmTalk}>
                알림톡전송
              </GroupClickButton>
            )}
          </ClientHeaderRow>
          <ButtonContainer>
            {isClientState ? (
              <>
                <div style={{ display: 'flex', gap: '7px' }}>
                  {isOpen && isOpen ? (
                    <GroupClickButton onClick={() => clickUserDeleteModal()}>
                      고객정보 삭제
                    </GroupClickButton>
                  ) : null}
                  {!isOpen ? (
                    <GroupButton
                      onClick={() => setOpen((prev) => !prev) as any}
                    >
                      선택삭제
                    </GroupButton>
                  ) : (
                    <GroupButton
                      onClick={() => setOpen((prev) => !prev) as any}
                    >
                      선택취소
                    </GroupButton>
                  )}
                  {isOpen && isOpen ? (
                    <GroupClickButton onClick={() => userEditHandler()}>
                      고객정보 수정
                    </GroupClickButton>
                  ) : null}
                  {!isOpen ? (
                    <GroupButton
                      onClick={() => setOpen((prev) => !prev) as any}
                    >
                      선택수정
                    </GroupButton>
                  ) : (
                    <GroupButton
                      onClick={() => setOpen((prev) => !prev) as any}
                    >
                      수정취소
                    </GroupButton>
                  )}
                </div>
                <SearchInput
                  placeholder="Search"
                  type="search"
                  onChange={(e: any) => {
                    setSearchKeyword(e.target.value);
                  }}
                />
                {/* <ClientButton onClick={() => userEditHandler()}>
                  고객 정보 수정
                </ClientButton> */}
                {/* <ClientButton onClick={() => clickUserDeleteModal()}>
                  고객리스트에서 삭제
                </ClientButton> */}
              </>
            ) : (
              <>
                <div>
                  <GroupButton onClick={() => navigate('/uploadpage')}>
                    고객 등록
                  </GroupButton>
                  {isOpen && isOpen ? (
                    <GroupClickButton
                      onClick={() => clickGroupUserDeleteModal()}
                    >
                      삭제
                    </GroupClickButton>
                  ) : null}
                  {!isOpen ? (
                    <GroupButton
                      onClick={() => setOpen((prev) => !prev) as any}
                    >
                      그룹내삭제
                    </GroupButton>
                  ) : (
                    <GroupButton
                      onClick={() => setOpen((prev) => !prev) as any}
                    >
                      삭제취소
                    </GroupButton>
                  )}
                  {isOpen && isOpen ? (
                    <GroupClickButton onClick={() => clickUserCopyModal()}>
                      복사
                    </GroupClickButton>
                  ) : null}
                  {!isOpen ? (
                    <GroupButton
                      onClick={() => setOpen((prev) => !prev) as any}
                    >
                      선택복사
                    </GroupButton>
                  ) : (
                    <GroupButton
                      onClick={() => setOpen((prev) => !prev) as any}
                    >
                      복사취소
                    </GroupButton>
                  )}
                  {/* <GroupButton onClick={() => clickUserCopyModal()}>
                  복사
                </GroupButton> */}
                  {isOpen && isOpen ? (
                    <GroupClickButton onClick={() => clickUserMoveModal()}>
                      이동
                    </GroupClickButton>
                  ) : null}
                  {!isOpen ? (
                    <GroupButton
                      onClick={() => setOpen((prev) => !prev) as any}
                    >
                      선택이동
                    </GroupButton>
                  ) : (
                    <GroupButton
                      onClick={() => setOpen((prev) => !prev) as any}
                    >
                      이동취소
                    </GroupButton>
                  )}
                </div>
                {/* <GroupButton onClick={() => clickUserMoveModal()}>
                  이동
                </GroupButton> */}

                {/* {isOpen && isOpen ? (
                  <GroupClickButton onClick={() => clickUserDelteModal()}>그룹에서해제</GroupClickButton>
                ) : null}
                {!isOpen ? (
                  <GroupButton onClick={() => setOpen((prev) => !prev) as any}>
                    선택해제
                  </GroupButton>
                ) : (
                  <GroupButton onClick={() => setOpen((prev) => !prev) as any}>
                    그룹해제취소
                  </GroupButton>
                )} */}
                {/* <GroupClickButton onClick={() => clickUserDelteModal()}>
                  그룹에서 삭제
                </GroupClickButton> */}
                {/* {!isOpen ? <ClientButton>고객 등록</ClientButton> : null}
                {!isOpen ? <ClientButton>이동</ClientButton> : null}
                {!isOpen ? <ClientButton>복사</ClientButton> : null} */}
              </>
            )}
          </ButtonContainer>
          <div
            style={{
              border: '1px solid #eee',
              borderRadius: '15px',
            }}
          >
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
                userData?.data.clients.length > 0 ? (
                  userList?.map((item: any) => {
                    return (
                      <CardHeader key={item.clientId}>
                        {isOpen ? (
                          <Percentage width="6%">
                            <CheckInputBox
                              type="checkbox"
                              checked={checkedArr.includes(item)}
                              onChange={(e) => checkUserHandler(e, item)}
                            />
                          </Percentage>
                        ) : (
                          <Percentage width="6%"></Percentage>
                        )}
                        {/* <Percentage width="6%">
                        <input
                          type="checkbox"
                          checked={checkedArr.includes(item)}
                          onChange={(e: any) => checkUserHandler(e, item)}
                        />
                      </Percentage> */}
                        <Percentage width="23%">{item.groupName}</Percentage>
                        <Percentage width="12%">{item.clientName}</Percentage>
                        <Percentage width="22%">
                          {item.contact.replace(
                            /^(\d{2,3})(\d{3,4})(\d{4})$/,
                            `$1-$2-$3`
                          )}
                        </Percentage>
                        <Percentage width="37%">{item.clientEmail}</Percentage>
                      </CardHeader>
                    );
                  })
                ) : (
                  <CenterContent>더 이상 고객목록이 없습니다.</CenterContent>
                )
              ) : groupClient.length > 0 ? (
                groupClient
                  // .slice(indexOfFirstPost, indexOfLastPost)
                  .map((item: any) => {
                    return (
                      <CardHeader key={item.clientId}>
                        {isOpen ? (
                          <Percentage width="6%">
                            <CheckInputBox
                              type="checkbox"
                              checked={checkedArr.includes(item)}
                              onChange={(e) => checkUserHandler(e, item)}
                            />
                          </Percentage>
                        ) : (
                          <Percentage width="6%"></Percentage>
                        )}
                        <Percentage width="6%">
                          {/* <input
                            type="checkbox"
                            checked={checkedArr.includes(item.clientId)}
                            onChange={(e) => checkUserHandler(e, item.clientId)}
                          />
                        <input
                          type="checkbox"
                          checked={checkedArr.includes(item)}
                          onChange={(e: any) => checkUserHandler(e, item)}
                        /> */}
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
                  추가된 고객 목록이 없습니다. 고객을 추가해주세요.
                </CenterContent>
              )}
            </ClientContentBox>
          </div>
          <ClientPageBox>
            <PaginationBox1>
              {isClientState ? (
                <>
                  {searchKeyword.length > 0 ? (
                    <Pagination
                      activePage={currentPage}
                      // itemsCountPerPage={15}
                      pageRangeDisplayed={10}
                      prevPageText={'<'}
                      nextPageText={'>'}
                      totalItemsCount={userList.length}
                      onChange={setPage1}
                    />
                  ) : (
                    <Pagination
                      activePage={currentPage}
                      // itemsCountPerPage={15}
                      pageRangeDisplayed={10}
                      prevPageText={'<'}
                      nextPageText={'>'}
                      totalItemsCount={isAllclients}
                      onChange={setPage1}
                    />
                  )}
                </>
              ) : (
                // <Pagination
                //   activePage={currentPage}
                //   // itemsCountPerPage={15}
                //   pageRangeDisplayed={10}
                //   prevPageText={'<'}
                //   nextPageText={'>'}
                //   totalItemsCount={isAllclients}
                //   onChange={setPage1}
                // />
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
            </PaginationBox1>
          </ClientPageBox>
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
      {/* 그룹 삭제 모달 */}
      {groupDeleteModal && (
        <GroupDeleteModal
          content={deleteGroup}
          closeModal={closeGroupDeleteModal}
        />
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
  width: 100vw;
  height: 100vh;
  padding-left: 80px;
  /* padding-top: 50px; */
  /* padding-bottom: 50px; */
  /* background-color: sandybrown; */
`;
export const HeaderContainer = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 80px;
  margin-top: 10px;
  /* margin-bottom: 20px; */
  /* padding-left: 30px; */
  font-size: 34px;
  font-weight: 900;
  /* background-color: crimson; */
`;
const ContentContainer = styled.div`
  max-width: 1600px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  justify-content: space-between;
  /* margin-bottom: 100px; */
  /* background-color: cyan; */
`;
const GroupContainer = styled.div`
  height: 95%;
  margin: 0px 10px;
  width: 250px;
  @media screen and (min-width: 1300px) {
    margin: 0px 45px;
    width: 300px;
  }
  /* background-color: bisque; */
`;
const GroupContentBox = styled.div`
  height: 92%;
  border: 2px solid #eeeeee;
  border-radius: 20px;
  overflow: auto;
  padding: 10px;
  /* background-color: red; */
  /* margin: 0px 30px 0px 30px; */
`;
const GroupContentItem = styled.button`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex-direction: column;
  width: 90%;
  height: 60px;
  margin: 10px auto;
  padding: 10px;
  border-radius: 8px;
  /* color: #4F4F4F; */
  font-weight: 700;
  font-size: 16px;
  /* border: 1px solid burlywood; */
  cursor: pointer;
  /* background-color: rgba(20, 183, 105, 0.05); */
  /* :focus {
    color: blue;
  } */
`;

const ButtonBox = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  /* margin: 0px 0px 0px 30px; */
  /* background-color: #bb95dd; */
`;
const ButtonContainer = styled.div`
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
const ButtonGap = styled.div`
  gap: 10px;
`;
const GroupButton = styled.button`
  width: 110px;
  height: 50px;
  color: #14b769;
  margin-right: 5px;
  font-weight: 500;
  font-size: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #14b769;
  transition: 0.2s;
  :hover {
    background-color: #14b769;
    color: #fff;
  }
`;
const SearchInput = styled.input`
  width: 250px;
  height: 45px;
  border-radius: 8px;
  border: 1px solid #bdbdbd;
  padding-left: 10px;
`;

const GroupClickButton = styled.button`
  width: 110px;
  height: 50px;
  color: white;
  font-weight: 500;
  font-size: 16px;
  border-radius: 8px;
  margin-right: 5px;
  background-color: #14b869;
  border: 1px solid #14b769;
`;

const GroupAlartButton = styled.button`
  width: 100px;
  height: 40px;
  color: white;
  font-weight: 500;
  font-size: 16px;
  border-radius: 8px;
  background-color: #14b769;
`;
const ClientContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  width: 75%;
  height: 95%;
  margin: 0px 30px 0px 0px;
  /* background-color: cornsilk; */
`;
const ClientHeaderBox = styled.div`
  height: 5%;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  /* padding-bottom: 15px; */
  /* border: 2px solid red; */
`;
const ClientHeaderRow = styled(ClientHeaderBox)`
  display: flex;
  justify-content: space-between;
`;
const NameBox = styled.div`
  text-align: center;
  font-size: 22px;
  color: #333333;
  font-weight: 700;
`;
const DescriptBox = styled.div`
  color: #4f4f4f;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* font-weight: 500; */
`;
const ClientContentBox = styled.div`
  height: 70%;
  /* border: 2px solid blue; */
  /* overflow: scroll; */
  /* margin: 0px 30px 0px 0px; */
`;

const ClientContentHeader = styled.div`
  /* height: 5%; */
  /* background-color: aqua; */
`;
const CardHeader = styled.div`
  width: 100%;
  height: 4.5vh;

  /* height: 30px; */
  /* margin: 0px 50px 0px 50px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #eeeeee;
  border-left: 1ch;
  border-right: 1ch;
  cursor: pointer;
  /* padding: 5px 0px 0px 0px; */
  /* background-color: deeppink; */
  /* margin-bottom: 20px; */
  :hover {
    background-color: rgba(20, 183, 105, 0.05);
  }
`;
const Percentage = styled.div<{ width: any }>`
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 3px; */
  /* border: 1px solid #EEEEEE; */
  /* background-color: #ead3cc; */
  width: ${(props: any) => props.width};
`;

const HeaderPercentage = styled(Percentage)<{ width: any }>`
  height: 36px;
  background-color: #f9fafc;
  color: #909090;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */

  width: ${(props: any) => props.width};
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
`;
// 548
const CheckInputBox = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid #bdbdbd;
  border-radius: 0.35rem;
  cursor: pointer;

  :checked {
    width: 1.5rem;
    height: 1.5rem;
    border: 1.5px solid #eeeeee;
    border-radius: 0.35rem;
    /* color: #14B769; */
    background-color: #14b769;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  }
`;
export default GroupManageList;
