import axios, { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import Pagination from 'react-js-pagination';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { getAllClientList, postInGroupClient } from '../../axios/api';
import { getCookie } from '../../util/cookie';
import { PaginationBox1 } from '../PaginationStyled';

type Props = {
  closeModal: () => void;
};
function UserInGroupCreateModal({ closeModal }: Props) {
  const token = getCookie('userToken');
  const navigate = useNavigate();
  // 고객리스트 관련 필요 변수들
  // 전체고객리스트 숫자
  const [isAllclients, setAllclients] = useState<any>(0);
  // 클릭 저장하는 변수 state
  const [savedArr, setsavedArr] = useState<String[]>([]);
  // 유저리스트 담는 변수
  const [userList, setUserList] = useState([] as any);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 default값으로
  // 서치검색 키워드 변수
  const [searchKeyword, setSearchKeyword] = useState('');

  // 유저리스트 GET API
  const getUserData = useCallback(async (page: any) => {
  }, []);
  const { data: userData, refetch } = useQuery<any, AxiosError>(
    ['getAllClientLists', currentPage],
    () => getAllClientList(currentPage),
    {
      onSuccess: (response) => {
        // console.log('고객리스트useQuery', response);
        setsavedArr([]);
        // setIsClientState(true);
        setAllclients(userData?.data.clientCount);
        // 여따가 담아서 쓰자!
        setUserList(response.data.clients);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const setPage1 = (page: any) => {
    console.log('page1', page);
    setCurrentPage(page);
    getUserData(page);
  };

  // 아이템 클릭했을때 
  const savedHandler = (item : any) => {
    savedArr.push(item);
    setsavedArr(savedArr);
  }
  // 고객리스트에서 검색호출 API
  const getSearchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/clients?index=${currentPage}&keyword=${searchKeyword}`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    // console.log('검색필터 주소', `${process.env.REACT_APP_SERVER_URL}/api/clients?keyword=${searchKeyword}&index=${currentPage}`)
    // console.log('검색필터 API결과', response.data.data.clients)
    setUserList(response.data.data.clients);
    return response;
  }

  // 등록 mutate
  const { mutate } = useMutation(postInGroupClient, {
    onSuccess : (response) => {
      console.log(response);
      alert('등록이 완료되었습니다.')
      closeModal();
    },
    onError : (error) => {
      console.log(error);
      alert('삭제를 실패하였습니다.');
    }
  })
  // Post Handler 
  const postDataHandler = (e:any) => {
    e.preventDefault();
    mutate(savedArr)
  }
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

  return (
    <ModalWrap>
      <ModalBackGround>
        <ModalContainer>
          <ContentContainer>
            <TitleContainer>
              등록할 고객을 클릭해주세요.
            </TitleContainer>
            <SearchBox>
              <SearchInput
                    placeholder="Search"
                    type="search"
                    onChange={(e: any) => {
                      setSearchKeyword(e.target.value);
                    }}
                  />
            </SearchBox>
            <SelectBox>
              <CheckBox>
                김미미
                <RemoveButton>x</RemoveButton>
              </CheckBox>
              <CheckBox>
                김미미
                <RemoveButton>x</RemoveButton>
              </CheckBox>
              <CheckBox>
                김미미
                <RemoveButton>x</RemoveButton>
              </CheckBox>
              <CheckBox>
                김미미
                <RemoveButton>x</RemoveButton>
              </CheckBox>
            </SelectBox>
            <DataHeader>
              <HeaderPercent width="20%">이름</HeaderPercent>
              <HeaderPercent width="30%">연락처</HeaderPercent>
              <HeaderPercent width="50%">이메일</HeaderPercent>
            </DataHeader>
            <DataContainer>
              {userList?.map((item:any) => {
                return (
                  <DataHeader onClick={(item:any) => savedArr.includes(item)}>
                    <RowPercent width="20%">{item.clientName}</RowPercent>
                    <RowPercent width="30%">{item.contact}</RowPercent>
                    <RowPercent width="50%">{item.clientEmail}</RowPercent>
                  </DataHeader>
                )
              })}
            </DataContainer>
            <TitleContainer>
              <PaginationBox1>
                <Pagination
                      activePage={currentPage}
                      // itemsCountPerPage={15}
                      pageRangeDisplayed={10}
                      prevPageText={'<'}
                      nextPageText={'>'}
                      totalItemsCount={isAllclients}
                      onChange={setPage1}
                    />
              </PaginationBox1>
            </TitleContainer>
          </ContentContainer>
          <FootContainer>
            다섯명 이상의 등록은 다량등록을 이용해주세요
            <MoveBox onClick={() => navigate('/uploadpage')}>다량등록</MoveBox>
          </FootContainer>
          <ButtonContainer>
          <ButtonBox onClick={closeModal}>취소</ButtonBox>
          <ConfirmButton onClick={(e:any) => postDataHandler(e)}>확인</ConfirmButton>
          </ButtonContainer>
        </ModalContainer>
      </ModalBackGround>
    </ModalWrap>
  )
}
// 전체 모달 감싸주는 컴포넌틑
const ModalWrap = styled.div`
  width: 100vw;
  height: 100vh;
`;

// 모달 외의 뒷배경은 어둡게 처리
const ModalBackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100vh;
  position: absolute;
  bottom: 0;
  left: 0;
`;

// 모달 컴포넌트 페이지 CSS
const ModalContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  /* gap: 1rem; */
  padding: 1.5rem 2rem 1rem 2rem;
  border: 1px solid var(--color-white);
  background-color: white;
  position: absolute;
  left: 35%;
  top: 10%;
  width: 40%;
  height: 85%;
  /* background-color: antiquewhite; */
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  gap: 5px;
  /* justify-content: center; */
  /* align-items: center; */
  /* margin-top: 30px; */
  /* padding: 30px 10px 10px 10px; */
  flex-direction: column;
  font-size: 24px;
  /* background-color: red; */
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  font-size: 24px;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  /* background-color: blue; */
`;

const SelectHeader = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  font-size: 18px;
  align-items: center;
  flex-direction: row;
  /* background-color: pink; */
`;
const DataHeader = styled.div`
  width: 100%;
  height: 30px;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  /* background-color: darkgreen; */
`;
const SearchInput = styled.input`
  width: 250px;
  height: 38px;
  border-radius: 8px;
  border: 1px solid #bdbdbd;
  padding-left: 10px;
`;
const SelectBox = styled.div`
  width: 610px;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  background-color: pink;
`
const SearchBox = styled.div`
  width: 610px;
  height: 40px;
  display: flex;
  justify-content: end;
`
const CheckBox = styled.div`
  width: 100px;
  height: 35px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  border-radius: 8px;
  font-weight: 700;
  color:#14B869;
  background-color: #F3FBF7;
  justify-content: space-between;
`
const RemoveButton = styled.div`
  width: 30px;
  height: 40px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  cursor: pointer;
  /* background-color: darkblue; */
`
const HeaderPercent = styled.div<{ width: any }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  width: ${(item: any) => item.width};
  border: 1px solid black;
  border-left: 1ch;
  border-right: 1ch;
  /* background-color: aqua; */
`
const RowPercent = styled.div<{ width: any }>`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  width: ${(item: any) => item.width};
  border: 1px solid #F3F3F3;
  border-left: 1ch;
  border-right: 1ch;
  border-top: 1ch;
`;
const DataContainer = styled.div`
  width: 100%;
  height: 420px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  background-color: blueviolet;
`;
const FootContainer = styled(TitleContainer)`
  height: 30px;
  font-size: 18px;
  font-weight: 500;
  color: #474b49;
  /* background-color: #E6F8F0; */
  border-radius: 10px;
  gap: 5px;
  font-style: italic;
`
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  flex-direction: row;
  margin-right: 20px;
  gap: 20px;
  /* background-color: aqua; */
`;
const MoveBox = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 8px;
  color: #209653;
  text-decoration: underline;
  font-weight: 500;
  font-size: 18px;
  /* border: 2px solid #7f8381; */
`
const ButtonBox = styled.button`
  width: 100px;
  /* border: 1px solid #14B869; */
  border-radius: 10px;
  /* background-color: yellowgreen; */
  padding: 10px;
  font-size: 18px;
  :hover{
    background-color: #E6F8F0;
    color: #14B869;
  }
`;
const ConfirmButton = styled(ButtonBox)`
  color: white;
  background-color: #14B869;
`
export default UserInGroupCreateModal