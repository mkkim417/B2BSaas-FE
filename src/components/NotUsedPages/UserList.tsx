import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import styled from 'styled-components';
import UserEditModal from '../modal/UserEditModal';
import UserCreateModal from './UserCreateModal';
import {
  Button,
  CardContainer,
  CardInBox,
  ContentContainer,
  HeaderBar,
  Percentage,
} from './UserGroupList';

function UserList() {
  // 유저리스트 데이터 state
  const [userList, setUserList] = useState([] as any);

  // 검색 조건 state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterList, setFilterList] = useState([] as any);

  // 유저 수정 state
  const [editUser, setEditUser] = useState({
    clientId: '',
    clientName: '',
    clientContact: '',
  });
  // 유저리스트 get API
  const getUserData = useCallback(async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/clients`
    );
    setUserList(response.data.data);
    setFilterList(response.data.data);
  }, []);

  // Modal 변수들
  const [isOpenModal, setIsOpenModal] = useState(false);
  const clickModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  const [editModal, setEditModal] = useState(false);
  const clickEditModal = () => {
    setEditModal(true);
  };
  const closeEditModal = () => {
    setEditModal(false);
  };
  // Pagination 처리
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 default값으로
  const [count, setCount] = useState(0); // 아이템 총 갯수
  // const [ product, setProduct ] = useState([])  // 리스트에 담아낼 아이템들
  const [postPerPage] = useState(14); // 한 페이지에 보여질 아이템 수
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

  // 수정 항목의 변수 state
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editContact, setEditContact] = useState('');
  // 개별 체크표시 핸들러
  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, id: any) => {
    setIsCheckingBox(!isCheckingBox);
    checkedItemHandler(e.target.checked, id);
  };
  // 전체 체크박스 선택 핸들러
  const allCheckHandler = (isChecked: boolean) => {
    if (isChecked) {
      const idArray = [] as any;
      userList.forEach((item: any) => {
        if (idArray.includes(item.clientId)) {
          // check 배열에 전체선택 품목 중 포함되어있는 것이 있다면 빼고 push
        } else {
          // checkedArr.push(item.clientId);
          // setCheckedArr(checkedArr);
          idArray.push(item.clientId);
          setCheckedArr(idArray);
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
  };

  // 페이지 렌더링하자마자 데이터 get
  useEffect(() => {
    getUserData();
    // setCount(userList.length);
    setIndexOfLastPost(currentPage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(userList.slice(indexOfFirstPost, indexOfLastPost));
  }, [
    currentPage,
    indexOfLastPost,
    indexOfFirstPost,
    postPerPage,
    getUserData,
  ]);
  // currentPage, indexOfLastPost, indexOfFirstPost, userList, postPerPage
  // 검색필터 useEffect
  useEffect(() => {
    // 필터 bar
    setUserList(
      // 조건 검색 여기서 설정 => 현재는 그룹명만 설정
      filterList.filter(
        (item: any) =>
          item.clientId.includes(searchTerm) ||
          item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.contact.includes(searchTerm) ||
          item.createdAt.includes(searchTerm)
      )
    );
  }, [searchTerm]);

  // 선택 삭제 button handler
  const individualDeleteHandler = () => {
    // 선택 삭제하기 전 한번 더 cofirm창
    if (window.confirm('해당 유저를 삭제하시겠습니까?')) {
      // 확인을 눌렀을 때
      const urls = checkedArr.map(
        (groupId) => `https://dev.sendingo-be.store/api/clients/${groupId}`
      );
      axios
        .all(urls.map((url) => axios.delete(url)))
        .then((response) => {
          alert('삭제가 완료되었습니다');
        })
        .catch((error) => {
          console.log(error.response);
          alert('삭제를 실패하였습니다.');
        });
    } else {
      // confirm창에서 취소를 눌렀을 때 아무일도 발생하지 않는다.
    }
  };

  // 전체 삭제 button handler
  const groupDeleteHandler = () => {
    if (checkedArr.length === userList.length) {
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
  const userUpdateButton = () => {
    alert('그룹생성 버튼\n 협의 후 진행');
  };
  // Input search handler
  const inputChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const editButtonHandler = () => {
    if (checkedArr.length > 1) {
      alert('한 개만 체크해주세요.');
    } else {
      // edit object
      userList.map((item: any) => {
        if (item.clientId === checkedArr[0]) {
          setEditUser({
            ...editUser,
            clientId: item.clientId,
            clientName: item.clientName,
            clientContact: item.contact,
          });

          setEditName(item.clientName);
          // setEdit.clientId = item.clientId
          // editArr.clientName = item.ClientName
          // editArr.clientContact = item.contact
        }
      });
      // editArr.push(userList.filter((item :any) => item.clientId === checkedArr[0]))
      // console.log('eidtArr', editArr)
      // console.log('filter', userList.filter((item :any) => item.clientId === checkedArr[0]))
      // setEditName(editArr[0].clientName)
      clickEditModal();
    }
    // console.log(editName)
  };
  return (
    <Wrapper>
      <HeaderBar>
        <div>유저 리스트</div>
        <div>체크 갯수 : {checkedArr.length}</div>
        <input placeholder="검색" onChange={inputChange} />
        <Button onClick={sendMessageButton}> 메세지 보내기</Button>
        <Button onClick={clickModal}> 유저 생성</Button>
        <Button onClick={editButtonHandler}>유저 수정</Button>
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
              checked={checkedArr.length === userList.length ? true : false}
            />
          </Percentage>
          <Percentage width="20%">고객명</Percentage>
          <Percentage width="50%">연락처</Percentage>
          <Percentage width="20%">생성일</Percentage>
        </CardHeader>
        <CardContainer>
          {userList.slice(indexOfFirstPost, indexOfLastPost) &&
          userList.length > 0 ? (
            userList
              .slice(indexOfFirstPost, indexOfLastPost)
              .map((item: any) => {
                return (
                  <CardInBox key={item.clientId}>
                    <Percentage width="10%">
                      <input
                        type="checkbox"
                        checked={checkedArr.includes(item.clientId)}
                        onChange={(e: any) => checkHandler(e, item.clientId)}
                      />
                    </Percentage>
                    <Percentage width="20%">{item.clientName}</Percentage>
                    <Percentage width="50%">{item.contact}</Percentage>
                    <Percentage width="20%">{item.createdAt}</Percentage>
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
          totalItemsCount={userList.length}
          onChange={setPage}
        />
      </PaginationBox>
      {isOpenModal && (
        <UserCreateModal
          closeModal={closeModal}
          title="정말로 채팅방을 나가시겠습니까?"
          memo="친구신청, 대화에 쓰인 포인트는 환불이 불가능합니다."
        />
      )}
      {editModal && (
        <UserEditModal
          closeModal={closeEditModal}
          clientId={editUser.clientId}
          clientName={editUser.clientName}
          clientContact={editUser.clientContact}
        />
      )}
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
const CardHeader = styled.div`
  /* width: 100%; */
  height: 60px;
  /* margin: 0px 50px 0px 50px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: deeppink;
  margin-bottom: 20px;
`;
export const PaginationBox = styled.div`
  width: 100%;
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    /* border: 1px solid #e2e2e2; */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }

  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }

  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }

  ul.pagination li.active a {
    color: white;
  }

  ul.pagination li.active {
    background-color: #337ab7;
  }

  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7;
  }
`;
export default UserList;
