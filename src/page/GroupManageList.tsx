import axios, { AxiosError } from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Pagination from 'react-js-pagination';
import { debounce } from 'lodash';
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
import UserInGroupCreateModal from '../components/modal/UserInGroupCreateModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


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
  // 그룹리스트 내 클라이언트 담는 변수
  const [groupClient, setGroupClient] = useState([] as any);
  // 그룹리스트 onClick 아이디 변수
  const [groupId, setGroupId] = useState('');
  // 그룹리스트 이름 textarea 변수
  const [groupName, setGroupName] = useState('전체 고객리스트');
  // 그룹리스트 설명 변수
  const [groupDescription, setGroupDescription] = useState('');
  // 서치검색 키워드 변수
  const [searchKeyword, setSearchKeyword] = useState('');
  const [groupSearchKeyword, setGroupSearchKeyword] = useState('');
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
          // 이거 무슨 용도였지,, 까먹음
          if (!clickGroup.includes(item.groupId)) {
            clickGroup.push(item.groupId);
            setClickGroup(clickGroup);
          }
        });
      },
    }
  );

  // 그룹 클릭시 그룹 내 클라이언트리스트 호출
  const getClientInGroup = useCallback(
    async (id: any, name: any, descript: any, page: any) => {
      setCheckedArr([]);
      // setIsClientState(false);
      // /api/clients/:groupId&index={index}&keyword=${keyword}
      const response = await axios
        .get(
          `${process.env.REACT_APP_SERVER_URL}/api/clients/${id}?&index=${page}`,
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
      groupList.map((item: any) => {
        if (item.groupId === id) {
          setIsGroupAllClients(item.clientCount);
        }
      });
    },
    [groupData]
  );

  // 그룹 내에서 검색호출 API
  const getGroupSearchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/clients/${groupId}?index=${currentPage}&keyword=${groupSearchKeyword}`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    setGroupClient(response.data.data);
  };

  // 그룹 검색 useEffet
  useEffect(() => {
    if (groupSearchKeyword.length > 0) {
      getGroupSearchData();
    } else if (groupSearchKeyword.length === 0) {
      getClientInGroup(groupId, groupName, groupDescription, currentPage);
    }
  }, [groupSearchKeyword]);

  /*************************************************************************************
    유저리스트 관련 코드
  ************************************************************************************ */

  // 전체고객리스트 숫자
  const [isAllclients, setAllclients] = useState<number>(10);
  // 유저리스트 담는 변수
  const [userList, setUserList] = useState([] as any);
  // 처음 렌더링시 전체고객리스트로 focus
  const allUserRef = useRef<HTMLButtonElement>(null);

  // 유저리스트 GET API
  // const getUserData = useCallback(async (page: any) => {
  //   // setCheckedArr([]);
  //   setIsClientState(true);
  //   // console.log('IsClientState', isClientState);
  // }, []);
  const { data: userData, refetch } = useQuery<any, AxiosError>(
    ['getAllClientLists', currentPage],
    () => getAllClientList(currentPage),
    {
      onSuccess: (response) => {
        // console.log('고객리스트useQuery', response.data.clients);
        setCheckedArr([]);
        // setIsClientState(true);
        setAllclients(response.data.clientCount);
        // 여따가 담아서 쓰자!
        setUserList(response.data.clients);
      },
      onError: (error) => {
        console.log('error', error);
      },
    }
  );

  // 유저리스트 useEffect
  useEffect(() => {
    // console.log(isClientState)
    if (isClientState === true) {
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
    // refetch, userData, isAllclients, getUserData, getClientInGroup
  }, [isAllclients, getClientInGroup]);

  // 검색change
  const clientSearchTextChange = useCallback(
    debounce(async (value: any) => {
      const result = await getSearchData(value);
      return result;
    }, 400),
    []
  );

  // 고객리스트에서 검색호출 API
  const getSearchData = async (value: any) => {
    // 검색어가 없을때 전체 데이터 호출
    if (value === '') {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/clients?index=${currentPage}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setUserList(response.data.data.clients);
      return response;
    } else {
      // 검색어 있을땐 키워드 호출
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/clients?index=${currentPage}&keyword=${value}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setUserList(response.data.data.clients);
      return response;
    }
  };

  // 검색필터 useEffect
  useEffect(() => {
    if (searchKeyword.length > 0) {
      // getSearchData(searchKeyword);
      // setAllclients(userList.length)
    } else if (searchKeyword.length === 0) {
      refetch();
      // setAllclients(userData?.data.clientCount)
    }
  }, [searchKeyword]);

  // 그룹 내 클라이언트 숫자
  const [isGroupAllClients, setIsGroupAllClients] = useState<any>(0);

  const setPage1 = (page: any) => {
    setCurrentPage(page);
    // getUserData(page);
  };

  const setPage2 = async (page: any) => {
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
  // 그룹리스트 내 유저 생성 모달
  const [groupUserCreateModal, setGroupUserCreateModal] = useState(false);
  const clickGroupUserCreateModal = () => {
    setGroupUserCreateModal(true);
  };
  const closeGroupUserCreateModal = () => {
    setGroupUserCreateModal(false);
    getClientInGroup(groupId, groupName, groupDescription, currentPage);
  };
  // 그룹리스트 내 유저 복사 모달
  const [groupUserCopyModal, setGroupUserCopyModal] = useState(false);
  const clickUserCopyModal = () => {
    setGroupUserCopyModal(true);
  };
  const closeUserCopyModal = () => {
    getClientInGroup(groupId, groupName, groupDescription, currentPage);
    setGroupUserCopyModal(false);
  };
  // 그룹리스트 내 유저 이동 모달
  const [groupUserMoveModal, setGroupUserMoveModal] = useState(false);
  const clickUserMoveModal = () => {
    setGroupUserMoveModal(true);
  };
  const closeUserMoveModal = () => {
    getClientInGroup(groupId, groupName, groupDescription, currentPage);
    setGroupUserMoveModal(false);
  };
  // 그룹리스트 내 유저 삭제 모달
  const [groupUserDeleteModal, setGroupUserDeleteModal] = useState(false);
  const clickGroupUserDeleteModal = () => {
    setGroupUserDeleteModal(true);
  };
  const closeGroupUserDeleteModal = () => {
    getClientInGroup(groupId, groupName, groupDescription, currentPage);
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

  // 버튼 열고닫기 state
  const [isOpen, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCopyOpen, setIsCopyOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);

  // 클릭 저장하는 변수 state
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
      // setCheckedArr([...checkedArr, id])
    } else if (!isChecked || checkedArr.includes(item.clientId)) {
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
  };
  return (
    <Container>
      <TotalContainer>
        <TitleContainer>
          <ClientHeaderBox>
            <NameBox>{groupName}</NameBox>
            <DescriptBox>{groupDescription}</DescriptBox>
          </ClientHeaderBox>
          { isClientState ? (
            <SearchContainer>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#a4a5a8",}} />
            <SearchInput
                    placeholder="Search in Total"
                    type="client search"
                    onChange={(e: any) => {
                      setSearchKeyword(e.target.value);
                      clientSearchTextChange(e.target.value);
                    }}
                  />
            </SearchContainer>
          ) : (
            <SearchContainer>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#a4a5a8",}} />
            <SearchInput
                    placeholder="Search in Group"
                    type="search"
                    onChange={(e: any) => {
                      setGroupSearchKeyword(e.target.value);
                    }}
                  />
            </SearchContainer>
          )}
        </TitleContainer>
        <ContentContainer>
        {/* 그룹리스트 공간 */}
          <GroupContainer>
            <GroupContentBox>
              <GroupContentItem
                value="client"
                className={'btn' + ('client' == clickActive ? 'Active' : '')}
                onClick={(e: any) => {
                  refetch();
                  setIsClientState(true);
                  setCurrentPage(1);
                  toogleActive(e);
                  setOpen(false);
                  setGroupName('전체 고객리스트');
                  setGroupDescription('');
                }}
                ref={allUserRef}
              >
                <CircleFont 
                    className={'circle' + ('client' == clickActive ? 'Active' : '')}>
                    {isAllclients}</CircleFont>
                전체 고객리스트
              </GroupContentItem>
              {groupData?.data.map((item: any) => {
                return (
                  <div key={item.groupId}>
                    
                    <GroupContentItem
                      value={item.groupId}
                      className={
                        'btn' + (item.groupId == clickActive ? 'Active' : '')
                      }
                      onClick={(e: any) => {
                        setOpen(false);
                        setIsEditOpen(false);
                        setIsCopyOpen(false);
                        setIsMoveOpen(false);
                        setIsClientState(false);
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
                      <CircleFont 
                        className={'circle' + (item.groupId == clickActive ? 'Active' : '')}>
                        {item.clientCount}</CircleFont>
                      {item.groupName}
                    </GroupContentItem>
                  </div>
                );
              })}
            </GroupContentBox>
            <ButtonBox>
              <PrimaryButton onClick={clickGroupCreateModal}>그룹 추가</PrimaryButton>
              <PrimaryButton
                onClick={() => {
                  if (isClientState === true) {
                    alert('전체 고객리스트는 삭제할 수 없습니다.');
                  } else if (isClientState === false) {
                    clickGroupDelete();
                  }
                }}
              >
                그룹 삭제
              </PrimaryButton>
            </ButtonBox>
          </GroupContainer>
        {/* 여기부터는 클라이언트 리스트 공간 */}
          <ClientContainer>
            <ButtonContainer>
              {isClientState ? (
                <>
                  <div style={{ display: 'flex', gap: '7px' }}>
                    {isOpen && isOpen ? (
                      <GroupClickButton
                        onClick={() => {
                          if (checkedArr.length > 0) {
                            clickUserDeleteModal();
                          } else if (checkedArr.length === 0) {
                            alert('1개 이상을 체크해주세요.');
                          }
                        }}
                      >
                        고객정보 삭제
                      </GroupClickButton>
                    ) : null}
                    {!isOpen ? (
                      <PrimaryButton
                        onClick={() => setOpen((prev) => !prev) as any}
                      >
                        선택삭제
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton
                        onClick={() => {
                          setOpen((prev) => !prev) as any;
                          setCheckedArr([]);
                        }}
                      >
                        선택취소
                      </PrimaryButton>
                    )}
                    {isEditOpen && isEditOpen ? (
                      <GroupClickButton onClick={() => userEditHandler()}>
                        고객정보 수정
                      </GroupClickButton>
                    ) : null}
                    {!isEditOpen ? (
                      <PrimaryButton
                        onClick={() => setIsEditOpen((prev) => !prev) as any}
                      >
                        선택수정
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton
                        onClick={() => {
                          setIsEditOpen((prev) => !prev) as any;
                          setCheckedArr([]);
                        }}
                      >
                        수정취소
                      </PrimaryButton>
                    )}
                  </div>
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
                    <PrimaryButton
                      type="button"
                      onClick={() => clickGroupUserCreateModal()}
                    >
                      고객 등록
                    </PrimaryButton>
                    {/* <GroupButton onClick={() => navigate('/uploadpage')}>
                      고객 등록
                    </GroupButton> */}
                    {isOpen && isOpen ? (
                      <GroupClickButton
                        onClick={() => {
                          if (checkedArr.length > 0) {
                            clickGroupUserDeleteModal();
                          } else if (checkedArr.length === 0) {
                            alert('1개 이상을 체크해주세요.');
                          }
                        }}
                      >
                        삭제
                      </GroupClickButton>
                    ) : null}
                    {!isOpen ? (
                      <PrimaryButton
                        onClick={() => setOpen((prev) => !prev) as any}
                      >
                        그룹내삭제
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton
                        onClick={() => {
                          setOpen((prev) => !prev) as any;
                          setCheckedArr([]);
                        }}
                      >
                        삭제취소
                      </PrimaryButton>
                    )}
                    {isCopyOpen && isCopyOpen ? (
                      <GroupClickButton onClick={() => {
                        if (checkedArr.length > 0) {
                          clickUserCopyModal();
                        } else if (checkedArr.length === 0) {
                          alert('1개 이상을 체크해주세요.');
                        }
                      }}>
                        복사
                      </GroupClickButton>
                    ) : null}
                    {!isCopyOpen ? (
                      <PrimaryButton
                        onClick={() => setIsCopyOpen((prev) => !prev) as any}
                      >
                        선택복사
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton
                        onClick={() => {
                          setIsCopyOpen((prev) => !prev) as any;
                          setCheckedArr([]);
                        }}
                      >
                        복사취소
                      </PrimaryButton>
                    )}
                    {/* <GroupButton onClick={() => clickUserCopyModal()}>
                    복사
                  </GroupButton> */}
                    {isMoveOpen && isMoveOpen ? (
                      <GroupClickButton onClick={() => {
                        if (checkedArr.length > 0) {
                          clickUserMoveModal();
                        } else if (checkedArr.length === 0) {
                          alert('1개 이상을 체크해주세요.');
                        }
                      }}>
                        이동
                      </GroupClickButton>
                    ) : null}
                    {!isMoveOpen ? (
                      <PrimaryButton
                        onClick={() => setIsMoveOpen((prev) => !prev) as any}
                      >
                        선택이동
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton
                        onClick={() => {
                          setIsMoveOpen((prev) => !prev) as any;
                          setCheckedArr([]);
                        }}
                      >
                        이동취소
                      </PrimaryButton>
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
                border: '1px solid #bdbdbd',
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
                  userList.length > 0 ? (
                    userList?.map((item: any) => {
                      return (
                        <CardHeader key={item.clientId}>
                          {isOpen || isEditOpen ? (
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
                          <DataPercentage width="23%">{item.groupName}</DataPercentage>
                          <DataPercentage width="12%">{item.clientName}</DataPercentage>
                          <DataPercentage width="22%">
                            {item.contact.replace(
                              /^(\d{2,3})(\d{3,4})(\d{4})$/,
                              `$1-$2-$3`
                            )}
                          </DataPercentage>
                          <DataPercentage width="37%">{item.clientEmail}</DataPercentage>
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
                          {isOpen || isCopyOpen || isMoveOpen ? (
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
                              checked={checkedArr.includes(item.clientId)}
                              onChange={(e) => checkUserHandler(e, item.clientId)}
                            />
                          <input
                            type="checkbox"
                            checked={checkedArr.includes(item)}
                            onChange={(e: any) => checkUserHandler(e, item)}
                          />
                          </Percentage> */}
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
                    prevPageText={'Prev'}
                    nextPageText={'Next'}
                    totalItemsCount={isGroupAllClients}
                    onChange={setPage2}
                  />
                )}
              </PaginationBox1>
            </ClientPageBox>
          </ClientContainer>
        </ContentContainer>
        <FootContainer>
          {isClientState ? null : (
              <AlarmTalkButton onClick={readyAlarmTalk}>
                알림톡전송
              </AlarmTalkButton>
          )}
        </FootContainer>
      </TotalContainer>
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
      {/* 그룹 내 고객 등록 모달 */}
      {groupUserCreateModal && (
        <UserInGroupCreateModal
          groupId={groupId}
          closeModal={closeGroupUserCreateModal}
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
  padding-left: 180px;
  /* padding-top: 50px; */
  /* padding-bottom: 50px; */
  /* background-color: sandybrown; */
`;
export const HeaderContainer = styled.div`
  height: 60px;
  width: 100%;
  font-family: 'NanumSquareNeo-Variable';
  display: flex;
  align-items: center;
  padding-left: 80px;
  margin-top: 90px;
  /* margin-bottom: 20px; */
  /* padding-left: 30px; */
  font-size: 34px;
  font-weight: 900;
  /* background-color: crimson; */
`;
const ContentContainer = styled.div`
  max-width: 1800px;
  /* height: 100%; */
  width: 100%;
  display: flex;
  flex-direction: row;
  /* margin: 0 auto; */
  /* margin-top: 100px; */
  /* margin-bottom: 100px; */
  /* background-color: pink; */
`;

const TotalContainer = styled.div`
max-width: 1800px;
height: 100vh;
width: 100%;
display: flex;
flex-direction: column;
margin: 0 auto;
margin-top: 60px;
/* margin-bottom: 100px; */
/* background-color: cyan; */
`;
const TitleContainer = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 50px;
  margin-right: 35px;
`
const FootContainer = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  gap: 10px;
  /* margin-bottom: 10px; */
  margin-left: 50px;
  margin-right: 35px;
`
const GroupContainer = styled.div`
  height: 600px;
  margin: 0px 10px;
  width: 250px;
  @media screen and (min-width: 1300px) {
    margin: 0px 45px;
    width: 250px;
  }
  /* background-color: bisque; */
`;
const GroupContentBox = styled.div`
  height: 540px;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  overflow: auto;
  padding: 10px;
  box-shadow: 0 2px 4px 0 #a4bde2;
  /* background-color: red; */
  /* margin: 0px 30px 0px 30px; */
`;
const GroupContentItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: row;
  width: 90%;
  font-family: 'TheJamsil5Bold';
  margin: 10px auto;
  padding: 10px;
  gap: 10px;
  border-radius: 8px;
  /* color: #4F4F4F; */
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
`;

const CircleFont = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  font-size: 14px;
  text-align: center;
  line-height: 25px;
  /* color: #B4BEC9;
  background-color: #F3F4F8; */
`
const ButtonBox = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  /* margin: 0px 0px 0px 30px; */
  /* background-color: #bb95dd; */
`;
const ButtonContainer = styled.div`
  max-width: 1200px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 5px;
  /* padding-right: 100px; */
  /* background-color: aliceblue; */
`;
const ButtonGap = styled.div`
  gap: 10px;
`;
export const GroupButton = styled.button`
  width: 110px;
  height: 40px;
  color: #14b769;
  margin-right: 5px;
  font-weight: bold;
  font-size: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  font-family: 'TheJamsil5Bold';
  border: 1px solid #14b769;
  transition: 0.2s;
  :hover {
    background-color: #14b769;
    color: #fff;
  }
`;
const SearchContainer = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* padding-right: 10px; */
  /* background-color: darkorchid; */
`
const SearchDiv = styled.div`
  margin-left: 10px;
`
const SearchInput = styled.input`
  width: 250px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #bdbdbd;
  padding-left: 10px;
`;
const SearchIcon = styled.div`
  
`
const GroupClickButton = styled.button`
  width: 110px;
  height: 40px;
  color: #002333;
  font-weight: 500;
  font-size: 16px;
  border-radius: 5px;
  margin-right: 5px;
  font-family: 'TheJamsil5Bold';
  background-color: white;
  border: 1.5px solid #002333;
  box-shadow: 0 2px 4px 0 #E6F8F0;
  transition: 0.3s;
  :hover {
    color: #ffffff;
    background-color: #002333;
    border: 2px solid #002333;
    
  }
`;

const AlarmTalkButton = styled(GroupClickButton)`
  width: 120px;
  height: 50px;
  color: white;
  font-size: 20px;
  background-color: #002333;
  :hover {
    color: #ffffff;
    background-color: #FBA94C;
    border: 2px solid #FBA94C;
    
  }
`

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
  height: 600px;
  margin: 0px 30px 0px 0px;
  /* background-color: cornsilk; */
`;
const ClientHeaderBox = styled.div`
  /* height: 5%; */
  width: 800px;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;
  /* padding-bottom: 15px; */
`;
const ClientHeaderRow = styled(ClientHeaderBox)`
  display: flex;
  justify-content: space-between;
`;
const NameBox = styled.div`
  text-align: center;
  font-size: 30px;
  color: #333333;
  font-weight: 900;
  /* background: linear-gradient(to top, #36fead 40%, transparent 40%); */
  font-family: 'TheJamsil5Bold';
  /* background-color: beige; */
`;
const DescriptBox = styled.div`
  /* background-color: darkgray; */
  color: #B4BEC9;
  font-size: 20px;
  font-weight: 800;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* font-weight: 500; */
`;
const ClientContentBox = styled.div`
  height: 450px;
  /* background-color: aliceblue; */
  /* border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px; */
  border: none;
  /* border: 1px solid blue; */
  overflow: auto;
  box-shadow: 0 2px 4px 0 #a4bde2;
  /* margin: 0px 30px 0px 0px; */

`;

const ClientContentHeader = styled.div`
  height: 40px;
  background-color: #48989B;
  color: white;
  font-weight: bold;
  /* border-top-left-radius: 8px;
  border-top-right-radius: 8px; */
`;
const CardHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: rgba(20, 183, 105, 0.05);
    font-weight: 900;
  }
`;
const Percentage = styled.div<{ width: any }>`
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props: any) => props.width};
`;
const DataPercentage = styled(Percentage)`
  color: #002333;
`

const HeaderPercentage = styled(Percentage)<{ width: any }>`
  height: 40px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  font-family: 'TheJamsil5Bold';
  font-size: 14px;
  align-items: center;
  /* border: 1px solid #bdbdbd; */

  width: ${(props: any) => props.width};
`;

const ClientPageBox = styled.div`
  margin-top: 15px;
  height: 45px;
  /* padding-top: 10px; */
  /* border: 1px solid pink; */
  /* background-color: gainsboro; */
`;

const PrimaryButton = styled.button`
  width: 110px;
  height: 40px;
  color: #48989B;
  margin-right: 5px;
  font-weight: normal;
  font-size: 16px;
  border-radius: 5px;
  background-color: #ffffff;
  font-family: 'TheJamsil5Bold';
  border: 1.5px solid #48989B;
  box-shadow: 0 2px 4px 0 #E6F8F0;
  transition: 0.3s;
  :hover {
    /* background-color: #ebde9e; */
    color: #ffffff;
    background-color: #FBA94C;
    border: 2px solid #FBA94C;
  }
`;
const CenterContent = styled.div`
  width: 100%;
  padding: 15px;
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
